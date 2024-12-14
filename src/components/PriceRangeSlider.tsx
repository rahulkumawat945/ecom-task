import React, { useState, useEffect } from 'react';

interface PriceRangeSliderProps {
  minPrice?: number;
  maxPrice?: number;
  onChange?: (start: number, end: number) => void;
}

const PriceRangeSlider: React.FC<PriceRangeSliderProps> = ({ minPrice = 130, maxPrice = 500, onChange }) => {
  const [start, setStart] = useState<number>(minPrice);
  const [end, setEnd] = useState<number>(maxPrice);

  useEffect(() => {
    setStart(minPrice);
    setEnd(maxPrice);
  }, [minPrice, maxPrice]);

  const handleStartChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = +e.target.value;
    const newStart = Math.min(value, end - 1);
    setStart(newStart);
    if (onChange) onChange(newStart, end);
  };

  const handleEndChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = +e.target.value;
    const newEnd = Math.max(value, start + 1);
    setEnd(newEnd);
    if (onChange) onChange(start, newEnd);
  };

  return (
    <div className="price-range-slider">
      <div className="range-bar">
        <input
          type="range"
          min={minPrice}
          max={maxPrice}
          value={start}
          onChange={handleStartChange}
          className="slider start-slider"
        />
        <input
          type="range"
          min={minPrice}
          max={maxPrice}
          value={end}
          onChange={handleEndChange}
          className="slider end-slider"
        />
      </div>
      <div className="labels">
        <span>${start}</span>
        <span>${end}</span>
      </div>
    </div>
  );
};

export default PriceRangeSlider;
