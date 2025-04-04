import React, { useState, useEffect, useRef } from 'react';
import "./LazyImage.css"
const LazyImage = ({ src, alt, className, placeholder, ...props }) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [isInView, setIsInView] = useState(false);
  const imgRef = useRef();
  const observerRef = useRef();

  useEffect(() => {
    if (!window.IntersectionObserver) {
      setIsInView(true);
      return;
    }

    observerRef.current = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInView(true);
          observerRef.current.unobserve(entry.target);
        }
      },
      {
        rootMargin: '200px',
        threshold: 0.01,
      }
    );

    if (imgRef.current) {
      observerRef.current.observe(imgRef.current);
    }

    return () => {
      if (observerRef.current && imgRef.current) {
        observerRef.current.unobserve(imgRef.current);
      }
    };
  }, []);

  return (
    <div ref={imgRef} className={`lazy-image-container ${className || ''}`}>
      {(!isLoaded || !isInView) && (
        <div className="lazy-image-placeholder">
          {placeholder && <img src={placeholder} alt="" className="lazy-placeholder" />}
        </div>
      )}
      {isInView && (
        <img
          src={src}
          alt={alt}
          onLoad={() => setIsLoaded(true)}
          className={`lazy-image ${isLoaded ? 'loaded' : 'loading'} ${className || ''}`}
          {...props}
        />
      )}
    </div>
  );
};

export default LazyImage;