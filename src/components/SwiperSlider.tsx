import React, { useRef, useState } from "react";

type SwiperSliderProps = {
  images: string[];
};

const SwiperSlider = ({ images }: SwiperSliderProps) => {
  const sliderRef = useRef<HTMLDivElement>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);
  const [activeIndex, setActiveIndex] = useState(0);

  const handleMouseDown = (e: React.MouseEvent<HTMLDivElement>) => {
    setIsDragging(true);
    setStartX(e.pageX - sliderRef.current!.offsetLeft);
    setScrollLeft(sliderRef.current!.scrollLeft);
    sliderRef.current!.style.cursor = "grabbing";
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!isDragging) return;

    const x = e.pageX - sliderRef.current!.offsetLeft;
    const walk = (x - startX) * 2;
    sliderRef.current!.scrollLeft = scrollLeft - walk;
  };

  // Handles mouse up and mouse leave to stop dragging
  const handleMouseUpOrLeave = () => {
    setIsDragging(false);
    sliderRef.current!.style.cursor = "grab";
  };

  // Handles scroll and updates active image index
  const handleScroll = () => {
    const slideWidth = sliderRef.current!.offsetWidth;
    const index = Math.round(sliderRef.current!.scrollLeft / slideWidth);
    setActiveIndex(index);
  };

  const goToNext = () => {
    if (activeIndex < images.length - 1) {
      setActiveIndex(activeIndex + 1);
      sliderRef.current!.scrollLeft += sliderRef.current!.offsetWidth;
    }
  };

  const goToPrev = () => {
    if (activeIndex > 0) {
      setActiveIndex(activeIndex - 1);
      sliderRef.current!.scrollLeft -= sliderRef.current!.offsetWidth;
    }
  };

  const isSwipable = images.length > 1
  return (
    <div className="swiper-slider">
      {isSwipable && <button className="slider-btn prev" onClick={goToPrev}>
        &#10094;
      </button>}
      <div
        className={`slider-wrapper ${isDragging ? "dragging" : ""}`}
        ref={sliderRef}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUpOrLeave}
        onMouseLeave={handleMouseUpOrLeave}
        onScroll={handleScroll}
        style={{ cursor: "grab" }} // Cursor on load
      >
        {images.map((image, index) => (
          <div className="slider-item" key={index}>
            <img src={image} alt={`Product Image ${index}`} loading="lazy" />
          </div>
        ))}
      </div>
      {isSwipable && <button className="slider-btn next" onClick={goToNext}>
        &#10095;
      </button>}
      <div className="slider-indicators">
        {images.map((_, index) => (
          <span
            key={index}
            className={`indicator-dot ${activeIndex === index ? "active" : ""}`}
          ></span>
        ))}
      </div>
    </div>
  );
};

export default SwiperSlider;
