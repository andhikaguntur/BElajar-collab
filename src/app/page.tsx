"use client"

import Navbar from "./components/Navbar";

import { useEffect, useState } from "react"

export default function Home() {
  const [todos, setTodos] = useState<{ id: number; title: string; completed: boolean }[]>([])
  const [title, setTitle] = useState("")

  useEffect(() => {
    fetch("/api/todos")
      .then((res) => res.json())
      .then((data) => setTodos(data))
  }, [])

  const addTodo = async () => {
    if (!title) return
    const res = await fetch("/api/todos", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ title }),
    })
    const newTodo = await res.json()
    setTodos([...todos, newTodo])
    setTitle("")
  }

  return (
    <div className="p-8 max-w-lg mx-auto">
      <h1 className="text-2xl font-bold mb-4">Todo App ✅</h1>

      <div className="flex mb-4">
        <input
          className="border p-2 flex-grow"
          placeholder="Add new todo..."
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <button onClick={addTodo} className="ml-2 bg-blue-500 text-white px-4 py-2 rounded">
          Add
        </button>
      </div>

      <ul>
        {todos.map((todo) => (
          <li key={todo.id} className="border-b py-2">
            {todo.title}
          </li>
        ))}
      </ul>
    </div>
  )
}
