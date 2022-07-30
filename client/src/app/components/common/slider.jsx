import React, { useEffect, useState, useCallback } from "react";

import pizzaImg1 from "../../assets/slides/pizza1_1296_640.JPG";
import pizzaImg2 from "../../assets/slides/pizza2_1296_640.JPG";

const slides = [
  { id: "0", image: pizzaImg1 },
  { id: "1", image: pizzaImg2 }
];

const Slider = () => {
  const [slide, setSlide] = useState(0);

  const changeSlide = useCallback(() => {
    if (slide < slides.length - 1) {
      setSlide((prevState) => prevState + 1);
    } else {
      setSlide(0);
    }
  }, [slide]);

  useEffect(() => {
    const interval = setInterval(() => {
      changeSlide();
    }, 30000);

    return () => {
      clearInterval(interval);
    };
  }, [slide, changeSlide]);

  const onNextSlide = () => {
    changeSlide();
  };

  const onPrevSlide = () => {
    if (slide > 0) {
      setSlide((prevState) => prevState - 1);
    } else {
      setSlide(slides.length - 1);
    }
  };

  return (
    <div className="carousel slide">
      <div className="carousel-inner">
        <div className="carousel-item active">
          <img
            src={slides[slide].image}
            className="d-block w-100 w-100 rounded"
            alt="Pizza"
          />
        </div>
      </div>
      <button
        type="button"
        className="carousel-control-prev"
        onClick={onPrevSlide}
      >
        <span className="carousel-control-prev-icon" aria-hidden="true" />
        <span className="visually-hidden">Previous</span>
      </button>
      <button
        type="button"
        className="carousel-control-next"
        onClick={onNextSlide}
      >
        <span className="carousel-control-next-icon" aria-hidden="true" />
        <span className="visually-hidden">Next</span>
      </button>
    </div>
  );
};

export default Slider;
