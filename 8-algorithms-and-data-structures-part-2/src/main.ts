import { PriorityQueue } from "./PriorityQueue";

const pQueue = new PriorityQueue<number>();

pQueue.enqueue(5,5);
pQueue.enqueue(8,8);
pQueue.enqueue(4,4);
pQueue.enqueue(3,3);
pQueue.enqueue(1,1);
pQueue.enqueue(2,1);
pQueue.enqueue(6,6);
pQueue.enqueue(7,7);





while(pQueue.size()>0){
    console.log(pQueue.dequeue());
}