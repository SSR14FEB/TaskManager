import { useEffect, useState } from "react";
import { HiMiniPlus, HiOutlineTrash } from "react-icons/hi2";
import Input from "../input/Input";
import AddTask from "./AddTask";
function TodoList({ todoChecklist, setTodoChecklist }) {
  const [task, setTask] = useState([]);

  const addTask = (value) => {
    setTask((prev) => [...prev, value]);
  };

  const removeTask = (id) => {
    console.log("id", id);
    setTask((prev) => prev.filter((task) => task.id != id));
    setTodoChecklist(task);
  };

  useEffect(()=>{
    setTodoChecklist(task)
    return () => {};
  },[task])
 
  
  return (
    <div className="w-full">
      {task &&
        todoChecklist.map((task, index) => (
          <div
            key={task.id}
            className="w-full flex mt-3 mb-3 justify-between px-2.5 py-2 border border-slate-200 rounded-md "
          >
            <div className="flex gap-2">
            <div className="text-sm font-medium text-indigo-400">{index+1}</div>
            <div className="text-sm font-medium text-gray-900">{task.task}</div>
            </div>
            <HiOutlineTrash
              className="text-red-600"
              onClick={() => removeTask(task.id)}
            />
          </div>
        ))}
      <AddTask
        value={task}
        placeholder="Add Task"
        onClick={(value) => {
          addTask(value);
        }}
        icon={<HiMiniPlus className="" size={18} />}
      />
    </div>
  );
}

export default TodoList;
