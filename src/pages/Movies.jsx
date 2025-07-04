import React, { useState } from 'react';
import axios from 'axios';

export default function Movies() {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);

  const handleSearch = async () => {
    if (!query.trim()) return;

    try {
      const res = await axios.get('https://api.themoviedb.org/3/search/movie', {
        params: {
          api_key: 'f326b43d013cc566f0782814932d543a',
          query: query
        }
      });
      setResults(res.data.results);
    } catch (error) {
      console.error('Error fetching data from TMDB:', error);
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
        <button onClick={handleSearch}>Search</button>
      </div>

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
          <p>No results to display. Please search for a movie.</p>
        )}
      </div>
    </div>
  );
}
