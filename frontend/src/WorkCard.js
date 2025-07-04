import AddReflectionForm from "./AddReviewForm";
import AddTipForm from "./AddIdeaForm";

  function WorkCard({ work, setWorks }) {
    const reload = async () => {
      const res = await fetch("http://127.0.0.1:5000/works");
      const data = await res.json();
      setWorks(data);
    };

    const handleReflectionDelete = async (id) => {
      await fetch(`http://127.0.0.1:5000/reviews/${id}`, { method: "DELETE" });
      await reload();
    };

    const handleTipDelete = async (id) => {
      await fetch(`http://127.0.0.1:5000/ideas/${id}`, { method: "DELETE" });
      await reload();
    };

    const handleAddTip = async (workId, content) => {
      await fetch("http://127.0.0.1:5000/ideas", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          work_id: workId,
          title: "New Tip",
          description: content,
        }),
      });
      await reload();
    };

      return (
        <div style={{ border: "1px solid #ccc", padding: "1rem", marginBottom: "1rem" }}>
          <h2>{work.title}</h2>
          <p>{work.description}</p>
          <p><strong>Avg Reflection Score:</strong> {work.average_rating ?? "N/A"}</p>

          <h3>Reflections</h3>
          {work.reviews.map((r) => (
            <div key={r.id}>
              {r.rating}/5 — {r.comment}
              <button onClick={() => handleReflectionDelete(r.id)}>×</button>
            </div>
          ))}
          <AddReflectionForm workId={work.id} reload={reload} />

          <h3>Study Tips</h3>
          {work.ideas.map((i) => (
            <div key={i.id}>
              {i.title}: {i.description}
              <button onClick={() => handleTipDelete(i.id)}>×</button>
            </div>
          ))}

          <AddTipForm workId={work.id} onAdd={handleAddTip} />
        </div>
      );
    }
export default WorkCard;
