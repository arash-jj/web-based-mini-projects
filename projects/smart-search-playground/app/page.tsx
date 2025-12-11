"use client";
import React, { useState } from 'react';
import MovieCard from '../components/MovieCard';

type Movie = {
  title: string;
  year?: number;
  poster?: string;
  link?: string;
  rank?: number;
};

export default function Home() {
  const [q, setQ] = useState('');
  const [movies, setMovies] = useState<Movie[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    setMovies([]);
    if (!q.trim()) {
      setError('Please enter a movie name');
      return;
    }
    setLoading(true);
    try {
      const res = await fetch(`/api/search?q=${encodeURIComponent(q)}`);
      const text = await res.text();
      const json = JSON.parse(text);
      if (json.ok && Array.isArray(json.description)) {
        const parsed: Movie[] = json.description.map((item: any) => ({
          title: item['#TITLE'] || 'Unknown',
          year: item['#YEAR'],
          poster: item['#IMG_POSTER'],
          link: item['#IMDB_URL'],
          rank: item['#RANK'],
        }));
        setMovies(parsed);
      } else {
        setError('No results found or invalid response format.');
      }
    } catch (err) {
      setError('Error fetching results: ' + String(err));
    } finally {
      setLoading(false);
    }
  }
  return (
    <div className="min-h-screen bg-slate-900 text-white p-6">
      <div className="w-full max-w-6xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-6">Movie Search</h1>
          <form onSubmit={submit} className="flex gap-3">
            <input
              type="text"
              value={q}
              onChange={(e) => setQ(e.target.value)}
              placeholder="Search movies..."
              className="flex-1 px-4 py-3 rounded-lg bg-slate-800 text-white placeholder-slate-400 border border-slate-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <button
              type="submit"
              disabled={loading}
              className="px-6 py-3 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              {loading ? 'Searching...' : 'Search'}
            </button>
          </form>
        </div>
        {error && <div className="mb-6 p-4 bg-red-600 text-white rounded-lg text-sm">{error}</div>}
        {movies.length > 0 && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {movies.map((m, i) => (
              <MovieCard
                key={m.link ?? m.title + i}
                title={m.title}
                year={m.year}
                image={m.poster}
                link={m.link}
                rank={m.rank}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
