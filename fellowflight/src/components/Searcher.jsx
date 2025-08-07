import React, { useState, useEffect } from "react";
import Papa from "papaparse";
import Fuse from "fuse.js";


export default function FuzzySearch() {
  const [data, setData] = useState([]);
  const [fuse, setFuse] = useState(null);
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);

  // Load and parse CSV on mount
  useEffect(() => {
    fetch("/airports.csv")
      .then((res) => res.text())
      .then((text) => {
        Papa.parse(text, {
          header: true,
          dynamicTyping: true,
          complete: (parsed) => {
            setData(parsed.data);

            const fuseInstance = new Fuse(parsed.data, {
              keys: ["city", "iata", "region"], // Searchable fields
              includeScore: true,
              threshold: 0.4,
            });

            setFuse(fuseInstance);
          },
        });
      });
  }, []);

  // Run search when query changes
  useEffect(() => {
    if (fuse && query.length > 0) {
      const result = fuse.search(query);
      setResults(result.map((r) => r.item));
    } else {
      setResults([]);
    }
  }, [query, fuse]);

  return (
    <div className="p-4 max-w-xl mx-auto">
      <input
        className="w-full p-2 border border-gray-300 rounded"
        type="text"
        placeholder="Search..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />

      <ul className="mt-4">
        {results.map((item, idx) => (
          <li key={idx} className="p-2 border-b">
            <strong>{item.name}</strong> - {item.city}, {item.country} ({item.iata}, {item.region})
          </li>
        ))}
      </ul>
    </div>
  );
}