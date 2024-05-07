import { PriorityQueue } from "./PriorityQueue";

export interface SchedulerI {
  postTask(task: () => Promise<any>, priority: number): void;
  run(): Promise<void>;
}

export class Scheduler implements SchedulerI {

  pQueue = new PriorityQueue<() => Promise<any>>()

  postTask(task: () => Promise<any>, priority: number): void {
    this.pQueue.enqueue(task, priority)
  }
  
  run(): Promise<void> {
    let task;
    while( (task = this.pQueue.dequeue())!== undefined ){
      task();
    }

    return new Promise((resolve, reject) => {
      resolve();
  });
  }
}
