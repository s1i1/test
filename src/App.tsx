import React from 'react';
import './App.css';

const App = () => {
  const thumbRef = React.useRef<HTMLDivElement>(null);
  const sliderRef = React.useRef<HTMLDivElement>(null);

  const onMouseDown = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    const thumb = thumbRef.current;
    const slider = sliderRef.current;

    if (thumb && slider) {
      let shiftX = e.clientX - thumb.getBoundingClientRect().left;

      const onMouseMove = (event: MouseEvent) => {

        let newLeft = event.clientX - shiftX - slider.getBoundingClientRect().left;

        if (newLeft < 0) {
          newLeft = 0;
        }

        let rightEdge = slider.offsetWidth - thumb.offsetWidth;

        if (newLeft > rightEdge) {
          newLeft = rightEdge;
        }

        thumb.style.left = newLeft + 'px';
      };

      const onMouseUp = () => {
        document.removeEventListener('mouseup', onMouseUp);
        document.removeEventListener('mousemove', onMouseMove);
      };

      document.addEventListener('mousemove', onMouseMove);
      document.addEventListener('mouseup', onMouseUp);
    }
  };

  return (
    <div className="wrapper">
      <div ref={sliderRef} className="slider">
        <div ref={thumbRef} className="thumb" onMouseDown={onMouseDown}></div>
      </div>
    </div>
  );
};

export default App;
