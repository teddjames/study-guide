import WorkCard from "./WorkCard";

export default function WorksList({ works, setWorks }) {
  return (
    <div className="works-grid">
      {works.map((w) => (
        <WorkCard key={w.id} work={w} setWorks={setWorks} />
      ))}
    </div>
  );
}
