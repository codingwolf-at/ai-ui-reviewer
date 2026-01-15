"use client"
import { useState } from "react";

const Home = () => {
  const [code, setCode] = useState("")
  return (
    <main className="max-w-4xl mx-auto p-6 space-y-8 min-h-screen">
      <header>
        <h1 className="text-3xl font-bold">
          AI UI Reviewer
        </h1>
        <p className="text-gray-400 mt-2">
          Paste your UI code and get instant feedback.
        </p>
      </header>

      <section className="space-y-4">
        <textarea
          value={code}
          onChange={(e) => setCode(e.target.value)}
          placeholder="Paste JSX, HTML, or CSS here..."
          className="w-full min-h-[200px] rounded-md bg-gray-900 border border-gray-800 p-4 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
        />

        <button
          disabled={!code.trim()}
          className="px-4 py-2 rounded-md bg-blue-600 text-white disabled:opacity-40"
        >
          Review UI
        </button>
      </section>

      <section>
        {/* AI response goes here */}
      </section>
    </main>
  );
}

export default Home;