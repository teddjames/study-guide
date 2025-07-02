import { useState } from "react";

export default function AddIdeaForm({ workId, onAdd }) {
  const [idea, setIdea] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    onAdd(workId, idea);
    setIdea("");
  };

  return (
    <form onSubmit={handleSubmit}>
      <input 
        value={idea}
        onChange={(e) => setIdea(e.target.value)}
        placeholder="Add an idea..."
      />
      <button type="submit">Add</button>
    </form>
  );
}
