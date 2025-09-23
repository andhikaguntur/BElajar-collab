"use client";
import { useEffect, useState } from "react";

export default function Podcast() {
  const [podcast, setPodcast] = useState<any>(null);

  useEffect(() => {
    fetch("/api/spotify")
      .then((res) => res.json())
      .then((data) => setPodcast(data));
  }, []);

  if (!podcast) return <p>Loading...</p>;

  return (
    <div>
      <h1>{podcast.name}</h1>
      <p>{podcast.publisher}</p>
      <ul>
        {podcast.episodes.items.map((ep: any) => (
          <li key={ep.id}>
            <a href={ep.external_urls.spotify} target="_blank" rel="noreferrer">
              {ep.name}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}
