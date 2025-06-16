import React, { useState } from 'react';

export default function StreamList() {
  const [input, setInput] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(`User Input: ${input}`);
    setInput('');
  };

  return (
    <div className="streamlist-page">
      <h1>My StreamList</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Add a movie or show"
          value={input}
          onChange={(e) => setInput(e.target.value)}
        />
        <button type="submit">Add</button>
      </form>
    </div>
  );
}
