class Semaphore {
    constructor(initialCount) {
        this.count = initialCount;
        this.waitQueue = [];
    }

    // Acquire the semaphore
    async acquire() {
        return new Promise((resolve) => {
            if (this.count > 0) {
                this.count--;
                resolve();
            } else {
                const waiter = () => {
                    if (this.count > 0) {
                        this.count--;
                        this.waitQueue = this.waitQueue.filter(w => w !== waiter);
                        resolve();
                    }
                };
                this.waitQueue.push(waiter);
            }
        });
    }

    // Release the semaphore
    release() {
        this.count++;
        const nextWaiter = this.waitQueue.shift();
        if (nextWaiter) {
            nextWaiter();
        }
    }
}

class ReaderWriter {
    constructor() {
        this.readerCount = 0;
        this.writerCount = 0;
        this.mutex = new Semaphore(1);
        this.rwMutex = new Semaphore(1);
    }

    async startRead() {
        await this.mutex.acquire();
        this.readerCount++;
        if (this.readerCount === 1) {
            await this.rwMutex.acquire();
        }
        this.mutex.release();
        console.log("Reading...");
    }

    async endRead() {
        await this.mutex.acquire();
        this.readerCount--;
        if (this.readerCount === 0) {
            this.rwMutex.release();
        }
        this.mutex.release();
        console.log("Reading finished.");
    }

    async startWrite() {
        await this.rwMutex.acquire();
        this.writerCount++;
        console.log("Writing...");
    }

    async endWrite() {
        this.writerCount--;
        console.log("Writing finished.");
        this.rwMutex.release();
    }
}

// Example usage
const readerWriter = new ReaderWriter();

async function simulateReadWrite() {
    await readerWriter.startRead();
    // Reading process
    await new Promise(resolve => setTimeout(resolve, 1000)); // Simulating reading
    await readerWriter.endRead();
    await readerWriter.startWrite();
    // Writing process
    await new Promise(resolve => setTimeout(resolve, 1000)); // Simulating writing
    await readerWriter.endWrite();
}

// Simulating multiple read-write operations
async function simulateMultipleOperations() {
    await simulateReadWrite();
    await simulateReadWrite();
}

simulateMultipleOperations();
