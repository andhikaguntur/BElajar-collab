import Navbar from "../components/Navbar";

export default function Blog() {
  return (
    <main>
      <Navbar />
      <h1>Blog</h1>
      <ul>
        <li>Post 1: Getting started with Next.js</li>
        <li>Post 2: Collaboration workflow in GitHub</li>
        <li>Post 3: Why teamwork matters</li>
      </ul>
    </main>
  );
}