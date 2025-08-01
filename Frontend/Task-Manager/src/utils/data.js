import {
  LuLayoutDashboard,
  LuUser,
  LuClipboardCheck,
  LuSquarePlus,
  LuLogOut,
} from "react-icons/lu";

export const SIDE_MENU_ADMIN_DATA = [
  {
    id: "01",
    label: "Dashboard",
    icon: LuLayoutDashboard,
    path: "/admin/dashboard",
  },
  {
    id: "02",
    label: "Manage Task",
    icon: LuClipboardCheck,
    path: "/admin/task",
  },
  {
    id: "03",
    label: "Create Task",
    icon: LuSquarePlus,
    path: "/admin/create_tasks",
  },
  {
    id: "04",
    label: "Team Members",
    icon: LuUser,
    path: "/admin/manage_users",
  },
  {
    id: "05",
    label: "Log Out",
    icon: LuLogOut,
    path: "/logout",
  },
];

export const SIDE_MENU_USER_DATA = [
  {
    id: "01",
    label: "Dashboard",
    icon: LuLayoutDashboard,
    path: "/user/dashboard",
  },
  {
    id: "02",
    label: "My Task",
    icon: LuClipboardCheck,
    path: "/user/my_task",
  },
  {
    id: "03",
    label: "Log Out",
    icon: LuLogOut,
    path: "/logout",
  },
];

export const PRIORITY_DATA =[
  {label:"LOW",value:"LOW"},
  {label:"MEDIUM",value:"MEDIUM"},
  {label:"HIGH",value:"HIGH"}
]

export const STATUS_DATA=[
  
]