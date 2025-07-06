import React, { useEffect, useRef } from 'react';
import useCountUp from '../hooks/useCountUp';

const CounterNumber = ({ end, duration = 2000, suffix = '', prefix = '', className = '' }) => {
  const [count, startAnimation, hasStarted] = useCountUp(end, duration);
  const ref = useRef();
  const mountedRef = useRef(false);

  useEffect(() => {
    // Only start animation once when component mounts
    if (!mountedRef.current && !hasStarted) {
      mountedRef.current = true;
      
      const timer = setTimeout(() => {
        console.log(`Starting animation for ${end}`); // Debug log
        startAnimation();
      }, 500);
      
      return () => clearTimeout(timer);
    }
  }, [startAnimation, hasStarted, end]);

  return (
    <span ref={ref} className={className}>
      {prefix}{count.toLocaleString()}{suffix}
    </span>
  );
};

export default CounterNumber;
