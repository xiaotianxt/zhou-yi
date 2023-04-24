import { useState } from "react";
import Slot from "./Slot";
import { Combination, data } from "./data";
import "./SlotMachine.css";

function SlotMachine() {
  const [slot, setSlot] = useState<Combination>(data[0]);
  const [mode, setMode] = useState<"背前面" | "背后面">("背前面");
  const [show, setShow] = useState(false);
  const [cnt, setCnt] = useState(0);
  const [ignore, setIgnore] = useState<Combination[]>([]);

  const spin = () => {
    if (cnt === 100) {
      alert("宝贝已经背100次了，休息一下吧！");
      setCnt(0);
      return;
    }
    const slots = data.filter((item) => !ignore.includes(item));
    if (slots.length === 0) {
      alert("恭喜背完了所有的词汇！可以刷新重开捏");
      location.reload();
      return;
    }
    const slot = slots[Math.floor(Math.random() * slots.length)];
    setSlot(slot);
    setShow(false);
    setCnt((cnt) => cnt + 1);
  };

  const done = () => {
    setIgnore((cur) => {
      if (cur.includes(slot)) {
        return cur;
      }
      return [...cur, slot].sort((a, b) => {
        if (a.c1 === b.c1) {
          if (a.c2 === b.c2) {
            return a.result.localeCompare(b.result);
          }
          return a.c2.localeCompare(b.c2);
        }
        return a.c1.localeCompare(b.c1);
      });
    });
    spin();
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
        <button onClick={done} className="spin-button">
          忽略这个
        </button>
      </div>
      <div>
        已背{cnt}次, 已忽略{ignore.length}个
      </div>
      <div className="info">
        {ignore.map((item, index) => {
          // 如果上一个和这一个的 c1 不一样就加一个换行
          return (
            <>
              {index > 0 && ignore[index - 1].c1 !== item.c1 && <br />}
              <span
                key={item.c1 + item.c2 + item.result}
                className="item"
                onClick={() => {
                  setIgnore((cur) => {
                    const index = cur.findIndex((i) => i === item);
                    const newCur = [...cur];
                    newCur.splice(index, 1);
                    return newCur;
                  });
                }}
              >
                {item.c1}
                {item.c2}
                {item.result} &nbsp;
              </span>
            </>
          );
        })}
      </div>
    </div>
  );
}

export default SlotMachine;
