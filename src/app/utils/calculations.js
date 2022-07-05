export function calcTotalPrice(data) {
  return data.reduce((sum, obj) => obj.price * obj.count + sum, 0);
}

export function calcTotalCount(data) {
  return data.reduce((sum, obj) => sum + obj.count, 0);
}
