export default function GetClosestSchedule(arr){
  if(arr.length > 0){
    return arr.reduce((nearest, item) => {
      const distanceCurrent = Math.abs((item.academicYear - localStorage.getItem('currentYear')) * 2 + (item.semester - localStorage.getItem('currentSemester')));
      const distanceNearest = Math.abs((nearest.academicYear - localStorage.getItem('currentYear')) * 2 + (nearest.semester - localStorage.getItem('currentSemester')));
      return distanceCurrent < distanceNearest ? item : nearest;
    })
  }

}