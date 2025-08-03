import { useState } from "react";
import { LuChevronDown } from "react-icons/lu";
function SelectDropDown({ option, value, onChange, placeholder }) {
  const [isOpen, setIsOpen] = useState(false);
  const handelSelect = (option) => {
    onChange(option);
    setIsOpen(false);
  };
  return (
    <div className="relative w-full">
      {/* Dropdown Button */}
      <button className="w-full text-sm text-black outline-none bg-white border border-slate-100 px-2.5 py-3 rounded-md mt-2 flex justify-between items-center" onClick={() => setIsOpen(!isOpen)}>
        {value ? option.find((opt) => opt.value === value)?.label : placeholder}
        <span className="ml-2">
          {isOpen ? <LuChevronDown className="rotate-180" /> : <LuChevronDown />}
        </span>
      </button>
      {/* Dropdown Menu */}
      {isOpen && (
        <div className="absolute w-full bg-white border border-slate-100 rounded-md mt-1 shadow-md z-10">
          {option.map((data) => (
            <div
              className="px-3 py-2 text-sm text-black font-medium hover:bg-gray-100  cursor-pointer"
              key={data.value}
              onClick={() => handelSelect(data.value)}
            >
                {console.log(data.value)}
              {data.label}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export { SelectDropDown };
