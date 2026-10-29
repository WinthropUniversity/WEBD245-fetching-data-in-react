// The page that puts the three examples on screen.

import User from "./components/User.jsx";
import AllUsers from "./components/AllUsers.jsx";
import UserPicker from "./components/UserPicker.jsx";

export default function App() {
  return (
    <main>
      <h1>Fetching data from an API</h1>

      <section>
        <h2>One user</h2>
        <p className="note">Slides 18, 19 and 20. The id is fixed at 1.</p>
        <User />
      </section>

      <section>
        <h2>All ten users</h2>
        <p className="note">Slides 24 and 25. A list from a remote array.</p>
        <AllUsers />
      </section>

      <section>
        <h2>A user you choose</h2>
        <p className="note">Slide 26. The id comes from the page.</p>
        <UserPicker />
      </section>
    </main>
  );
}
