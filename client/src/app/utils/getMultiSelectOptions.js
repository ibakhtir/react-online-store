export default function getMultiSelectOptions(data) {
  let options = [];

  if (data) {
    options = data.map((obj) => ({
      value: obj._id,
      label: obj.name
    }));
  }

  return options.filter((obj) => obj.label !== "Все");
}
