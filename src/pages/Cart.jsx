import React, { useState, useEffect } from 'react';

export default function Cart() {
  const [cartItems, setCartItems] = useState(() => {
    const saved = localStorage.getItem('cart');
    return saved ? JSON.parse(saved) : [];
  });

  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cartItems));
  }, [cartItems]);

  const handleRemove = (index) => {
    setCartItems(cartItems.filter((_, i) => i !== index));
  };

  const handleQuantityChange = (index, amount) => {
    const updated = cartItems.map((item, i) =>
      i === index
        ? { ...item, quantity: Math.max(1, item.quantity + amount) }
        : item
    );
    setCartItems(updated);
  };

  const calculateTotal = () => {
    return cartItems.reduce(
      (total, item) => total + item.price * item.quantity,
      0
    );
  };

  return (
    <div className="cart-page">
      <h1>Your Cart</h1>

      {cartItems.length === 0 ? (
        <div className="empty-cart">
          <p>Your cart is empty. Start adding some subscriptions or accessories!</p>
        </div>
      ) : (
        <>
          <ul>
            {cartItems.map((item, index) => (
              <li key={index} className="cart-item">
                <div className="cart-item-header">
                  <img src={item.img} alt={item.service} className="cart-item-img" />
                  <div className="cart-item-info">
                    <strong>{item.service}</strong>
                    <p>${item.price.toFixed(2)}</p>
                  </div>
                  <button
                    onClick={() => handleRemove(index)}
                    className="remove-btn"
                  >
                    ×
                  </button>
                </div>
                <div className="cart-item-controls">
                  <button onClick={() => handleQuantityChange(index, -1)}>-</button>
                  <span>{item.quantity}</span>
                  <button onClick={() => handleQuantityChange(index, 1)}>+</button>
                </div>
              </li>
            ))}
          </ul>

          <div className="cart-footer">
            <h3>Total: ${calculateTotal().toFixed(2)}</h3>
            <button className="checkout-btn">Checkout</button>
          </div>
        </>
      )}
    </div>
  );
}
