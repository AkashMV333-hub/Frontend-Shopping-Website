import { useCart } from "../context/CartContext";
import { useState, useEffect } from "react";

const Cart = () => {
  const { cartItems, updateQuantity, removeFromCart, clearCart } = useCart();
  const [showConfirmation, setShowConfirmation] = useState(false);

  const total = cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);

  useEffect(() => {
    console.log(`CartItems in cart.jsx ${cartItems}`)
  }, [cartItems])

  const handleCheckout = () => {
    clearCart();
    setShowConfirmation(true);
    setTimeout(() => setShowConfirmation(false), 4000);
  };

  if (cartItems.length === 0 && !showConfirmation)
    return <div className="p-4 text-center w-100 w-md-calc cart-bg"><h1>Your cart is empty 🛒</h1></div>;

  const TrashIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
    </svg>
  );

  const ArrowRightIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
    </svg>
  );

  const CheckmarkIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
    </svg>
  );

  return (
    <div className="w-100 w-md-calc cart-bg">
      <div className="container py-4">
        <div className="cart-items-container">
          {cartItems.map(item => (
            <div
              key={item.id}
              className="cart-item-card"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
            >
              <div className="product-image-wrapper">
                <img 
                  src={item.image} 
                  alt={item.title} 
                  className="product-thumbnail"
                />
                {item.isNew && <span className="new-badge">New</span>}
              </div>

              <div className="product-details">
                <h6 className="product-title">{item.title}</h6>
                <p className="product-price">${item.price}</p>
                
                <div className="quantity-controls">
                  <button 
                    className="quantity-btn minus"
                    onClick={() => updateQuantity(item.id, Math.max(1, item.quantity - 1))}
                  >
                    −
                  </button>
                  
                  <input
                    type="number"
                    min="1"
                    value={item.quantity}
                    onChange={e => {
                      const newQty = parseInt(e.target.value);
                      if (!isNaN(newQty) && newQty >= 1) {
                        updateQuantity(item.id, newQty);
                      }
                    }}
                    className="quantity-input"
                  />
                  
                  <button 
                    className="quantity-btn plus"
                    onClick={() => updateQuantity(item.id, item.quantity + 1)}
                  >
                    +
                  </button>
                </div>
              </div>

              <button
                onClick={() => removeFromCart(item.id)}
                className="remove-btn"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                <TrashIcon />
              </button>
            </div>
          ))}
        </div>

        <div className="cart-summary">
          <div className="total-amount grand-total">
            <span>Total:</span>
            <span>${total.toFixed(2)}</span>
          </div>
        </div>

        <div className="d-flex justify-content-center">
        <button
          onClick={handleCheckout}
          className="checkout-btn"
          disabled={cartItems.length === 0}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          Proceed to Checkout
          <ArrowRightIcon />
        </button>
        </div>

        {showConfirmation && (
          <div className="confirmation-overlay">
            <div className="confirmation-modal">
              <div className="success-animation">
                <CheckmarkIcon />
              </div>
              <h5 className="confirmation-title">Order Confirmed!</h5>
              <p className="confirmation-text">Your order #{(Math.random() * 10000).toFixed(0)} is being processed</p>
              <button 
                onClick={() => setShowConfirmation(false)}
                className="continue-shopping-btn"
              >
                Continue Shopping
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Cart;