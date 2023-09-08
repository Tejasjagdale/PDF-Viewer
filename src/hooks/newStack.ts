class Stack<T> {
  private items: T[] = [];

  // Push an element onto the stack
  push(element: T): void {
    this.items.push(element);
  }

  // Pop the top element from the stack
  pop(): T | undefined {
    if (this.isEmpty()) {
      return undefined;
    }
    return this.items.pop();
  }

  // Peek at the top element without removing it
  peek(): T | undefined {
    if (this.isEmpty()) {
      return undefined;
    }
    return this.items[this.items.length - 1];
  }

  // Check if the stack is empty
  isEmpty(): boolean {
    return this.items.length === 0;
  }

  // Get the size of the stack
  size(): number {
    return this.items.length;
  }

  // Print the stack
  print(): string {
    return this.items.map(item => JSON.stringify(item)).toString();
  }
}

export default Stack;
