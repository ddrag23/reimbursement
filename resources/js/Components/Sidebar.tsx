import { Link } from '@inertiajs/react'
import menus from '@/Components/SidebarMenu'
import { useContext } from 'react'
import AuthContext from '@/Context/AuthContext'
import SidebarItem from './SidebarItem'
export default function Sidebar() {
    const user = useContext(AuthContext)
    const roles = user?.roles.map(item => item.permissions)
    const permissions = roles?.map(item => item.map(p => p.name))[0]

    return <ul className="menu h-full bg-base-200 w-56">
        {menus.map((item, key) => item.permission == '' ? <SidebarItem key={key} link={item.link} title={item.title} icon={item.icon} /> : permissions?.includes(item.permission) && <SidebarItem key={key} link={item.link} title={item.title} icon={item.icon} />)}

    </ul>

}
