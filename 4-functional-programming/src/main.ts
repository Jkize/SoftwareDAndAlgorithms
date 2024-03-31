import { Either, fromPromise, ap, right, getOrElse, flatten, map, left, fold } from './fp/either';

import {fold as foldMaybe} from './fp/maybe';

import { pipe } from './fp/utils';
import { fetchClient, fetchExecutor } from './fetching';
import { ClientUser, Demand, ExecutorUser, Point } from './types';
import {  none, some } from './fp/maybe';
import {map as mapEither} from './fp/either'


type Response<R> = Promise<Either<string, R>>
type TClient  = {
  name: string;
  demands: Demand[];
  position: {
      x: number;
      y: number;
  };
  reward: number;
}

 export const functorPromise = {
   map:<A,B>(f:(a:A)=>B) => (fa:Promise<A>)=>(
       fa.then(f))
 }

const fnMapToClient = (client:TClient):ClientUser=>({ ...client, demands: client.demands===null ? none : some(client.demands)});
const getTClient = (clients:TClient[])=>(clients.map(fnMapToClient))
const mapBuild = mapEither<string, TClient[], ClientUser[]>(getTClient)



const getExecutor = (): Response<ExecutorUser> => fromPromise(fetchExecutor());
const getClients = (): Response<Array<ClientUser>> =>  pipe(
  fromPromise<string,TClient[]>(fetchClient()),
  functorPromise.map(mapBuild)
 );

export enum SortBy {
  distance = 'distance',
  reward = 'reward',
}

const filter = <A>(f:(a:A)=>boolean)=>(array:A[])=>array.filter(f)
const sortF = <A>(fn:(a:A,b:A)=>number)=>(array:A[])=>array.sort(fn)
const distance = (a:Point, b:Point)=> Math.sqrt(Math.pow(a.x-b.x,2)+Math.pow(a.y-b.y,2));
const mapArray = <A,B> (fn:(a:A)=>B )=>(array:A[])=>array.map(fn)


export const show = (sortBy: SortBy) => (clients: Array<ClientUser>) => (executor: ExecutorUser): Either<string, string> => {


  //ClientUser With distance from Executor
  type ClientUserWD = ClientUser & {distance:number};

  const hasAllDemands = (setD:Set<Demand>)=>(demands:Demand[]) => (demands.every((demand)=> setD.has(demand)))
  const filterFnDemand = (setDemands:Set<Demand>)=> foldMaybe<Demand[],boolean>(()=>true, hasAllDemands(setDemands))
  const filterFnClient = (setDemands:Set<Demand>)=>(client:ClientUser)=>filterFnDemand(setDemands)(client.demands)
  
  const sortByFn = (sortBy:SortBy)=> 
  (a:ClientUserWD,b:ClientUserWD)=>((sortBy===SortBy.reward) ? b.reward-a.reward : a.distance - b.distance)

  const buildEither = 
  (clients:ClientUserWD[]):Either<string, ClientUserWD[]>=>clients.length===0? left('This executor cannot meet the demands of any client!'):right(clients);

  const infoClients = (original:ClientUser[],newC:ClientUser[])=>(original.length===newC.length? 'This executor meets all demands of all clients!.' : `This executor meets the demands of only ${newC.length} out of ${original.length} clients` );
  const mapClient =   (client:ClientUserWD)=>`name: ${client.name}, distance: ${client.distance.toFixed(3)}, reward: ${client.reward}`

  const messageSortBy = (sortBy:SortBy)=>`Available clients sorted by ${sortBy===SortBy.reward?'highest reward':'distance to executor'}:\n`

   const mapClientsEnd =(sortBy:SortBy, clientsOriginal:ClientUser[])=> 
  (clients:ClientUserWD[])=> infoClients(clientsOriginal,clients)+"\n\n"+messageSortBy(sortBy) + mapArray(mapClient)(clients).join("\n")

  const mapWithDistance = (executor:ExecutorUser)=>(client:ClientUser):ClientUserWD=>({...client, distance:distance(client.position, executor.position)})

 

  const setDemands = new Set<Demand>();
  executor.possibilities.reduce((setD,current)=>(setD.add(current)),setDemands);  


 return  pipe( 
       pipe(
         clients,
         filter(filterFnClient(setDemands)), //Filter by demands from executor
         mapArray(mapWithDistance(executor)), //Map to put distance
         sortF(sortByFn(sortBy)), //Sortby
       ),   
      buildEither, //Build Either left|right
      mapEither(mapClientsEnd(sortBy,clients)) //map from either.ts
      );
};

export const main = (sortBy: SortBy): Promise<string> => (
  Promise
    .all([getClients(), getExecutor()]) // Fetch clients and executor
    .then(([clients, executor]) => (
      pipe(
        /**
         * Since the "show" function takes two parameters, the value of which is inside Either
         * clients is Either<string, Array<Client>>, an executor is Either<string, Executor>. How to pass only Array<Client> and Executor to the show?
         * Either is an applicative type class, which means that we can apply each parameter by one
         */
        right(show(sortBy)), // Firstly, we need to lift our function to the Either
        ap(clients), // Apply first parameter
        ap(executor), // Apply second parameter
        flatten, // show at the end returns Either as well, so the result would be Either<string, Either<string, string>>. We need to flatten the result
        getOrElse((err) => err) // In case of any left (error) value, it would be stopped and show error. So, if clients or executor is left, the show would not be called, but onLeft in getOrElse would be called
      )
    ))
);
