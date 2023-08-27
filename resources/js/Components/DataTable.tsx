import { PropsWithChildren, ReactNode, CSSProperties } from "react"

export type ColumnHeader = {
    id: string
    title: string
    style?: CSSProperties
}
export type DataTableProps = {
    tbHeader: ColumnHeader[],
    children: ReactNode,
    pagination: ReactNode
}
export default function DataTable({ tbHeader, children, pagination }: PropsWithChildren<DataTableProps>) {
    const ColumnHeader: React.FC = () => {
        return <tr>
            {tbHeader.map(item => <td id={item.id} key={item.id} style={item.style}>
                {item.title}
            </td>)}
        </tr>
    }
    return <div className="overflow-x-auto">
        <table className="table table-pin-row block">
            {/* head */}
            <thead className="">
                <ColumnHeader />
            </thead>
            <tbody>
                {children}
            </tbody>
        </table>
        <div className="my-5 float-right">
            {pagination}
        </div>
    </div>
}
