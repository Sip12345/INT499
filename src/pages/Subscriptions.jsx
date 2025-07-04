import React, { useState, useEffect } from 'react';
import list from '../data';

export default function Subscriptions() {
  const [cart, setCart] = useState(() => {
    const saved = localStorage.getItem('cart');
    return saved ? JSON.parse(saved) : [];
  });
  const [warning, setWarning] = useState('');

  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cart));
  }, [cart]);

  const handleAddToCart = (item) => {
    setWarning('');

    const isSubscription = item.service.includes('Subscription');
    const hasSubscription = cart.some((cartItem) =>
      cartItem.service.includes('Subscription')
    );

    if (isSubscription && hasSubscription) {
      setWarning('You can only add one subscription at a time.');
      return;
    }

    const existingIndex = cart.findIndex(
      (cartItem) => cartItem.id === item.id
    );

    if (existingIndex >= 0) {
      const updated = [...cart];
      updated[existingIndex].quantity += 1;
      setCart(updated);
    } else {
      setCart([...cart, { ...item, quantity: 1 }]);
    }
  };

  return (
    <div className="subscriptions-page">
      <h1>Subscriptions & Accessories</h1>

      {warning && <p style={{ color: 'red' }}>{warning}</p>}

      <div className="products">
        {list.map((item) => (
          <div key={item.id} className="product-card">
            <img src={item.img} alt={item.service} width="100" />
            <h3>{item.service}</h3>
            <p>{item.serviceInfo}</p>
            <p>${item.price.toFixed(2)}</p>
            <button onClick={() => handleAddToCart(item)}>Add to Cart</button>
          </div>
        ))}
      </div>
    </div>
  );
}
