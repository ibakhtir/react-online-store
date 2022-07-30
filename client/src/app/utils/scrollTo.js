const scrollTo = (position = 0) => {
  window.scrollTo({
    top: position,
    behavior: "smooth"
  });
};

export default scrollTo;
