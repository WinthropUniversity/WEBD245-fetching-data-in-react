// Slide 25. It is given the array of users and renders one item each.
// It does no fetching of its own.

export default function UserList({ users }) {
  if (users.length === 0) {
    return <p>No users found.</p>;
  }
  return (
    <ul>
      {users.map((user) => (
        <li key={user.id}>
          {user.name}: {user.email}
        </li>
      ))}
    </ul>
  );
}
