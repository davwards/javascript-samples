export default function FakePromise() {
  const callbacks = [];

  this.then = function(callback) {
    callbacks.push(callback);
  };

  this.resolveWith = function(result) {
    callbacks.reduce(function(resultSoFar, callback) {
      return callback(resultSoFar);
    }, result);
  };
}

