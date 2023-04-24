import { useState } from "react";
import Slot from "./Slot";
import { Combination, data } from "./data";
import "./SlotMachine.css";

function SlotMachine() {
  const [slot, setSlot] = useState<Combination>(data[0]);
  const [mode, setMode] = useState<"背前面" | "背后面">("背前面");
  const [show, setShow] = useState(false);

  const spin = () => {
    // get random slot from data
    const slot = data[Math.floor(Math.random() * data.length)];
    setSlot(slot);
    setShow(false);
  };

  return (
    <div className="SlotMachine">
      <div className="slots" onClick={() => setShow(!show)}>
        {mode !== "背前面" || show ? (
          <Slot item={slot.c1} />
        ) : (
          <Slot item={"?"} />
        )}
        {mode !== "背前面" || show ? (
          <Slot item={slot.c2} />
        ) : (
          <Slot item={"?"} />
        )}
        {mode !== "背后面" || show ? (
          <Slot item={slot.result} />
        ) : (
          <Slot item={"?"} />
        )}
      </div>
      <div className="buttons">
        <button
          onClick={() => setMode(mode === "背前面" ? "背后面" : "背前面")}
          className="mode-button"
        >
          {mode}
        </button>
        <button onClick={spin} className="spin-button">
          下一个
        </button>
      </div>
    </div>
  );
}

export default SlotMachine;
