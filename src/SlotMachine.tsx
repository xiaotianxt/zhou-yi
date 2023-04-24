import { useState } from "react";
import Slot from "./Slot";
import { Combination, data } from "./data";
import "./SlotMachine.css";

function SlotMachine() {
  const [slot, setSlot] = useState<Combination>(data[0]);

  const spin = () => {
    // get random slot from data
    const slot = data[Math.floor(Math.random() * data.length)];
    setSlot(slot);
  };

  return (
    <div className="SlotMachine">
      <div className="slots">
        <Slot item={slot.c1} />
        <Slot item={slot.c2} />
        <Slot item={slot.result} />
      </div>
      <button onClick={spin} className="spin-button">
        下一个
      </button>
    </div>
  );
}

export default SlotMachine;
