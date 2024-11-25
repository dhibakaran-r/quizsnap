import { HiOutlineClipboardDocument } from "react-icons/hi2";
import { RiLinksLine } from "react-icons/ri";
import { LuLayoutDashboard } from "react-icons/lu";
import { PiUsersThreeDuotone } from "react-icons/pi";
import { GrCatalog } from "react-icons/gr";

export const AdminMenuData = [
  {
    title: "Dashboard",
    path: "/qsadmin/admindashboard",
    icon: <LuLayoutDashboard />,
    class: "item-name",
  },

  {
    title: "MCQ Management",
    path: "/qsadmin/qsmcq",
    icon: <HiOutlineClipboardDocument />,
    class: "item-name",
  },

  // {
  //   title: "Content Management",
  //   path: "/qsadmin/qscontent",
  //   icon: <RiLinksLine />,
  //   class: "item-name",
  // },

  {
    title: "User Management",
    path: "/qsadmin/qsusers",
    icon: <PiUsersThreeDuotone />,
    class: "item-name",
  },
  {
    title: "MCQ Catalog",
    path: "/qsadmin/mcqs",
    icon: <GrCatalog />,
    class: "item-name",
  },

  // {
  //     title: 'User Profile',
  //     path: '/qsadmin/userprofile',
  //     icon: <PiUserListDuotone />,
  //     class: 'item-name'
  // }
];

export const UserMenuData = [
  {
    title: "Dashboard",
    path: "/qsuser/dashboard",
    icon: <LuLayoutDashboard />,
    class: "item-name",
  },
  {
    title: "MCQ Catalog",
    path: "/qsuser/mcqs",
    icon: <GrCatalog />,
    class: "item-name",
  },

  // {
  //     title: 'User Profile',
  //     path: '/qsuser/userprofile',
  //     icon: <PiUserListDuotone />,
  //     class: 'item-name'
  // }
];
