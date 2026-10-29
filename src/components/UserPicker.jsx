// Slide 26. The same request, but the id now comes from the page.
//
// Two things change from User.jsx. The dependency array holds userId, so the
// effect runs again every time the chosen id changes. And the ignore flag now
// earns its keep: if you change the id twice quickly, the first answer may
// arrive last, and ignore is what throws that stale answer away.

import { useEffect, useState } from "react";

export default function UserPicker() {
  const [userId, setUserId] = useState(1);
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    let ignore = false;

    // A new request is starting, so go back to the loading state.
    setLoading(true);
    setError("");

    async function load() {
      try {
        const url = "https://jsonplaceholder.typicode.com/users/" + userId;
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
  }, [userId]);

  return (
    <div>
      <label htmlFor="userId">Choose a user</label>
      <select
        id="userId"
        value={userId}
        onChange={(event) => setUserId(Number(event.target.value))}
      >
        {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((id) => (
          <option key={id} value={id}>
            User {id}
          </option>
        ))}
      </select>

      {loading && <p role="status">Loading user…</p>}
      {error && <p role="alert">Could not load user. {error}</p>}
      {!loading && !error && (
        <div className="card">
          <h2>{data.name}</h2>
          <p>{data.email}</p>
          <p>{data.address.city}</p>
        </div>
      )}
    </div>
  );
}
