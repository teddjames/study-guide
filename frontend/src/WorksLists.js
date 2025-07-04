import WorkCard from "./WorkCard";

export default function WorksLists({ works, setWorks }) {
  return (
    <div className="works-grid">
      {works.map((topic) => (
        <WorkCard key={topic.id} work={topic} setWorks={setWorks} />
      ))}
    </div>
  );
}
