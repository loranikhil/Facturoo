import React, { useState, useEffect } from 'react';
import './OffersPage.css';

const OffersPage = () => {
  // State for offers and filter options
  const [offers, setOffers] = useState([]);
  const [filteredOffers, setFilteredOffers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeFilter, setActiveFilter] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  
  // Fetch offers data (simulated)
  useEffect(() => {
    // In a real app, this would be an API call
    const fetchOffers = () => {
      setLoading(true);
      // Simulated API response
      const dummyOffers = [
        {
          id: 1,
          code: 'WELCOME50',
          title: '50% Off Your First Order',
          description: 'Get 50% off on your first order with us. Maximum discount up to ₹150.',
          category: 'new_user',
          validUntil: '2025-04-30',
          minOrderValue: 200,
          maxDiscount: 150,
          restaurantName: 'All Restaurants',
          isExclusive: true,
          image: 'https://qul.imgix.net/5dd2e2ca-1a95-470c-baa3-d14b969349ac/623576_sld.jpg'
        },
        {
          id: 2,
          code: 'WEEKEND25',
          title: '25% Off Weekend Special',
          description: 'Enjoy your weekend with 25% off on all orders above ₹500.',
          category: 'weekend',
          validUntil: '2025-03-31',
          minOrderValue: 500,
          maxDiscount: 200,
        //   restaurantName: 'Italian Delights',
          isExclusive: false,
          image: 'https://qul.imgix.net/b2514f62-b8e4-4708-b817-ba18d560528d/661287_sld.jpg'
        },
        {
          id: 3,
          code: 'DINNER20',
          title: '20% Off Dinner Orders',
          description: 'Get 20% off on all dinner orders placed between 7 PM and 11 PM.',
          category: 'time_based',
          validUntil: '2025-05-15',
          minOrderValue: 300,
          maxDiscount: 180,
        //   restaurantName: 'All Restaurants',
          isExclusive: false,
          image: 'https://t4.ftcdn.net/jpg/06/18/32/43/360_F_618324382_8m3mLOhMKcU0OvoMFZUHfCAgBhvdbou5.jpg'
        },
        {
          id: 4,
          code: 'SPICY30',
          title: '30% Off on Breakfast',
          description: 'Love Breakfast? Get 30% off on all Breakfast dishes this month!',
          category: 'cuisine',
          validUntil: '2025-03-31',
          minOrderValue: 250,
          maxDiscount: 120,
        //   restaurantName: 'Facturo',
          isExclusive: true,
          image: 'https://www.mistay.in/travel-blog/content/images/2020/07/cover-1-17.jpg'
        },
        {
          id: 5,
          code: 'FAMILY100',
          title: '₹100 Off on Family Packs',
          description: 'Order family packs and get flat ₹100 off. Perfect for group orders!',
          category: 'combo',
          validUntil: '2025-04-15',
          minOrderValue: 600,
          maxDiscount: 100,
        //   restaurantName: 'Family Kitchen',
          isExclusive: false,
          image: 'https://images.unsplash.com/photo-1700835880346-75df911b8fdc?fm=jpg&q=60&w=3000&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'
        },
        {
          id: 6,
          code: 'MONDAY15',
          title: 'Monday Blues: 15% Off',
          description: 'Beat the Monday blues with 15% off on all orders.',
          category: 'weekday',
          validUntil: '2025-06-30',
          minOrderValue: 200,
          maxDiscount: 100,
        //   restaurantName: 'All Restaurants',
          isExclusive: false,
          image: 'https://media.istockphoto.com/id/1169694902/photo/assorted-indian-non-vegetarian-food-recipe-served-in-a-group-includes-chicken-curry-mutton.jpg?s=612x612&w=0&k=20&c=J4jX3IYGdS3ODgHF0LHCySDo6bFObh0_GZzAqHgXZgU='
        }
      ];
      
      setOffers(dummyOffers);
      setFilteredOffers(dummyOffers);
      setLoading(false);
    };
    
    // Simulate network delay
    setTimeout(fetchOffers, 800);
  }, []);
  
  // Filter offers based on selected filter and search query
  useEffect(() => {
    if (offers.length > 0) {
      let result = [...offers];
      
      // Apply category filter
      if (activeFilter !== 'all') {
        result = result.filter(offer => offer.category === activeFilter);
      }
      
      // Apply search query
      if (searchQuery) {
        const query = searchQuery.toLowerCase();
        result = result.filter(
          offer => 
            offer.title.toLowerCase().includes(query) ||
            offer.description.toLowerCase().includes(query) ||
            offer.restaurantName.toLowerCase().includes(query) ||
            offer.code.toLowerCase().includes(query)
        );
      }
      
      setFilteredOffers(result);
    }
  }, [activeFilter, searchQuery, offers]);
  
  // Copy coupon code to clipboard
  const handleCopyCode = (code) => {
    navigator.clipboard.writeText(code)
      .then(() => {
        alert(`Coupon code ${code} copied to clipboard!`);
      })
      .catch(err => {
        console.error('Failed to copy code:', err);
      });
  };
  
  // Date formatter
  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };
  
  // Check if offer is expiring soon (within 7 days)
  const isExpiringSoon = (dateString) => {
    const today = new Date();
    const expiryDate = new Date(dateString);
    const diffTime = expiryDate - today;
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays > 0 && diffDays <= 7;
  };
  
  return (
    <div id="offersPage">
      <div id="heroSection">
        <div id="heroContent">
          <h1>Deals & Discounts</h1>
          <p>Exclusive offers to satisfy your cravings for less</p>
          <div id="searchContainer">
            {/* <input
              type="text"
              placeholder="Search for offers, restaurants or cuisines..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              id="searchInput"
            />
            <button id="searchButton">
              <i id="searchIcon">🔍</i>
            </button> */}
          </div>
        </div>
      </div>
      
      <div id="filtersContainer">
        <div id="filters">
          <button 
            id={`filterBtn${activeFilter === 'all' ? 'Active' : ''}`}
            onClick={() => setActiveFilter('all')}
          >
            All Offers
          </button>
          <button 
            id={`filterBtn${activeFilter === 'new_user' ? 'Active' : ''}`}
            onClick={() => setActiveFilter('new_user')}
          >
            New User
          </button>
          <button 
            id={`filterBtn${activeFilter === 'weekend' ? 'Active' : ''}`}
            onClick={() => setActiveFilter('weekend')}
          >
            Weekend
          </button>
          <button 
            id={`filterBtn${activeFilter === 'time_based' ? 'Active' : ''}`}
            onClick={() => setActiveFilter('time_based')}
          >
            Time-based
          </button>
          <button 
            id={`filterBtn${activeFilter === 'cuisine' ? 'Active' : ''}`}
            onClick={() => setActiveFilter('cuisine')}
          >
            Cuisine
          </button>
          <button 
            id={`filterBtn${activeFilter === 'combo' ? 'Active' : ''}`}
            onClick={() => setActiveFilter('combo')}
          >
            Combos
          </button>
          <button 
            id={`filterBtn${activeFilter === 'weekday' ? 'Active' : ''}`}
            onClick={() => setActiveFilter('weekday')}
          >
            Weekday
          </button>
        </div>
      </div>
      
      <div id="offersContainer">
        {loading ? (
          <div id="loadingContainer">
            <div id="loader"></div>
            <p>Loading amazing offers for you...</p>
          </div>
        ) : filteredOffers.length > 0 ? (
          <div id="offersGrid">
            {filteredOffers.map(offer => (
              <div id={`offerCard-${offer.id}`} key={offer.id}>
                {offer.isExclusive && <div id={`exclusiveTag-${offer.id}`}>EXCLUSIVE</div>}
                {isExpiringSoon(offer.validUntil) && <div id={`expiringTag-${offer.id}`}>ENDING SOON</div>}
                <div id={`offerImage-${offer.id}`}>
                  <img src={offer.image} alt={offer.title} />
                </div>
                <div id={`offerContent-${offer.id}`}>
                  <h3 id={`offerTitle-${offer.id}`}>{offer.title}</h3>
                  <p id={`restaurantName-${offer.id}`}>{offer.restaurantName}</p>
                  <p id={`offerDescription-${offer.id}`}>{offer.description}</p>
                  <div id={`offerDetails-${offer.id}`}>
                    <p><strong>Min Order:</strong> ₹{offer.minOrderValue}</p>
                    <p><strong>Max Discount:</strong> ₹{offer.maxDiscount}</p>
                    <p><strong>Valid Till:</strong> {formatDate(offer.validUntil)}</p>
                  </div>
                  <div id={`offerCodeContainer-${offer.id}`}>
                    <span id={`offerCode-${offer.id}`}>{offer.code}</span>
                    <button 
                      id={`copyBtn-${offer.id}`}
                      onClick={() => handleCopyCode(offer.code)}
                    >
                      Copy
                    </button>
                  </div>
                  {/* <button id={`applyBtn-${offer.id}`}>Order Now</button> */}
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div id="noOffers">
            <h3>No offers found</h3>
            <p>Try changing your filters or search query</p>
          </div>
        )}
      </div>
      
      <div id="newsletterSection">
        <div id="newsletterContainer">
          <div id="newsletterContent">
            <h2>Never Miss a Deal</h2>
            <p>Subscribe to our newsletter and be the first to know about exclusive offers</p>
            <div id="newsletterForm">
              <input 
                type="email" 
                placeholder="Enter your email address" 
                id="newsletterInput"
              />
              <button id="newsletterBtn">Subscribe</button>
            </div>
          </div>
        </div>
      </div>
      
      <div id="faqSection">
        <h2>Frequently Asked Questions</h2>
        <div id="faqContainer">
          <details id="faqItem1">
            <summary>How do I redeem an offer?</summary>
            <p>To redeem an offer, simply copy the coupon code and paste it at checkout. The discount will be applied automatically if your order meets the required conditions.</p>
          </details>
          <details id="faqItem2">
            <summary>Can I use multiple offers at once?</summary>
            <p>No, you can only use one offer per order. Choose the offer that gives you the best value!</p>
          </details>
          <details id="faqItem3">
            <summary>Why isn't my coupon code working?</summary>
            <p>Coupon codes may not work if your order doesn't meet the minimum order value, the offer has expired, or if you've already used a one-time code before.</p>
          </details>
          <details id="faqItem4">
            <summary>Do offers apply to delivery fees?</summary>
            <p>Most offers apply only to the food order value and not to delivery fees, taxes, or other charges unless specifically mentioned.</p>
          </details>
        </div>
      </div>
    </div>
  );
};

export default OffersPage;