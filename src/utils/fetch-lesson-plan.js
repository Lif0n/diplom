export default function FetchLessonPlan(arr) {
  //проход по всему массиву
  const newArr = arr.map(lp => {
    console.log(lp);
    if(lp.teachers.length == 0){
      return lp;
    }
    //получение пар, которые идут в одно и тоже время
    const lpAtSameTime = arr.filter(lp1 => lp1.weekday === lp.weekday && lp1.weekNumber === lp.weekNumber && lp1.lessonNumber === lp.lessonNumber && lp1.id !== lp.id);
    //массив с ошибками
    let errors = [];
    //проход по парам, которые идут в это же время
    lpAtSameTime.forEach(lp1 => {
      //проверка на то, одинаковые ли преподы
      if(lp1.teachers.length == 0){
        return lp;
      }
      if (lp.teachers[0].id == lp1.teachers[0].id) {
        errors = [...errors, `${lp.teachers[0].lastName} ${lp.teachers[0].firstName[0]}. ${lp.teachers[0].middleName[0]}. уже ведет пару в это время у группы ${lp1.group.groupCode}`];
      }
    })
    if (errors.length > 0) {
      console.log(errors);
      return { ...lp, errors: errors };
    }
    return lp
  });
  return newArr;
}