import React, { useEffect, useState, useRef } from "react";
import { motion } from "framer-motion";
function TaskStatusBar({ tabs, activeTabs, setActiveTabs }) {
  const [underline, setUnderline] = useState({ x: 0, width: 0 });
  const buttonRef = useRef([]);
  useEffect(() => {
    const activeIndex = tabs.findIndex((tab) => tab.label === activeTabs);
    console.log(activeIndex);
    if (buttonRef.current[activeIndex]) {
      const el = buttonRef.current[activeIndex];
      setUnderline({ x: el.offsetLeft, width: el.offsetWidth -40 });
    }
  }, [activeTabs, tabs]);
  return (
    <div className="my-2">
      <div className="relative flex">
        {tabs.map((tab, index) => (
          <button
            ref={(el) => {
              buttonRef.current[index] = el;
            }}
            className={`relative px-1 py-2 text-sm font-medium sm:px-3 ${tab.label === activeTabs ? "text-indigo-500" : "text-gray-500 hover:text-gray-700"}`}
            key={tab.label}
            onClick={() => setActiveTabs(tab.label)}
          >
            <div className="flex items-center">
              <span className="text-xs whitespace-nowrap">{tab.label}</span>
              <span
                className={`ml-2 rounded-full px-2 py-0.5 text-xs ${activeTabs == tab.label ? "bg-indigo-400 text-white" : "bg-gray-200/70 text-gray-600"}`}
              >
                {tab.count}
              </span>
            </div>
          </button>
        ))}
        <motion.div
          animate={{ x: underline.x, width: underline.width }}
          transition={{ type: "spring", stiffness: 500, damping: 30 }}
          className={`absolute bottom-0 mt-1 ml-2 h-px w-10 bg-gradient-to-l from-indigo-400 via-indigo-200 to-indigo-400`}
        ></motion.div>
      </div>
    </div>
  );
}

export default TaskStatusBar;
