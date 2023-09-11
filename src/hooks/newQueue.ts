class Queue<T> {
    private items: T[] = [];
  
    // Enqueue an element to the queue
    enqueue(element: T): void {
      this.items.push(element);
    }
  
    // Dequeue the front element from the queue
    dequeue(): T | undefined {
      if (this.isEmpty()) {
        return undefined;
      }
      return this.items.shift();
    }
  
    // Peek at the front element without removing it
    peek(): T | undefined {
      if (this.isEmpty()) {
        return undefined;
      }
      return this.items[0];
    }
  
    // Check if the queue is empty
    isEmpty(): boolean {
      return this.items.length === 0;
    }
  
    // Get the size of the queue
    size(): number {
      return this.items.length;
    }
  
    // Print the queue
    print(): string {
      return this.items.map((item) => JSON.stringify(item)).toString();
    }
  }
  
  export default Queue;
  