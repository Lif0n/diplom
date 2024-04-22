export default function uniqueValues(arr, key) {
  const uniqueMap = new Map();
  arr.forEach(element => {
    const keyValue = typeof element[key] === 'object' ? JSON.stringify(element[key]) : element[key];
    uniqueMap.set(keyValue, element[key])
  });
  return Array.from(uniqueMap.values());
}