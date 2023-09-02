import { ReactNode, useState } from 'react'
import { FaPencil, FaTrash, } from 'react-icons/fa6'
import { ColumnHeader } from "@/Components/DataTable";
import { Link, router } from '@inertiajs/react';
type RoleTableBodyProps = {
    data: any
    columns: ColumnHeader[],
    funcDelete?: (id: number) => void
}
export default function RoleTableBody({ data, columns, funcDelete }: RoleTableBodyProps): ReactNode {
    function modalDelete(id: number) {
        if (funcDelete) {
            funcDelete(id)
        }

        (window as any).delete_modal.showModal()
    }

    return data.length > 0 ? <>
        {data.map((item: any, key: any) =>
            <tr key={key}>
                <td>{item.name}</td>
                <td>
                    <Link href={route('role.edit', { id: item.id })} className="btn btn-sm btn-primary mr-2"><FaPencil /></Link>
                    <button className="btn btn-sm btn-error" onClick={() => modalDelete(item.id)}><FaTrash /></button>
                </td>
            </tr>)}

    </>
        : <tr>
            <td colSpan={columns.length} className="text-center">Tidak ada data</td>
        </tr>

}
