import { Link } from '@inertiajs/react'
import menus from '@/Components/SidebarMenu'
export default function Sidebar() {
    const activeClass = 'bg-blue-700 rounded-md'
    return <ul className="menu h-full bg-base-200 w-56">
        {menus.map((item, key) => <li className="" key={key}>
            <Link href={route(item.link)} className={route().current() == item.link ? activeClass : ''}>
                {item.icon}
                {item.title}
            </Link>
        </li>)}

    </ul>

}
