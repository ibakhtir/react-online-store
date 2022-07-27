function createAvatar(type) {
  const url = `https://avatars.dicebear.com/api/${type}/`;
  const avatar = (Math.random() + 1).toString(36).substring(7);
  return `${url + avatar}.svg`;
}

function getRandomInteger(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}

module.exports = {
  createAvatar,
  getRandomInteger
};
