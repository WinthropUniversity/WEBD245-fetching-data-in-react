// Slides 18, 19 and 20. The three parts of the lecture example, in one file.

import { useEffect, useState } from "react";

const url =
  "https://jsonplaceholder.typicode.com/users/1";

export default function User() {
  // Part 1: the state
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // Part 2: the request
  useEffect(() => {
    let ignore = false;

    async function load() {
      try {
        const response = await fetch(url);
        if (!response.ok) throw new Error("Status " + response.status);
        const json = await response.json();
        if (!ignore) setData(json);
      } catch (err) {
        if (!ignore) setError(err.message);
      } finally {
        if (!ignore) setLoading(false);
      }
    }

    load();

    return () => {
      ignore = true;
    };
  }, []);

  // Part 3: show the right state
  if (loading) return <p role="status">Loading user…</p>;
  if (error) return <p role="alert">Could not load user. {error}</p>;
  return (
    <div className="card">
      <h2>{data.name}</h2>
      <p>{data.email}</p>
      <p>{data.address.city}</p>
    </div>
  );
}
