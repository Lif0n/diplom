export default function FetchGroupTeachers(oldArr, newArr){
  console.log(oldArr);
  console.log(newArr);
  let arr = oldArr.concat();
  newArr.forEach(gt => {
    if(!oldArr.find(oldGt => oldGt.id === gt.id)){
      arr.push(gt);
    }
  })

  console.log(arr);
  return arr;
}