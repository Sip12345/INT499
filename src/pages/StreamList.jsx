import React, { useState } from 'react';

export default function StreamList() {
  const [input, setInput] = useState('');
  const [items, setItems] = useState([]);
  const [isEditing, setIsEditing] = useState(null);
  const [editText, setEditText] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!input.trim()) return;

    setItems([...items, { text: input, completed: false }]);
    setInput('');
  };

  const handleDelete = (index) => {
    setItems(items.filter((_, i) => i !== index));
  };

  const handleComplete = (index) => {
    const updated = items.map((item, i) =>
      i === index ? { ...item, completed: !item.completed } : item
    );
    setItems(updated);
  };

  const handleEdit = (index) => {
    setIsEditing(index);
    setEditText(items[index].text);
  };

  const handleEditSubmit = (index) => {
    const updated = items.map((item, i) =>
      i === index ? { ...item, text: editText } : item
    );
    setItems(updated);
    setIsEditing(null);
    setEditText('');
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

      <ul>
        {items.map((item, index) => (
          <li key={index} style={{ textDecoration: item.completed ? 'line-through' : 'none' }}>
            {isEditing === index ? (
              <>
                <input
                  type="text"
                  value={editText}
                  onChange={(e) => setEditText(e.target.value)}
                />
                <button onClick={() => handleEditSubmit(index)}>
                  <i className="fas fa-check"></i>
                </button>
              </>
            ) : (
              <>
                {item.text}
                <div>
                  <button onClick={() => handleComplete(index)} title="Mark Complete">
                    <i className="fas fa-check"></i>
                  </button>
                  <button onClick={() => handleEdit(index)} title="Edit">
                    <i className="fas fa-edit"></i>
                  </button>
                  <button onClick={() => handleDelete(index)} title="Delete">
                    <i className="fas fa-trash-alt"></i>
                  </button>
                </div>
              </>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}
