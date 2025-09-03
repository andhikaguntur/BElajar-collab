import Link from "next/link";

export default function Navbar() {
  return (
    <nav style={{ marginBottom: "20px" }}>
      <Link href="/">Home</Link> |{" "}
      <Link href="/about">About</Link> |{" "}
      <Link href="/blog">Blog</Link> |{" "}
      <Link href="/contacts">Contact</Link> |{" "}
      <Link href="/gallery">Gallery</Link>
    </nav>
  );
}
