class WeakPromise {
  static PENDING = "pending";
  static FULFILLED = "fulfilled";
  static REJECTED = "rejected";

  constructor(exe) {
    this.status = WeakPromise.PENDING;
    this.callbacks = [];
    try {
      exe(this.resolve.bind(this), this.reject.bind(this));
    } catch (err) {
      this.reject(err);
    }
  }
  resolve(value) {
    if (this.status !== WeakPromise.PENDING) return;
    this.status = WeakPromise.FULFILLED;
    this.value = value;
    setTimeout(() => {
      this.callbacks.map(cb => {
        cb.onFulfilled(value);
      });
    });
  }
  reject(reason) {
    if (this.status !== WeakPromise.PENDING) return;
    this.status = WeakPromise.REJECTED;
    this.value = reason;
    setTimeout(() => {
      this.callbacks.map(cb => {
        cb.onRejected(reason);
      });
    });
  }
  then(onFulfilled, onRejected) {
    if (typeof onFulfilled !== "function") {
      onFulfilled = () => this.value;
    }
    if (typeof onRejected !== "function") {
      onRejected = () => this.value;
    }
    return new WeakPromise((resolve, reject) => {
      if (this.status === WeakPromise.FULFILLED) {
        setTimeout(() => {
          this.parse(onFulfilled(this.value), resolve, reject);
        });
      }
      if (this.status === WeakPromise.REJECTED) {
        setTimeout(() => {
          this.parse(onRejected(this.value), resolve, reject);
        });
      }
      if (this.status === WeakPromise.PENDING) {
        this.callbacks.push({
          onFulfilled: value => {
            this.parse(onFulfilled(value), resolve, reject);
          },
          onRejected: value => {
            this.parse(onRejected(value), resolve, reject);
          }
        });
      }
    });
  }
  parse(result, resolve, reject) {
    try {
      if (result instanceof WeakPromise) {
        result.then(resolve, reject);
      } else {
        resolve(result);
      }
    } catch (error) {
      reject(error);
    }
  }
}
export default WeakPromise;
