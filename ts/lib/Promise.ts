
import Q = require('q');

class Promise {
	public static createPromise<T>(func: (d: Q.Deferred<T>) => void, ...args: any[]): Q.Promise<T> {
		var d = Q.defer<T>();
		var a = [d].concat(args);
		console.log(a);
		func.apply(func, a);
		return d.promise;
	}
}

export = Promise;