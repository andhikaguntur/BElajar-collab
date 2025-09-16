"use client";

import { useState, useEffect } from "react";

import { useSession, signOut } from "next-auth/react";

export default function Home() {
  const [todos, setTodos] = useState<any[]>([]);
  const [title, setTitle] = useState("");
  const { data: session } = useSession();

  async function loadTodos() {
    const res = await fetch("/api/todos");
    const data = await res.json();
    setTodos(data);
  }

  async function addTodo() {
    if (!title.trim()) return;
    await fetch("/api/todos", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ title }),
    });
    setTitle("");
    loadTodos();
  }

  useEffect(() => {
    loadTodos();
  }, []);

  return (
    <main className="p-6">

     {session ? (
        <>
          <h1 className="text-xl font-bold">Halo, {session.user?.name}</h1>
          <button
            onClick={() => signOut({ callbackUrl: "/login" })}
            className="mt-4 px-4 py-2 bg-red-500 text-white rounded"
          >
            Logout
          </button>
        </>
      ) : (
        <h1 className="text-xl font-bold">Halo, silakan login dulu</h1>
      )}

      <h1 className="text-2xl font-bold mb-4">Todo List</h1>
      <div className="mb-4">
        <input
          className="border px-2 py-1 mr-2"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Enter a task"
        />
        <button
          onClick={addTodo}
          className="bg-blue-500 text-white px-3 py-1 rounded"
        >
          Add
        </button>
      </div>
      <ul className="list-disc pl-5">
        {todos.map((todo) => (
          <li key={todo.id}>
            {todo.title} {todo.completed ? "✅" : ""}
          </li>
        ))}
      </ul>
    </main>
  );
}
