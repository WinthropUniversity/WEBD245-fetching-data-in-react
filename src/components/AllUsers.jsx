// Slides 24 and 25 joined up.
//
// Slide 24 shows the address that returns all ten users. Slide 25 shows the
// component that renders them. This file is the piece in between: it does the
// fetching, in exactly the shape User.jsx used, and hands the array to
// UserList as a prop.

import { useEffect, useState } from "react";
import UserList from "./UserList.jsx";

const url =
  "https://jsonplaceholder.typicode.com/users";

export default function AllUsers() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

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

  if (loading) return <p role="status">Loading users…</p>;
  if (error) return <p role="alert">Could not load users. {error}</p>;
  return <UserList users={data} />;
}
