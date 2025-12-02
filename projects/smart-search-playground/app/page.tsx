"use client";
import React, { useState } from 'react';

export default function Home() {
  const [q, setQ] = useState('');
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<string | object | null>(null);
  const [error, setError] = useState<string | null>(null);
  async function submit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    setResult(null);
    if (!q.trim()) {
      setError('Please enter a movie name');
      return;
    }
    setLoading(true);
    try {
      const res = await fetch(`/api/search?q=${encodeURIComponent(q)}`);
      const contentType = res.headers.get('content-type') ?? '';
      const text = await res.text();
      if (contentType.includes('application/json')) {
        try {
          const json = JSON.parse(text);
          setResult(json);
        } catch {
          setResult(text);
        }
      } else {
        setResult(text);
      }
    } catch (err) {
      setError(String(err));
    } finally {
      setLoading(false);
    }
  }

  return (
    <div></div>
  );
}
