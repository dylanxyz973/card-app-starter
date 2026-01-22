import { Link } from "react-router-dom";

export default function Home() {
  /* TODO: Design and complete the Home page
    - display instructions
    - link to Cards page
    - style as a landing page */
  return <main>
    <h1>Home</h1>
    <Link to="/cards">Go to Cards</Link>
  </main>;
}
