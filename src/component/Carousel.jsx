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
            src="https://www.its.ac.id/tgeofisika/wp-content/uploads/sites/33/2023/04/Poster-Webinar-Manajemen-Resiko-Longsor-1.png"
            className="d-block w-100"
            alt="..."
          />
        </Carousel.Item>
        <Carousel.Item>
          <img
            src="https://www.its.ac.id/tgeofisika/wp-content/uploads/sites/33/2023/04/Poster-Webinar-Manajemen-Resiko-Longsor-1.png"
            className="d-block w-100"
            alt="..."
          />
        </Carousel.Item>
      </Carousel>
    </div>
  );
};

export default Carousel_Custom;
