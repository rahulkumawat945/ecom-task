import React, { useState } from 'react';

interface PriceRangeSliderProps {
  minPrice?: number;
  maxPrice?: number;
  onChange?: (start: number, end: number) => void;
}

const PriceRangeSlider = ({
  minPrice = 0,
  maxPrice = 1000,
  onChange,
}: PriceRangeSliderProps) => {
  const [startPrice, setStartPrice] = useState(minPrice);
  const [endPrice, setEndPrice] = useState(maxPrice);

  const handleSliderChange = (e: React.ChangeEvent<HTMLInputElement>, isStart: boolean) => {
    const value = Number(e.target.value);

    if (isStart) {
      const newStartPrice = Math.min(value, endPrice - 1); // Ensure no overlap
      setStartPrice(newStartPrice);
      if (onChange) onChange(newStartPrice, endPrice);
    } else {
      const newEndPrice = Math.max(value, startPrice + 1); // Ensure no overlap
      setEndPrice(newEndPrice);
      if (onChange) onChange(startPrice, newEndPrice);
    }
  };

  return (
    <div className="price-range-slider">
      <div className="slider-container">
        <div
          className="price-slider"
          style={{
            left: `${((startPrice - minPrice) / (maxPrice - minPrice)) * 100}%`,
            right: `${100 - ((endPrice - minPrice) / (maxPrice - minPrice)) * 100}%`,
          }}
        ></div>
        <div className="range-input">
          <input
            type="range"
            min={minPrice}
            max={maxPrice}
            value={startPrice}
            onChange={(e) => handleSliderChange(e, true)}
          />
          <input
            type="range"
            min={minPrice}
            max={maxPrice}
            value={endPrice}
            onChange={(e) => handleSliderChange(e, false)}
          />
        </div>
      </div>
      <div className="price-labels">
        <span>${startPrice}</span>
        <span>${endPrice}</span>
      </div>
    </div>
  );
};

export default PriceRangeSlider;
