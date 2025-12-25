import { TaskQueue } from "./queue.js";

const queue = new TaskQueue({ concurrency: 2 });

function fakeTask(id, delay, shouldFail = false) {
    return () =>
        new Promise((resolve, reject) => {
        console.log(`▶️ Task ${id} started`);
        setTimeout(() => {
            if (shouldFail) {
            console.log(`❌ Task ${id} failed`);
            reject();
            } else {
            console.log(`✅ Task ${id} completed`);
            resolve();
            }
        }, delay);
        });
}

queue.add(fakeTask(1, 1000));
queue.add(fakeTask(2, 500, true));
queue.add(fakeTask(3, 800));
queue.add(fakeTask(4, 400));

queue.onIdle(() => {
    console.log("🟢 Queue is idle");
    console.log(queue.getState());
    // retry failed task
    queue.retry(2);
});
