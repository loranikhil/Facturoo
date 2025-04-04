import React, { useState, useEffect } from "react";
import { RiDrinks2Fill, RiGift2Fill, RiSparkling2Fill, RiTimeFill } from "react-icons/ri";
import "./MarketingPromotions.css";

const MarketingPromotions = () => {
  const [activeIndex, setActiveIndex] = useState(0);

  const promotions = [
    {
      id: 1,
      title: "Weekend Offer",
      description: "50% OFF on all Desserts!",
      code: "FLASH50",
      color: "#de6540",
      icon: <RiDrinks2Fill size={32} />
    },
    {
      id: 2,
      title: "New Customer Special",
      description: "Get 20% OFF your first Order",
      code: "WELCOME20",
      color: "#ded523",
      icon: <RiGift2Fill size={32} />
    },
    {
      id: 3,
      title: "Buy One Get One",
      description: "BOGO on selected items - limited time offer",
      code: "BOGO2025",
      color: "#175491",
      icon: <RiSparkling2Fill size={32} />
    },
    {
      id: 4,
      title: "Happy Hours",
      description: "Get any Item @399/-",
      code: "HAPPY25",
      color: "#fcba03",
      icon: <RiTimeFill size={32} />
    }
  ];


  useEffect(() => {
    const interval = setInterval(() => {
      setActiveIndex((prevIndex) => (prevIndex + 1) % promotions.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [promotions.length]);

  const goToPromo = (index) => {
    setActiveIndex(index);
  };

  return (
    <div className="marketing">
      <h1>
        <span className="marketing-icon">📢</span> Promotions & Offers
      </h1>
      
      <div className="promo-carousel-container">
        <div 
          className="promo-carousel" 
          style={{ transform: `translateX(${-activeIndex * 100}%)` }}
        >
          {promotions.map((promo) => (
            <div 
              key={promo.id}
              className="promo-card" 
              style={{ backgroundColor: promo.color }}
            >
              <div className="promo-content">
                <div className="promo-icon">{promo.icon}</div>
                <div className="promo-details">
                  <h2>{promo.title}</h2>
                  <p>{promo.description}</p>
                  <div className="promo-code">
                    Use code: <span>{promo.code}</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="promo-controls">
        
        
        <div className="promo-arrows">
          <button 
            className="promo-arrow prev" 
            onClick={() => goToPromo((activeIndex - 1 + promotions.length) % promotions.length)}
            aria-label="Previous promotion"
          >
            ←
          </button>
          <button 
            className="promo-arrow next" 
            onClick={() => goToPromo((activeIndex + 1) % promotions.length)}
            aria-label="Next promotion"
          >
            →
          </button>
        </div>
      </div>
    </div>
  );
};

export default MarketingPromotions;