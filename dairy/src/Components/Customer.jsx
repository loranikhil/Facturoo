import { useNavigate } from "react-router-dom";
import React, { useState, useEffect } from "react";
import { Search, ShoppingCart, Plus, Minus, X, Filter, ChevronRight, Clock, Home } from "lucide-react";
import "./Customer.css";

const Customer = () => {
  const [cart, setCart] = useState([]);
  const [showCart, setShowCart] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [activeCategory, setActiveCategory] = useState("all");
  const [checkoutStep, setCheckoutStep] = useState("cart"); 
  const [tableNumber, setTableNumber] = useState("");
  const [tableError, setTableError] = useState("");
  const [waitingTime, setWaitingTime] = useState(600);
  const [orderStatus, setOrderStatus] = useState("preparing");
  const [showNotification, setShowNotification] = useState(true);
  const [menuItems, setMenuItems] = useState([]);
  const [tables, setTables] = useState([]);
  const [showTableSelector, setShowTableSelector] = useState(false);
  const [imagesLoaded, setImagesLoaded] = useState({});
  

  const staticFoodItems = [
    { id: 1, name: "Margherita Pizza", price: 459, category: "pizza", image: "https://t3.ftcdn.net/jpg/00/27/57/96/360_F_27579652_tM7V4fZBBw8RLmZo0Bi8WhtO2EosTRFD.jpg", description: "Classic pizza with tomato sauce, mozzarella, and basil", rating: 4.5 },
    { id: 2, name: "Chicken Burger", price: 199, category: "burger", image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTcIgoQbw9scSA6PrP9En5RB7aQWsaZh14g-Q&s", description: "Juicy chicken patty with lettuce, tomato, and special sauce", rating: 4.3 },
    { id: 3, name: "Vegetable Pasta", price: 189, category: "pasta", image: "https://c4.wallpaperflare.com/wallpaper/185/542/554/food-tomatoes-wallpaper-preview.jpg", description: "Fresh pasta with seasonal vegetables in a light cream sauce", rating: 4.1 },
    { id: 4, name: "Caesar Salad", price: 289, category: "salad", image: "https://thedinnerbell.recipes/wp-content/uploads/2019/09/Garlic-Caesar-Salad-Recipe-4.jpg", description: "Crisp romaine lettuce with Caesar dressing, croutons, and parmesan", rating: 4.0 },
    { id: 5, name: "Chocolate Brownie", price: 299, category: "dessert", image: "https://i0.wp.com/cookingwithbry.com/wp-content/uploads/chocolate-brownies-recipe.png?fit=1080%2C1080&ssl=1", description: "Rich chocolate brownie served with vanilla ice cream", rating: 4.7 },
    { id: 6, name: "Grilled Salmon", price: 1199, category: "seafood", image: "https://www.pccmarkets.com/wp-content/uploads/2017/08/pcc-rosemary-grilled-salmon-flo.jpg", description: "Fresh salmon fillet grilled to perfection with herbs", rating: 4.6 },
    { id: 7, name: "Mushroom Risotto", price: 550, category: "rice", image: "https://img.freepik.com/premium-photo/mushroom-risotto-elegant-restaurant-plate-porcini-mushrooms-rissoto-delicious-italian-risoto-lunch-creamy-rice-food-traditional-mushroom-risotto-generative-ai-illustration_162695-17221.jpg", description: "Creamy Italian rice with wild mushrooms and parmesan", rating: 4.2 },
    { id: 8, name: "chicken Tacos", price: 399, category: "mexican", image: "https://amindfullmom.com/wp-content/uploads/2019/08/15-minute-Buffalo-Chicken-tacos.jpg", description: "Three soft tacos with spiced beef, salsa, and guacamole", rating: 4.4 },
    { id: 9, name: "Fruit Smoothie", price: 150, category: "beverage", image: "https://img.freepik.com/free-photo/bloody-mary-cocktail_93675-128917.jpg", description: "Refreshing blend of seasonal fruits with yogurt", rating: 4.3 }
  ];

  useEffect(() => {
    const loadTables = () => {
      const savedTables = JSON.parse(localStorage.getItem("tables")) || [];
   
      if (savedTables.length === 0) {
        const defaultTables = Array.from({ length: 20 }, (_, i) => ({
          id: i + 1,
          number: i + 1,
          isAvailable: true
        }));
        localStorage.setItem("tables", JSON.stringify(defaultTables));
        setTables(defaultTables);
      } else {
        setTables(savedTables);
      }
    };
  
    loadTables();
    
    
    window.addEventListener('storage', (e) => {
      if (e.key === 'tables') {
        loadTables();
      }
    });
    
    return () => {
      window.removeEventListener('storage', loadTables);
    };
  }, []);

  useEffect(() => {
    const loadMenuItems = () => {
      const inventoryItems = JSON.parse(localStorage.getItem("inventoryItems")) || [];
      setMenuItems([...staticFoodItems, ...inventoryItems]);
    };

    loadMenuItems();

    window.addEventListener('storage', loadMenuItems);
    
    return () => {
      window.removeEventListener('storage', loadMenuItems);
    };
  }, []);

  useEffect(() => {
    const initialImagesLoaded = {};
    menuItems.forEach(item => {
      initialImagesLoaded[item.id] = false;
    });
    setImagesLoaded(initialImagesLoaded);

    
    const timer = setTimeout(() => {
      const loadedImages = {};
      menuItems.forEach(item => {
        loadedImages[item.id] = true;
      });
      setImagesLoaded(loadedImages);
    }, 2000);

    return () => clearTimeout(timer);
  }, [menuItems]);

  useEffect(() => {
    let timer;
    if (checkoutStep === "waiting" && waitingTime > 0) {
      timer = setInterval(() => {
        setWaitingTime(prevTime => {
          if (prevTime <= 1) {
            clearInterval(timer);
            setOrderStatus("ready");
            return 0;
          }
          return prevTime - 1;
        });
      }, 1000);
    }

    return () => {
      if (timer) clearInterval(timer);
    };
  }, [checkoutStep, waitingTime]);

  const categories = ["all", ...new Set(menuItems.map(item => item.category))];

  const filteredFoodItems = menuItems.filter(item => {
    const matchesSearch = item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.description.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesCategory = activeCategory === "all" || item.category === activeCategory;
    
    return matchesSearch && matchesCategory;
  });

  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds < 10 ? '0' : ''}${remainingSeconds}`;
  };

  const handleCheckout = () => {
    setCheckoutStep("table-entry");
    setShowCart(false);
  };

  const handleTableSubmit = (e) => {
    e.preventDefault();
    
    if (!tableNumber) {
      setTableError("Please select a table");
      return;
    }
    


    
    const updatedTables = tables.map(table => 
      table.number === parseInt(tableNumber) ? { ...table, isAvailable: false } : table
    );
    
    localStorage.setItem("tables", JSON.stringify(updatedTables));
    setTables(updatedTables);
    
    const newOrder = {
      tableNumber,
      items: cart,
      totalPrice: parseFloat(getTotalPrice()) + 89,
      status: "preparing",
      orderTime: new Date().toLocaleString(),
    };
  
    const existingOrders = JSON.parse(localStorage.getItem("orders")) || [];
    localStorage.setItem("orders", JSON.stringify([...existingOrders, newOrder]));
    
    setCheckoutStep("waiting");
    setShowTableSelector(false);
  };

  useEffect(() => {
    const loadTables = () => {
      const savedTables = JSON.parse(localStorage.getItem("tables")) || [];
      
      if (savedTables.length === 0) {
        const defaultTables = Array.from({ length: 70 }, (_, i) => ({
          id: i + 1,
          number: i + 1,
          isAvailable: true
        }));
        localStorage.setItem("tables", JSON.stringify(defaultTables));
        setTables(defaultTables);
      } else {
        setTables(savedTables);
      }
    };
  
    loadTables();
    
 
    window.addEventListener('storage', (e) => {
      if (e.key === 'tables') {
        loadTables();
      }
    });
    
    return () => {
      window.removeEventListener('storage', loadTables);
    };
  }, []);


  const addToCart = (item) => {
    if (checkoutStep !== "cart") return; 
    
    const existingItem = cart.find(cartItem => cartItem.id === item.id);
    
    if (existingItem) {
      setCart(cart.map(cartItem => 
        cartItem.id === item.id 
          ? { ...cartItem, quantity: cartItem.quantity + 1 } 
          : cartItem
      ));
    } else {
      setCart([...cart, { ...item, quantity: 1 }]);
    }
  };

  const removeFromCart = (id) => {
    const existingItem = cart.find(item => item.id === id);
    
    if (existingItem.quantity === 1) {
      setCart(cart.filter(item => item.id !== id));
    } else {
      setCart(cart.map(item => 
        item.id === id 
          ? { ...item, quantity: item.quantity - 1 } 
          : item
      ));
    }
  };
  
  const getTotalPrice = () => {
    return cart.reduce((total, item) => total + (item.price * item.quantity), 0).toFixed(2);
  };

  const getTotalItems = () => {
    return cart.reduce((total, item) => total + item.quantity, 0);
  };

  const renderRating = (rating) => {
    return (
      <div className="rating">
        {[...Array(5)].map((_, i) => (
          <span key={i} className={i < Math.floor(rating) ? "star filled" : "star"}>★</span>
        ))}
        <span className="rating-value">{rating}</span>
      </div>
    );
  };

  const navigate = useNavigate();
  const goToMyOrders = () => {
    navigate("/Myorders"); 
  };
  
  const handleTableSelect = (tableNum) => {
    setTableNumber(tableNum.toString());
    setTableError("");
    setShowTableSelector(false);
  };

  const renderTableEntryForm = () => {
    return (
      <div className="table-entry-container">
        <div className="table-entry-card">
          <h2>Select Your Table</h2>
          <p>Please select your table number to place your order</p>
          
          <form onSubmit={handleTableSubmit} className="table-form">
            <div className="form-group">
              <label htmlFor="tableNumber">Table Number</label>
              <div className="table-input-container">
                <input
                  type="text"
                  id="tableNumber"
                  value={tableNumber}
                  readOnly
                  placeholder="Select a table"
                  className={tableError ? "error" : ""}
                  onClick={() => setShowTableSelector(true)}
                />
                <button 
                  type="button" 
                  id="select-table-btn"
                  onClick={() => setShowTableSelector(true)}
                >
                  Select
                </button>
              </div>
              {tableError && <div className="error-message">{tableError}</div>}
            </div>
            
            <div className="order-summary">
              <h3>Order Summary</h3>
              <div className="order-items">
                {cart.map(item => (
                  <div key={item.id} className="order-item">
                    <span>{item.quantity} × {item.name}</span>
                    <span>Rs. {(item.price * item.quantity).toFixed(2)}</span>
                  </div>
                ))}
              </div>
              <div className="order-total">
                <span>Total:</span>
                <span>Rs. {(parseFloat(getTotalPrice()) + 89).toFixed(2)}</span>
              </div>
            </div>
            
            <div className="form-buttons">
              <button type="button" className="cancel-btn nn" onClick={() => setCheckoutStep("cart")}>
                Back to Cart
              </button>
              <button type="submit" className="submit-btn nn">
                Confirm Order
              </button>
            </div>
          </form>
        </div>
        
        {showTableSelector && (
          <>
            <div id="table-selector-popup">
              <div id="table-selector-header">
                <h3>Select a Table</h3>
                <button id="close-table-selector" onClick={() => setShowTableSelector(false)}>
                  <X size={20} />
                </button>
              </div>
              <div id="tables-grid">
                {tables.map(table => (
                  <button
                    key={table.id}
                    id={`table-${table.number}`}
                    className={`table-button ${!table.isAvailable ? 'table-unavailable' : ''}`}
                    onClick={() => table.isAvailable && handleTableSelect(table.number)}
                    disabled={!table.isAvailable}
                  >
                    {table.number}
                  </button>
                ))}
              </div>
            </div>
            <div id="table-selector-overlay" onClick={() => setShowTableSelector(false)}></div>
          </>
        )}
      </div>
    );
  };


  const renderWaitingScreen = () => {
    return (
      <div className="order-status-container">
        <div className="order-status-card">
          <h2>Thank You for Your Order!</h2>
          <div className="table-number">
            <span>Your Table Number</span>
            <div className="table-number-value">{tableNumber}</div>
          </div>
          
          <div className="waiting-time">
            <div className="waiting-time-header">
              <Clock size={24} />
              <h3>{orderStatus === "ready" ? "Your Order is Ready!" : "Estimated Waiting Time"}</h3>
            </div>
            
            {orderStatus === "preparing" ? (
              <>
                <div className="timer">{formatTime(waitingTime)}</div>
                <div className="progress-bar">
                  <div 
                    className="progress" 
                    style={{ width: `${(1 - waitingTime / 600) * 100}%` }}
                  ></div>
                </div>
                <p className="status-message">Our kitchen is preparing your delicious food...</p>
              </>
            ) : (
              <>
                <div className="ready-message">
                  <p>Your order is ready.</p>
                  <p>Please collect it from the counter.</p>
                </div>
              </>
            )}
          </div>
          
          <div className="order-summary">
            <h3>Order Summary</h3>
            <div className="order-items">
              {cart.map(item => (
                <div key={item.id} className="order-item">
                  <span>{item.quantity} × {item.name}</span>
                  <span>Rs. {(item.price * item.quantity).toFixed(2)}</span>
                </div>
              ))}
            </div>
            <div className="order-total">
              <span>Total:</span>
              <span>Rs. {(parseFloat(getTotalPrice()) + 89).toFixed(2)}</span>
            </div>
          </div>
          
          <button className="new-order-btn" onClick={goToMyOrders}>
            Place New Order
          </button>
        </div>
      </div>
    );
  };

  const LazyImage = ({ src, alt, itemId }) => {
    return (
      <div className="image-container">
        {!imagesLoaded[itemId] && (
          <div className="image-placeholder pulse-animation"></div>
        )}
        <img 
          src={src} 
          alt={alt} 
          style={{ opacity: imagesLoaded[itemId] ? 1 : 0, transition: 'opacity 0.3s ease-in' }}
        />
      </div>
    );
  };

  return (
    <div className="customer-page">
      <div className="top-bar">
        <div className="search-container">
          <Search className="search-icon" size={20} />
          <input
            type="text"
            placeholder="Search our menu..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="search-input"
          />
        </div>
        {checkoutStep === "cart" && (
          <div className="cart-icon-container" onClick={() => setShowCart(!showCart)}>
            <ShoppingCart size={24} />
            {cart.length > 0 && <span className="cart-badge">{getTotalItems()}</span>}
          </div>
        )}
      </div>

      {showNotification && (
        <div id="notification-bar">
          <span>Special Offer: Get 10% off on all orders above Rs. 500! 🎉</span>
          <button id="close-notification-btn" onClick={() => setShowNotification(false)}>
            <X size={16} />
          </button>
        </div>
      )}

      {checkoutStep === "table-entry" && renderTableEntryForm()}
      {checkoutStep === "waiting" && renderWaitingScreen()}
      
      {checkoutStep === "cart" && (
        <>
          <div className="hero-section">
            <div className="hero-content">
              <h1>Delicious Food for Every Taste</h1>
              <p>Explore our diverse menu featuring fresh ingredients and authentic flavors</p>
            </div>
          </div>

          <div className="content-container">
            <div className="categories-section">
              <div className="category-header">
                <Filter size={18} />
                <h3>Categories</h3>
              </div>
              <div className="category-list">
                {categories.map(category => (
                  <div 
                    key={category} 
                    className={`category-item ${activeCategory === category ? 'active' : ''}`}
                    onClick={() => setActiveCategory(category)}
                  >
                    <span className="category-name">{category.charAt(0).toUpperCase() + category.slice(1)}</span>
                    {activeCategory === category && <ChevronRight size={16} />}
                  </div>
                ))}
              </div>
            </div>

            <div className="menu-section">
              <h2 className="section-title">Our Menu</h2>
              
              {filteredFoodItems.length === 0 ? (
                <div className="no-results">
                  <p>No items found matching your search criteria.</p>
                </div>
              ) : (
                <div className="food-grid">
                  {filteredFoodItems.map(item => (
                    <div key={item.id} className="food-card">
                      <div className="food-image">
                        <LazyImage  src={item.image} alt={item.name} itemId={item.id}  />
                        <div className="food-category">{item.category}</div>
                      </div>
                      <div className="food-info">
                        <h3>{item.name}</h3>
                        {renderRating(item.rating)}
                        <p className="food-description">{item.description}</p>
                        <div className="food-card-bottom">
                          <span className="food-price">Rs. {item.price.toFixed(2)}</span>
                          <button className="add-to-cart-btn" onClick={() => addToCart(item)}>
                            <span>Add to Cart</span>
                            <Plus size={16} />
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>

          <div className={`cart-sidebar ${showCart ? 'show' : ''}`}>
            <div className="cart-header">
              <h2>Your Cart</h2>
              <button className="close-cart-btn" onClick={() => setShowCart(false)}>
                <X size={24} />
              </button>
            </div>
            
            {cart.length === 0 ? (
              <div className="empty-cart">
                <ShoppingCart size={48} stroke="#ccc" />
                <p>Your cart is empty</p>
                <button className="continue-shopping" onClick={() => setShowCart(false)}>
                  Continue to Order
                </button>
              </div>
            ) : (
              <>
                <div className="cart-items">
                  {cart.map(item => (
                    <div key={item.id} className="cart-item">
                      <div className="cart-item-image">
                        <img src={item.image} alt={item.name} />
                      </div>
                      <div className="cart-item-details">
                        <h4>{item.name}</h4>
                        <div className="cart-item-price">Rs. {(item.price * item.quantity).toFixed(2)}</div>
                        <div className="quantity-controls">
                          <button onClick={() => removeFromCart(item.id)}>
                            <Minus size={14} />
                          </button>
                          <span>{item.quantity}</span>
                          <button onClick={() => addToCart(item)}>
                            <Plus size={14} />
                          </button>
                        </div>
                      </div>
                      <button className="remove-item" onClick={() => setCart(cart.filter(cartItem => cartItem.id !== item.id))}>
                        <X size={16} />
                      </button>
                    </div>
                  ))}
                </div>
                
                <div className="cart-footer">
                  <div className="cart-subtotal">
                    <span>Subtotal:</span>
                    <span>Rs. {getTotalPrice()}</span>
                  </div>
                  <div className="cart-delivery">
                    <span>GST:</span>
                    <span>Rs. 89</span>
                  </div>
                  <div className="cart-total">
                    <span>Total:</span>
                    <span>Rs. {(parseFloat(getTotalPrice()) + 89).toFixed(2)}</span>
                  </div>
                  <button className="checkout-btn" onClick={handleCheckout}>Proceed to Checkout</button>
                </div>
              </>
            )}
          </div>
          {showCart && <div className="overlay" onClick={() => setShowCart(false)}></div>}
        </>
      )}

     
    </div>
  );
};

export default Customer;