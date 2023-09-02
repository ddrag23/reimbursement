import { ReactNode } from 'react'
import { FaPencil, FaTrash, } from 'react-icons/fa6'
import { ColumnHeader } from "@/Components/DataTable";
import ListRolesBody from './ListRolesBody';
import { Link } from '@inertiajs/react';

type UserTableBodyProps = {
    data: any
    columns: ColumnHeader[],
    funcDelete?: (id: number) => void
}
export default function UserTableBody({ data, columns, funcDelete }: UserTableBodyProps): ReactNode {
    function modalDelete(id: number) {
        if (funcDelete) {
            funcDelete(id)
        }

    }
    return data.length > 0 ? data.map((item: any, key: any) => <tr key={key}>
        <td>{item.name}</td>
        <td>{item.email}</td>
        <td>
            <ListRolesBody roles={item.roles} />
        </td>
        <td>
            <Link href={route('user.edit', { id: item.id })} className="btn btn-sm btn-primary mr-2" ><FaPencil /></Link>
            <button className="btn btn-sm btn-error" onClick={() => modalDelete(item.id)}><FaTrash /></button>
        </td>
    </tr>) : <tr>
        <td colSpan={columns.length} className="text-center">Tidak ada data</td>
    </tr>
}
