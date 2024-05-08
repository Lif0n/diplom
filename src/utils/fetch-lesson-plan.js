export default function FetchLessonPlan(arr) {
  //проход по всему массиву
  const newArr = arr.map(lp => {
    //получение пар, которые идут в одно и тоже время
    const lpAtSameTime = arr.filter(lp1 => lp1.weekday === lp.weekday && lp1.weeknumber === lp.weeknumber && lp1.lessonNumber === lp.lessonNumber && lp1.id !== lp.id);
    //массив с ошибками
    let errors = [];
    //проход по преподам которые ведут текущую пару
    lp.teachers.forEach(teacher => {
      //проход по парам, которые идут в это же время
      lpAtSameTime.forEach(lp1 => {
        //проход по преподам пары, которая идет  это же время
        lp1.teachers.forEach(teacher1 => {
          //проверка на то, одинаковые ли преподы
          if (teacher.id == teacher1.id) {
            errors = [...errors, `${teacher.surname} ${teacher.name[0]}. ${teacher.patronymic[0]}. уже ведет пару в это время у группы ${lp1.group.speciality.name}-${lp1.group.name}`];
          }
        })
      })
    });
    if (errors.length > 0) {
      return { ...lp, errors: errors };
    }
    return lp
  });
  return newArr;
}