import { ReactNode } from 'react'
import { FaPencil, FaTrash, } from 'react-icons/fa6'
import { ColumnHeader } from "@/Components/DataTable";

type UserTableBodyProps = {
    data: any
    columns: ColumnHeader[]
}
export default function UserTableBody({ data, columns }: UserTableBodyProps): ReactNode {
    return data.length > 0 ? data.map((item: any, key: any) => <tr key={key}>
        <td>{item.name}</td>
        <td>
            <button className="btn btn-sm btn-primary mr-2" onClick={() => (window as any).my_modal_1.showModal()}><FaPencil /></button>
            <button className="btn btn-sm btn-error"><FaTrash /></button>
        </td>
    </tr>) : <tr>
        <td colSpan={columns.length} className="text-center">Tidak ada data</td>
    </tr>
}
