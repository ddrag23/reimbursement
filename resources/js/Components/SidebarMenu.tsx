import { FaGaugeHigh, FaUser, } from "react-icons/fa6";
import type { ReactElement } from 'react'
export type SidebarMenu = {
    title: string;
    link: string;
    icon: ReactElement;
};
const menus: SidebarMenu[] = [
    {
        title: "Dashboard",
        icon: <FaGaugeHigh />,
        link: "dashboard",
    },
    {
        title: "Profile",
        icon: <FaUser />,
        link: "profile.edit",
    },
];
export default menus;
