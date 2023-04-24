import { useState } from "react";
import "./Slot.css";

function Slot({ item }: { item: string }) {
  const [hide, setHide] = useState(false);
  return (
    <div className="Slot" onClick={() => setHide(!hide)}>
      <div className="icon">{hide ? "?" : item}</div>
    </div>
  );
}

export default Slot;
