import TopicCard from "./WorkCard"; // still using the same file name for now

export default function WorksList({ works, setWorks }) {
  return (
    <div className="works-grid">
      {works.map((topic) => (
        <TopicCard key={topic.id} work={topic} setWorks={setWorks} />
      ))}
    </div>
  );
}
