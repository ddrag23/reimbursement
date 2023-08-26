import { useEffect, useState } from "react";
import axios from "axios";
import Pagination from "@/Components/Pagination";
import DataTable, { ColumnHeader } from "@/Components/DataTable";
type UserTableProps = {
    tableUrl: string
}

export default function UserTable({ tableUrl }: UserTableProps) {
    const columns: ColumnHeader[] = [
        { id: 'name', title: "Nama" },
        { id: 'email', title: "Email" },
    ];
    const [data, setData] = useState<any[]>([]);
    const [totalPages, setTotalPages] = useState<number>(0)
    const [currentPage, setCurrentPage] = useState<number>(1)
    const handlePageChange = (newPage: number) => {
        setCurrentPage(newPage);
    };
    useEffect(() => {
        const source = axios.CancelToken.source()
        axios.get(`${tableUrl}?limit=10&page=${currentPage}`, { cancelToken: source.token }).then(({ data }) => {
            setData(data.data)
            setTotalPages(data.totalCount)
        })
        return () => {
            source.cancel("Ruquest Canceled")
        }
    }, [currentPage])
    const TableBody: React.FC = () => {
        return data.length > 0 ? data.map((item, key) => <tr key={key}>
            <td>{item.name}</td>
            <td>{item.email}</td>
        </tr>) : <tr>
            <td colSpan={columns.length} className="text-center">Tidak ada data</td>
        </tr>
    }
    return <DataTable tbHeader={columns} pagination={<Pagination totalData={totalPages} currentPage={currentPage} handlePageChange={handlePageChange} />}>
        <TableBody />
    </DataTable>
}
