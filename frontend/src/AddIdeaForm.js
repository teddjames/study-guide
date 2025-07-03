import { useState } from "react";

export default function AddIdeaForm({ workId, onAdd }) {
  const [tip, setTip] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    onAdd(workId, tip);
    setTip("");
  };

  return (
    <form onSubmit={handleSubmit}>
      <input 
        value={tip}
        onChange={(e) => setTip(e.target.value)}
        placeholder="Add a study tip or note..."
      />
      <button type="submit">Add</button>
    </form>
  );
}
