import { FaGaugeHigh, FaUser, FaUsers, FaRightFromBracket, FaCircleRadiation, FaArrowRotateLeft } from "react-icons/fa6";
import type { ReactElement } from 'react'
export type SidebarMenu = {
    title: string;
    link: string;
    icon: ReactElement;
    permission: string
};
const menus: SidebarMenu[] = [
    {
        title: "Dashboard",
        icon: <FaGaugeHigh />,
        link: "dashboard",
        permission: 'dashboard',
    },
    {
        title: "Reimbersement",
        icon: <FaArrowRotateLeft />,
        link: "reimbursement.index",
        permission: 'reimbursement'
    },
    {
        title: "Profile",
        icon: <FaUser />,
        link: "profile.edit",
        permission: 'profile'

    },
    {
        title: "User Management",
        icon: <FaUsers />,
        link: "user.index",
        permission: 'user-management'
    },
    {
        title: "Role Management",
        icon: <FaCircleRadiation />,
        link: "role.index",
        permission: 'role-management'
    },
    {
        title: "Logout",
        icon: <FaRightFromBracket />,
        link: "logout",
        permission: ''
    },
];
export default menus;
