import React, { useState, useEffect } from 'react';

export default function CreditCard() {
  const [cardNumber, setCardNumber] = useState('');
  const [savedCard, setSavedCard] = useState('');

  useEffect(() => {
    const saved = localStorage.getItem('creditCard');
    if (saved) {
      setSavedCard(saved);
    }
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    const cardPattern = /^\d{4} \d{4} \d{4} \d{4}$/;
    if (!cardPattern.test(cardNumber)) {
      alert('Invalid card number format. Use: 1234 5678 9012 3456');
      return;
    }
    localStorage.setItem('creditCard', cardNumber);
    setSavedCard(cardNumber);
    alert('Credit card information saved securely.');
  };

  return (
    <div className="credit-card-page">
      <h1>Enter Your Credit Card</h1>
      {savedCard && <p>Saved Card: {savedCard}</p>}
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="1234 5678 9012 3456"
          value={cardNumber}
          onChange={(e) => setCardNumber(e.target.value)}
        />
        <button type="submit">Save Card</button>
      </form>
    </div>
  );
}
