import moment from 'moment';

export default function groupSchedules(schedules) {
  const today = [];
  const weekAgo = [];
  const earlier = [];

  schedules.forEach((schedule) => {
    const lastChange = moment(schedule.lastChange);
    const now = moment();

    let label = `${schedule.academicYear} г. ${schedule.semester} сем. [${schedule.scheduleStatus.name}`;
    if (schedule.lastChange != null) {
        const date = new Date(schedule.lastChange)
        label += ` ${lastChange.format("DD.MM.YYYY h:mm")}`;
    }
    label += ']'
    const option = {
      value: schedule.id,
      label: <span dangerouslySetInnerHTML={{ __html: label }} />,
    };

    if (lastChange.isSame(now, 'day')) {
      today.push(option);
    } else if (lastChange.isAfter(now.subtract(7, 'days'))) {
      weekAgo.push(option);
    } else {
      earlier.push(option);
    }
  });

  return [
    {
      label: <span>Сегодня</span>,
      title: 'today',
      options: today,
    },
    {
      label: <span>Неделю назад</span>,
      title: 'weekAgo',
      options: weekAgo,
    },
    {
      label: <span>Раньше</span>,
      title: 'earlier',
      options: earlier,
    },
  ];
}