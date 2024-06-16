export default function GetClosestSchedule(arr){
  console.log(arr);
  if(arr.length == 1){
    return arr[0];
  }
  if(arr.length > 0){
    return arr.reduce((nearest, item) => {
      const distanceCurrent = Math.abs((item.academicYear - localStorage.getItem('currentYear')) * 2 + (item.semester - localStorage.getItem('currentSemester')));
      const distanceNearest = Math.abs((nearest.academicYear - localStorage.getItem('currentYear')) * 2 + (nearest.semester - localStorage.getItem('currentSemester')));
      console.log(nearest);
      return distanceCurrent < distanceNearest ? item : nearest;
    })
  }

}