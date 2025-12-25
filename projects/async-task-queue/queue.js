export class TaskQueue {
    constructor({ concurrency = 2 } = {}) {
        this.concurrency = concurrency;
        this.pending = [];
        this.running = new Map();
        this.completed = new Map();
        this.failed = new Map();
        this.taskId = 0;
        this.idleCallbacks = [];
    }
    add(taskFn) {
        const id = ++this.taskId;
        const task = {
        id,
        taskFn,
        status: "pending",
        retries: 0,
        canceled: false,
        };
        this.pending.push(task);
        this._runNext();
        return id;
    }
    cancel(id) {
        const index = this.pending.findIndex(t => t.id === id);
        if (index !== -1) {
        this.pending[index].canceled = true;
        this.pending.splice(index, 1);
        return true;
        }
        return false;
    }
    retry(id) {
        const task = this.failed.get(id);
        if (!task || task.retries >= 1) return false;
        task.status = "pending";
        task.retries++;
        this.failed.delete(id);
        this.pending.push(task);
        this._runNext();
        return true;
    }
    onIdle(cb) {
        this.idleCallbacks.push(cb);
    }
    getState() {
        return {
        pending: this.pending.length,
        running: this.running.size,
        completed: this.completed.size,
        failed: this.failed.size,
        };
    }
    _runNext() {
        while (
        this.running.size < this.concurrency &&
        this.pending.length > 0
        ) {
        const task = this.pending.shift();
        if (task.canceled) continue;
        this._execute(task);
        }
        if (
        this.pending.length === 0 &&
        this.running.size === 0
        ) {
        this._notifyIdle();
        }
    }
    async _execute(task) {
        task.status = "running";
        this.running.set(task.id, task);
        try {
        await task.taskFn();
        task.status = "completed";
        this.completed.set(task.id, task);
        } catch (err) {
        task.status = "failed";
        this.failed.set(task.id, task);
        } finally {
        this.running.delete(task.id);
        this._runNext();
        }
    }
    _notifyIdle() {
        this.idleCallbacks.forEach(cb => cb());
        this.idleCallbacks = [];
    }
}