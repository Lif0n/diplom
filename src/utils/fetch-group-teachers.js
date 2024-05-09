export default function FetchGroupTeachers(oldArr, newArr){
  newArr.forEach(gt => {
    if(oldArr.find(oldGt => oldGt.id === gt.id) === undefined){
      oldArr.push(gt);
    }
  })
  return oldArr;
}