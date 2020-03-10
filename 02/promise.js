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
    const wp = new WeakPromise((resolve, reject) => {
      if (this.status === WeakPromise.FULFILLED) {
        setTimeout(() => {
          this.parse(wp, onFulfilled(this.value), resolve, reject);
        });
      }
      if (this.status === WeakPromise.REJECTED) {
        setTimeout(() => {
          this.parse(wp, onRejected(this.value), resolve, reject);
        });
      }
      if (this.status === WeakPromise.PENDING) {
        this.callbacks.push({
          onFulfilled: value => {
            this.parse(wp, onFulfilled(value), resolve, reject);
          },
          onRejected: value => {
            this.parse(wp, onRejected(value), resolve, reject);
          }
        });
      }
    });
    return wp;
  }
  parse(wp, result, resolve, reject) {
    if (wp == result) {
      throw new TypeError("Chaining cycle detected for weak promise");
    }
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
  static resolve(value) {
    return new WeakPromise((resolve, reject) => {
      if (value instanceof WeakPromise) {
        value.then(resolve, reject);
      } else {
        resolve(value);
      }
    });
  }
  static reject(value) {
    return new WeakPromise((resolve, reject) => {
      reject(value);
    });
  }
  static all(wps) {
    const values = [];
    return new WeakPromise((resolve, reject) => {
      wps.forEach(wp => {
        wp.then(
          value => {
            values.push(value);
            if (values.length === wps.length) {
              resolve(values);
            }
          },
          reason => {
            reject(reason);
          }
        );
      });
    });
  }
  static race(wps) {
    return new WeakPromise((resolve, reject) => {
      wps.forEach(wp => {
        wp.then(
          value => {
            resolve(value);
          },
          reason => {
            reject(reason);
          }
        );
      });
    });
  }
}
export default WeakPromise;
