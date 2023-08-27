import { Link } from "@inertiajs/react";
import { ReactElement, ReactNode } from "react";

type SidebarItemProps = {
    link: string, icon: ReactElement, title: string
}
export default function SidebarItem({ link, icon, title }: SidebarItemProps) {
    const activeClass = 'bg-blue-700 rounded-md'
    return <li className="">
        <Link href={route(link)} className={route().current() == link ? activeClass : ''}>
            {icon}
            {title}
        </Link> </li>
}
