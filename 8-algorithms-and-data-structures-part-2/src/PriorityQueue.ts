
interface PriorityQueueI<T> {
  enqueue(value: T, priority: number): void;
  dequeue(): T | undefined;
  size(): number;
}

export class PriorityQueue<T> implements PriorityQueueI<T> {
  private arrayHeap = new ArrayHeap<T>();
  enqueue(value: T, priority: number): void {
    this.arrayHeap.add({data:value, priority})
  }
  dequeue(): T {
    return this.arrayHeap.remove();
  }
  size(): number {
    return this.arrayHeap.size();
  }

  toString(){
    return this.arrayHeap.toString();
  }

  

}
type THeap<T>  = {data:T, priority:number}

class ArrayHeap<T> {
  private array:THeap<T>[]

  constructor(){
    this.array=[];
  }

  add(node:THeap<T>){
    this.array.push(node);
    this.up(this.array.length);
  }

  size(){
    return this.array.length;
  }

  remove():T | undefined{

    if(this.array.length<=1){
      const dt = this.array.pop();
      return dt ? dt.data : undefined;
    }

    const r = this.array[0].data;
    this.array[0] = this.array.pop();
    this.down(0);
    return r;
  }

  toString(){
    return this.array.map((dt)=>`${dt.priority}`);
  }

  private up(pos:number){
    if(pos!=1){
      const parent = Math.floor(pos/2)-1;
      if(this.array[pos-1].priority < this.array[parent].priority){
        [this.array[parent],this.array[pos-1]] =  [this.array[pos-1], this.array[parent]]
        this.up(parent+1)
      }
    }
  }


  private down(pos:number ){
      const pLeft =   2*pos + 1;
      const pRight = 2*pos + 2;
      let newPos: undefined | number = undefined;
  
      if(pLeft>=this.array.length){
        return;
      }
  
      //both exist, choose the less and the compare with the parent
      if(pRight < this.array.length ){
  
        if(this.array[pLeft].priority<this.array[pRight].priority && this.array[pos].priority> this.array[pLeft].priority){
          newPos=pLeft;
        }else if(this.array[pos].priority> this.array[pRight].priority ){
          newPos = pRight;
        }
      
      }else if(this.array[pos].priority> this.array[pLeft].priority){
        newPos=pLeft;
      }
    
      if(newPos !== undefined){
        [this.array[pos],this.array[newPos]] =  [this.array[newPos],this.array[pos]]
        this.down(newPos)
      } 
  }

}