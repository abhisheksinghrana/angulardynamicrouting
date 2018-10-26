export function getLocale(key) {
  if (document.cookie.indexOf(key) > -1) {
    return document.cookie
      .split(key)[1]
      .split('; ')[0]
      .substr(1);
  } else {
    return 'en';
  }
}

export function getObjectPropertyValue(prop: string) {
  return this.hasOwnProperty(prop) ? '/' + this[prop] : '';
}

export function formatFloat(number: any, precision: number = 2): number {
  return (
    Math.round(
      parseFloat((number * Math.pow(10, precision)).toFixed(precision))
    ) / Math.pow(10, precision)
  );
}

export function convertObjToArray(obj) {
  const keys = [];
  for (const key in obj) {
    keys.push({ key: key, value: obj[key] });
  }
  return keys;
}

export function convertArrayToObjForSpecificKey(array, key) {
  const obj: any = {};
  for (const item of array) {
    if (item[key]) {
      obj[item[key]] = item;
    }
  }
  return obj;
}

export function cloneObject(object) {
  return JSON.parse(JSON.stringify(object));
}
