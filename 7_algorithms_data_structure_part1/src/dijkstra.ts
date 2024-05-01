import { Dijkstra, Path, WeightedGraph } from "./interfaces";


export class Vertex{

  constructor(private _id:string){
  }

  get id():string{
    return this._id;
  }
}

export class Edge{
  constructor(private _from:Vertex, private _to:Vertex, private _weight:number){
  }

  get from(){
    return this._from;
  }

  get to(){
    return this._to;
  }

  get weight(){
    return this._weight;
  }
}

type VertexWeight = {vertex:Vertex, weight:number};
type RecordMap = Record<string, {shortDistance:number, previous?:string}>;

export class Graph implements WeightedGraph<Vertex>{

  private  listVertex:VertexWeight[][]= [];
  private  keyPosition:Map<string, number>= new Map();
  
 
  addVertex(vertex:Vertex):void
  addVertex(key: string):void
  addVertex(arg: string |  Vertex): void {
    let key = "";
    if(typeof arg === "string") {
      key = arg;
    }else{
      key = (arg as Vertex).id
    }

    if(!this.keyPosition.has(key)){
      this.keyPosition.set(key,this.listVertex.length)
      this.listVertex.push([]);
    }
  }

  addEdge(vertex1: Vertex, vertex2: Vertex, weight: number): void {
    if(!this.keyPosition.has(vertex1.id) || !this.keyPosition.has(vertex2.id)){
      throw new Error('The vertex is/are not registered')
    }

    this.listVertex[this.keyPosition.get(vertex1.id)!].push({vertex : vertex2 , weight : weight});
    this.listVertex[this.keyPosition.get(vertex2.id)!].push({vertex : vertex1 , weight : weight});
    
  }

  getKeyVertexList(){
    return Array.from(this.keyPosition.keys());
  }

  getAdacencyList(vertex:Vertex):VertexWeight[]
  getAdacencyList(key: string):VertexWeight[]
  getAdacencyList(arg:Vertex|string){
    let key = typeof arg === 'string' ? arg : (arg as Vertex).id ;
    return  this.listVertex[this.keyPosition.get(key)!].slice();
  }

  getSizeVertex(){
    return this.listVertex.length;
  }
}

export class ImpDijkstra implements Dijkstra<Vertex>{

  constructor(private graph:Graph) {}
  
  findShortestPath(vertex1: Vertex, vertex2: Vertex): Path {
    const map = this.algorithm(vertex1.id);
    const path:Path = {path: [], distance:map[vertex2.id]!.shortDistance};
    if(map[vertex2.id]!.shortDistance!== Number.POSITIVE_INFINITY){
      this.putPath(vertex2.id, map, path.path);
    }
    return path;
  }

  findAllShortestPaths(vertex: Vertex): Record<string, Path> {
    const map = this.algorithm(vertex.id);
    const res:Record<string, Path> = {};

    for(let key in map){
      if(vertex.id!==key){
        res[key] = {
          path:[],
          distance:map[key].shortDistance
         };
         if(map[key].shortDistance!== Number.POSITIVE_INFINITY){
          this.putPath(key, map, res[key].path);
        }
  
      }
    }
    return res;
  }

  test(key:string){
    this.algorithm(key);
  }
 
  private putPath(key:string | undefined , map:RecordMap, list:string[]){
    if(key){
      list.unshift(key);
      if(map[key].previous)
        this.putPath(map[key].previous, map, list);
    }
  }
  

  private algorithm(key:string):RecordMap{
    const keysNode = this.graph.getKeyVertexList()
    const visitedNode  : Set<string> = new Set();
    const unvisitedNodes  = new Set(keysNode);
    
    const mapTrack:RecordMap= {};
    keysNode.forEach((v)=>{mapTrack[v]={shortDistance:Number.POSITIVE_INFINITY,previous:undefined}});
    
    mapTrack[key].shortDistance=0;

    while(unvisitedNodes.size > 0){
      
      let less= {key:'', value:Number.POSITIVE_INFINITY}

      unvisitedNodes.forEach(node=>{
        if( mapTrack[node]!.shortDistance < less.value ){
           less.key= node;
           less.value = mapTrack[node]!.shortDistance;
        }
      });
      
      if(less.key === '') break; // no more nodes to visit

      const neighborNode = this.graph.getAdacencyList(less.key)
      neighborNode.forEach((node) => {
        const newVal = node.weight! + less.value;
        if (!visitedNode.has(node.vertex.id) && newVal < mapTrack[node.vertex.id]!.shortDistance ) {
          mapTrack[node.vertex.id]!.shortDistance = newVal;
          mapTrack[node.vertex.id]!.previous = less.key;
        }
      });

      unvisitedNodes.delete(less.key);
      visitedNode.add(less.key);
    }

    return mapTrack;
  }

}