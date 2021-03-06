export default class MyPromise {
  constructor(callback) {
    this.status = "pending";
    this.promiseResult = undefined;
    this.fulFilledFn = [];
    this.rejectedFn = [];
    callback(
      (v) => this.resolve(v),
      (v) => this.reject(v)
    );
  }
  then(onFulfilled) {
    switch (this.status) {
      case "pending": {
        console.log("pending");
        return new MyPromise((resolve) => {
          this.fulFilledFn.push(() => resolve(onFulfilled(this.promiseResult)));
        });
      }
      case "fulfilled": {
        console.log("fulfilled");
        return new MyPromise((resolve) =>
          resolve(onFulfilled(this.promiseResult))
        );
      }
      case "rejected": {
        break;
      }
    }
    return this;
  }
  catch = (onRejected) => {
    const rejectedTask = () => {
      onRejected(this.promiseResult);
    };
    switch (this.status) {
      case "pending":
        this.rejectedFn = rejectedTask;
      case "fulfilled":
        break;
      case "rejected":
        this.addToTaskQueue(this.rejectedFn);
    }
    return this;
  };
  resolve = (v) => {
    if (this.status !== "pending") {
      return this;
    }
    this.status = "fulfilled";
    this.promiseResult = v;
    this._doTask(this.fulFilledFn);
  };
  reject = (err) => {
    if (this.status !== "pending") {
      return this;
    }
    this.status = "rejected";
    this.promiseResult = err;
    this._doTask(this.rejectedFn);
    t;
  };
  _doTask = (t) => {
    t.forEach((e) => this.addToTaskQueue(e));
  };
  addToTaskQueue = (t) => setTimeout(t, 0);
}

const original = new Promise((resolve, reject) => {
  reject("hello");
})
  .then((v) => {
    console.log(1);
    return v;
  })
  .then((v) => {
    console.log(2);
    return v;
  })
  .catch((err) => console.log(err))

original
  .then((v) => console.log(v + " test1"))
  .then((v) => v + " test1")
  .then((v) => v + " test2")
  .then((v) => console.log(v))
  .catch((err) => console.log(err));

const copy = new MyPromise((resolve, reject) => {
  resolve(11);
});
console.log(copy)
  .then((v) => v + " test1")
  .then((v) => v + " test2")
  .then((v) => console.log(v))
  .catch((err) => console.log(err));
console.log(copy);
