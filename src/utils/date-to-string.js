export default function DateToString(date, addDays) {
  console.log(date);
  date.setDate(date.getDate() + addDays)
  const day = String(date.getDate()).padStart(2, '0');
  const month = String(date.getMonth() + 1).padStart(2, '0'); // Месяцы начинаются с 0
  const year = date.getFullYear();

  // Формируем строку формата dd.mm.yyyy
  return `${day}.${month}.${year}`;
}