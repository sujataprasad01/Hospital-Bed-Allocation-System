export class PriorityQueue {
    constructor() {
      this.queue = [];
    }
  
    // Add a patient to the queue
    enqueue(patient) {
      this.queue.push(patient);
      this.queue.sort((a, b) => b.urgency - a.urgency);
    }
  
    // Remove a patient from the queue
    dequeue() {
      return this.queue.shift();
    }
  
    // Check if the queue is empty
    isEmpty() {
      return this.queue.length === 0;
    }
  
    // Get the current queue
    getQueue() {
      return this.queue;
    }
  }
  