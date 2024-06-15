export default function GetAudiencesErrors(arr){

  const newArr = arr.map(lp => {
    console.log(lp);
    if(lp.audience == null){
      console.log(lp);
      return lp;
    }

    const lpAtSameTime = arr.filter(lp1 => lp1.weekday === lp.weekday && lp1.weekNumber === lp.weekNumber && lp1.lessonNumber === lp.lessonNumber && lp1.id !== lp.id);

    let errors = [];

    lpAtSameTime.filter((lp1) => lp1.audience != null).forEach(lp1 => {
      console.log(lp1);
      if(lp.audience == lp1.audience){
        errors = [...errors, `В ${lp1.audience.number} уже идет пара в это время у ${lp1.group.groupCode}`]
      }
    });
    if (errors.length > 0){
      return {...lp, errors: [...lp.errors, errors]}
    }
    return lp;
  })
  return newArr;
}