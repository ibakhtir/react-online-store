function correctData(data) {
  return String(data).length < 2 ? `0${data}` : data;
}

export default function displayDate(data) {
  const date = new Date(parseInt(data));
  const dateNow = new Date();
  const yearDif = dateNow.getFullYear() - date.getFullYear();

  if (yearDif === 0) {
    const dayDif = dateNow.getDate() - date.getDate();
    if (dayDif === 0) {
      const hourDif = dateNow.getHours() - date.getHours();
      if (hourDif === 0) {
        const minutesDif = dateNow.getMinutes() - date.getMinutes();
        if (minutesDif >= 0 && minutesDif < 5) return "1 минуту назад";
        if (minutesDif >= 5 && minutesDif < 10) return "5 минут назад";
        if (minutesDif >= 10 && minutesDif < 30) {
          return "10 минут назад";
        }
        return "30 минут назад";
      }
      const minutes = correctData(date.getMinutes());
      const hours = correctData(date.getHours());
      return `${hours}:${minutes}`;
    }
    const month = date.toLocaleString("default", { month: "long" });
    const correctMonth =
      month === "март" || month === "август"
        ? `${month}a`
        : `${month.slice(0, -1)}я`;
    return `${date.getDate()} ${correctMonth}`;
  }
  const days = correctData(date.getDate());
  const month = correctData(date.getMonth() + 1);
  return `${days}.${month}.${date.getFullYear()}`;
}
