import AddReviewForm from "./AddReviewForm";
import AddIdeaForm from "./AddIdeaForm";

export default function WorkCard({ work, setWorks }) {
  const reload = async () => {
    const res = await fetch("http://127.0.0.1:5000/works");
    const data = await res.json();
    setWorks(data);
  };

  const handleReviewDelete = async (id) => {
    await fetch(`http://127.0.0.1:5000/reviews/${id}`, { method: "DELETE" });
    await reload();
  };

  const handleIdeaDelete = async (id) => {
    await fetch(`http://127.0.0.1:5000/ideas/${id}`, { method: "DELETE" });
    await reload();
  };

  const handleAddIdea = async (workId, content) => {
    await fetch("http://127.0.0.1:5000/ideas", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        work_id: workId,
        title: "New Idea", // Adjust as needed
        description: content,
      }),
    });
    await reload();
  };

  return (
    <div style={{ border: "1px solid #ccc", padding: "1rem" }}>
      <h2>{work.title}</h2>
      <p>{work.description}</p>
      <p><strong>Avg Rating:</strong> {work.average_rating ?? "N/A"}</p>

      <h3>Reviews</h3>
      {work.reviews.map((r) => (
        <div key={r.id}>
          {r.rating}/5 — {r.comment}
          <button onClick={() => handleReviewDelete(r.id)}>×</button>
        </div>
      ))}
      <AddReviewForm workId={work.id} reload={reload} />

      <h3>Ideas</h3>
      {work.ideas.map((i) => (
        <div key={i.id}>
          {i.title}: {i.description}
          <button onClick={() => handleIdeaDelete(i.id)}>×</button>
        </div>
      ))}
      
      {/* ✅ Corrected: Pass onAdd instead of reload */}
      <AddIdeaForm workId={work.id} onAdd={handleAddIdea} />
    </div>
  );
}
