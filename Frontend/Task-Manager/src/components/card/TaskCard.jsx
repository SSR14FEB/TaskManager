import React from "react";
import { Progress } from "../progress/Progress";
import AvatarGroup from "../avatargroup/AvatarGroup";
import { LuPaperclip } from "react-icons/lu";
import moment from "moment";
function TaskCard({
  title,
  description,
  priority,
  status,
  progress,
  createdAt,
  dueDate,
  assignedTo,
  todoCheckList,
  todoCompleted,
  attachments
}) {
  const getStatusBadge = function (status) {
    switch (status) {
      case "Completed":
        return "bg-green-100 text-green-500 border border-green-200";
      case "In Progress":
        return "bg-cyan-100 text-cyan-500 border border-cyan-200";
      case "Pending":
        return "bg-purple-100 text-purple-500 border border-purple-200";
      default:
        return "bg-gray-100 text-gray-500 border border-cyan-200";
    }
  };

  const getPriorityBadgeColor = function (priority) {
    switch (priority) {
      case "High":
        return "bg-red-100 text-red-500 border border-red-200";
      case "Medium":
        return "bg-orange-100 text-orange-500 border border-orange-200";
      case "Low":
        return "bg-green-100 text-green-500 border border-green-200";
      default:
        return "bg-gray-100 text-gray-500 border border-cyan-200";
    }
  };
  return (
    <div className="h-full max-w-sm rounded-md border border-gray-200/50 bg-white p-4 shadow-md shadow-gray-100 ">
      <div className="flex gap-2 text-xs font-medium">
        <span className={`rounded-sm px-3 py-1 ${getStatusBadge(status)}`}>
          {status}
        </span>
        <span
          className={`rounded-sm px-3 py-1 ${getPriorityBadgeColor(priority)}`}
        >
          {priority + " " + "Priority"}
        </span>
      </div>
      <p className="mt-2 text-sm font-medium">{title}</p>
      <p className="mt-2 text-xs font-light text-gray-600">{description}</p>
      <p className="mt-2 mb-2 text-xs font-medium text-gray-600">
        Task Done:{" "}
        <span>
          {todoCompleted}/{todoCheckList?.length || 0}
        </span>
      </p>
      <Progress progress={progress} status={status} />
      <div className="mt-2 flex w-full justify-between">
        <div>
          <span className="mt-2 mb-2 text-xs font-medium text-gray-600">
            Start Date
          </span>
          <p className="mb-2 text-xs font-medium text-gray-900">
            {" "}
            {moment(createdAt).format("Do MM YYYY")}
          </p>
        </div>
        <div>
          <span className="mt-2 mb-2 text-xs font-medium text-gray-600">
            Due Date
          </span>
          <p className="mb-2 text-xs font-medium text-gray-900">
            {" "}
            {moment(dueDate).format("Do MM YYYY")}
          </p>
        </div>
      </div>
      <div className="flex w-full h-10 justify-between items-center">
        <AvatarGroup avatars={assignedTo} maxVisible={3} />
        <div className="card-btn mt-2">
          <p className="text-neutral-50 text-[15px]">
            {attachments.length}
          </p>
          <LuPaperclip size={14} className="text-neutral-50" />
        </div>
      </div>
    </div>
  );
}

export { TaskCard };
