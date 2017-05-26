export function isPromise(object) {
  return object && object.then;
}
