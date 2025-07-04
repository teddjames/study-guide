import { useState } from "react";

export default function AddReviewForm({ workId, reload }) {
  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState("");

  const submit = async (e) => {
    e.preventDefault();
    await fetch("http://127.0.0.1:5000/reviews", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
      body: JSON.stringify({ work_id: workId, rating, comment }),
    });
    setComment("");
    setRating(5);
    reload();
  };

  return (
    <form onSubmit={submit} style={{ marginTop: "0.5rem" }}>
      <input
        type="number"
        min="1"
        max="5"
        value={rating}
        onChange={(e) => setRating(+e.target.value)}
        style={{ width: "3rem" }}
      />
      <input
        type="text"
        placeholder="Reflection or comment"
        value={comment}
        onChange={(e) => setComment(e.target.value)}
        style={{ marginLeft: "0.5rem" }}
      />
      <button style={{ marginLeft: "0.5rem" }}>Add</button>
    </form>
  );
}
