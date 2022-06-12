
export default (object: any, keys: Array<any>): any => {
  return keys.reduce((obj, key)=> {
    if (object && Object.prototype.hasOwnProperty.call(object, key)) {
      obj[key] = object[key];
    }
    return obj;
  }, {});
};

