// Slide 13. The plain JavaScript version, with no React in it at all.
//
// Nothing in the app imports this file, so it does not run on its own. To
// watch it work, add this one line at the top of src/main.jsx, reload the
// page, and look at the Console:
//
//   import "./examples/getUser.js";

async function getUser() {
  const url = "https://jsonplaceholder.typicode.com/users/1";
  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error("Status " + response.status);
    }
    const data = await response.json();
    console.log(data.name);
  } catch (error) {
    console.error(error.message);
  }
}
getUser();
