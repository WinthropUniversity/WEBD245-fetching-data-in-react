# Fetching Data from an API

WEBD 245, Front End Web Development.

This is the worked solution to the lecture on fetching data from an API. Every
piece of code on the slides is in here, in a project you can run. Clone it,
start it, and read the files next to the slides.

The data comes from JSONPlaceholder. It is free, it needs no key and no
sign up, and it is made for practice.

## How to run it

You need Node.js installed. Check with `node -v`. If that prints a version
number you are ready.

Open a terminal in this folder and run these two commands.

```
npm install
npm run dev
```

The first one downloads the packages the project needs. It takes a minute the
first time and you only do it once.

The second one starts the Vite development server. It prints a line like this.

```
  ➜  Local:   http://localhost:5173/
```

Open that address in your browser. The page reloads on its own every time you
save a file.

To stop the server, press Ctrl and C in the terminal.

## What you see

The page has three sections.

**One user.** One card with a name, an email address and a city. The id is
fixed at 1, so it is always the same person.

**All ten users.** A list with one row per user. The rows come from an array
the server sent.

**A user you choose.** The same card, but with a menu above it. Change the
menu and the page asks the server for that user instead.

Each of the three shows a loading message first, every time, even when the
answer arrives quickly.

## The files

| File | Slides | What it is |
| --- | --- | --- |
| `src/examples/getUser.js` | 13 | Plain JavaScript. `fetch` with `async`, `await` and `try`. No React. |
| `src/components/User.jsx` | 18, 19, 20 | The lecture example. The three parts are marked with comments. |
| `src/components/UserList.jsx` | 25 | Takes the array as a prop and renders it. It does no fetching. |
| `src/components/AllUsers.jsx` | 24, 25 | Fetches the whole list, then hands it to `UserList`. |
| `src/components/UserPicker.jsx` | 26 | The id comes from the page, so the effect depends on it. |
| `src/App.jsx` | | Puts the three sections on the page. |
| `src/index.css` | | Enough styling to see the card and the three states. |

The code in `getUser.js`, `User.jsx` and `UserList.jsx` is exactly what is
printed on the slides. `AllUsers.jsx` and `UserPicker.jsx` are the two pieces
the slides describe but do not print in full.

`getUser.js` is not imported anywhere, so it does not run on its own. To watch
it work, add this line at the top of `src/main.jsx`, save, and open the
Console in DevTools.

```
import "./examples/getUser.js";
```

## Seeing all three states

The data state is easy. The other two you have to cause on purpose. This is
the activity from slides 21 to 23.

**Loading.** Open DevTools, choose Network, and set throttling to Slow 4G.
Reload the page. The loading messages now stay on screen long enough to read.

**Error, when the server cannot be reached.** Set throttling to Offline and
reload. The message reads `Could not load user. Failed to fetch`.

**Error, when the server says no.** Go back online. Open
`src/components/User.jsx` and change the `1` at the end of the address to
`999`. Save. There is no user 999, so the server answers 404 and the message
reads `Could not load user. Status 404`. Change it back when you are done.

That last one is the point of slide 14. A 404 is a successful request with a
disappointing answer, so `fetch` does not treat it as an error. The line
`if (!response.ok) throw new Error(...)` is what turns it into one.

## One thing you will notice

In development, React runs every effect twice on purpose. Open the Network tab
and you will see two requests where you expected one. This is not a bug in
your code and it does not happen in a built site. It is React checking that
your effect cleans up after itself. The `ignore` flag in each component is
that cleanup.

## Building it

```
npm run build
```

This writes a finished site into a `dist` folder. You do not need it for the
activity.

## References

- MDN: Using the Fetch API
- MDN: Promise
- React: Synchronizing with Effects
- JSONPlaceholder: guide
