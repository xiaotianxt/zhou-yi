import "./Slot.css";

function Slot({ item }: { item: string }) {
  return (
    <div className="Slot">
      <div className="icon">{item}</div>
    </div>
  );
}

export default Slot;
