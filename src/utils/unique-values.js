export default function uniqueValues(arr, key) {
  const uniqueMap = new Map();
  if (key) {
    arr.forEach(element => {
      const keyValue = typeof element[key] === 'object' ? JSON.stringify(element[key]) : element[key];
      uniqueMap.set(keyValue, element[key])
    });
  }
  else {
    arr.forEach(element => {
      const keyValue = typeof element === 'object' ? JSON.stringify(element) : element;
      uniqueMap.set(keyValue, element)
    })
  }
  return Array.from(uniqueMap.values());
}