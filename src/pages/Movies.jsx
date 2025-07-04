import React, { useState } from 'react';
import axios from 'axios';

export default function Movies() {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSearch = async () => {
    if (!query.trim()) return;
    setLoading(true);
    setError('');

    try {
      const res = await axios.get('https://api.themoviedb.org/3/search/movie', {
        params: {
          api_key: 'f326b43d013cc566f0782814932d543a',
          query: query
        }
      });
      setResults(res.data.results);
    } catch (err) {
      console.error(err);
      setError('Failed to fetch movies. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="movies-page">
      <h1>Search Movies</h1>

      <div>
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Enter movie title"
        />
                <button onClick={handleSearch} aria-label="Search for movies" disabled={loading}>Search</button>
        {/* Disable button during loading to prevent multiple requests */}
      </div>

      {loading && <p>Loading...</p>}
      {error && <p style={{ color: 'red' }}>{error}</p>}

      <div>
        {results.length > 0 ? (
          <ul>
            {results.map((movie) => (
              <li key={movie.id}>
                <strong>{movie.title}</strong> ({movie.release_date?.split('-')[0] || 'N/A'})
              </li>
            ))}
          </ul>
        ) : (
          !loading && <p>No results to display. Please search for a movie.</p>
        )}
      </div>
    </div>
  );
}
