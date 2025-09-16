"use client";

import { useState } from "react";

export default function RegisterPage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [msg, setMsg] = useState("");

  const handle = async (e: React.FormEvent) => {
    e.preventDefault();
    setMsg("");

    const res = await fetch("/api/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username, password, name }),
    });

    const data = await res.json();
    if (!res.ok) {
      setMsg(data.error || "register failed");
      return;
    }

    setMsg("Registered — please sign in");
    // optional redirect to sign in:
    setTimeout(() => (window.location.href = "/auth/signin"), 1200);
  };

  return (
    <div style={{ display: "grid", placeItems: "center", minHeight: "100vh" }}>
      <form onSubmit={handle} style={{ width: 360, padding: 20, border: "1px solid #ddd", borderRadius: 8 }}>
        <h2>Register</h2>
        {msg && <div>{msg}</div>}
        <label>Username</label>
        <input value={username} onChange={(e) => setUsername(e.target.value)} required />
        <label>Name (optional)</label>
        <input value={name} onChange={(e) => setName(e.target.value)} />
        <label style={{ marginTop: 10 }}>Password</label>
        <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
        <button type="submit" style={{ marginTop: 12 }}>Register</button>
      </form>
    </div>
  );
}
