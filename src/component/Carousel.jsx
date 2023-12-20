import React from "react";
import { Carousel } from "react-bootstrap";
import { useState } from "react";

const Carousel_Custom = () => {
  const [index, setIndex] = useState(0);

  const handleSelect = (selectedIndex) => {
    setIndex(selectedIndex);
  };

  return (
    <div>
      <Carousel activeIndex={index} onSelect={handleSelect} about="test">
        <Carousel.Item>
          <img
            src="https://www.its.ac.id/tgeofisika/wp-content/uploads/sites/33/2023/04/Poster-Webinar-Manajemen-Resiko-Longsor-1.png"
            className="d-block w-100"
            alt="..."
          />
        </Carousel.Item>
        <Carousel.Item>
          <img
            src="https://feb.unila.ac.id/wp-content/uploads/2020/05/FEB-WEBINAR-poster.png"
            className="d-block w-100"
            alt="..."
          />
        </Carousel.Item>
        <Carousel.Item>
          <img
            src="https://grafologiindonesia.com/wp-content/uploads/2023/01/Poster-Webinar-CHA.jpg"
            className="d-block w-100"
            alt="..."
          />
        </Carousel.Item>
      </Carousel>
    </div>
  );
};

export default Carousel_Custom;
