"use client";

import { useState } from "react"

export default function Counter({user}:{user: number}) {
  const [count, setCount] = useState(0);

  return (
    <div>
      <p>There are {user} users</p>
      <button onClick={() => setCount(count)}>Increment</button>
      <div>{count}</div>
    </div>
  )
}