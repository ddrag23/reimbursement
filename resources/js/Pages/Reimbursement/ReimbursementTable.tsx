import { useContext, useEffect, useState } from "react";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import axios from "axios";
import Pagination from "@/Components/Pagination";
import DataTable, { ColumnHeader } from "@/Components/DataTable";
import { FaPlus, FaXmark, FaArrowsRotate } from "react-icons/fa6";
import ReimbersementTableBody from "./Partials/ReimbersementTableBody";
import Loading from "@/Components/Loading";
import { Link, router } from "@inertiajs/react";
import can from "@/utils/can";
import AuthContext from "@/Context/AuthContext";
type ReimbursementTableProps = {
    tableUrl: string
}

export default function ReimbursementTable({ tableUrl }: ReimbursementTableProps) {
    const columns: ColumnHeader[] = [
        { id: 'tanggal', title: "Tanggal" },
        { id: 'pemohon.name', title: "Pemohon" },
        { id: 'nama_reimbursement', title: "Nama Reimbursement" },
        { id: 'deskripsi', title: "Deskripsi" },
        { id: 'status_pengajuan', title: "Status Pengajuan" },
        { id: 'action', title: "Aksi" },
    ];
    const confirm = withReactContent(Swal)
    const user = useContext(AuthContext)
    const [data, setData] = useState<any[]>([]);
    const [totalPages, setTotalPages] = useState<number>(0)
    const [currentPage, setCurrentPage] = useState<number>(1)
    const [search, setSearch] = useState<string>("")
    const [refresh, setRefresh] = useState<boolean>(false)
    const [loading, setLoading] = useState<boolean>(false)
    function handlePageChange(newPage: number) {
        setCurrentPage(newPage);
    };
    function refreshTable(value: boolean) {
        setRefresh(prev => !prev)
    }
    function deleteData(id: number) {
        confirm.fire({ icon: "warning", title: "warning", text: "Apakah anda yakin mau menghapus data ini?", showCancelButton: true }).then((result) => {
            if (result.isConfirmed) {
                router.delete(route('role.destroy', { id: id }), {
                    onFinish: () => {
                        setRefresh(prev => !prev)
                    }
                })
            }
        })
    }
    useEffect(() => {
        const source = axios.CancelToken.source()
        let url = `${tableUrl}?limit=10&page=${currentPage}`;
        if (search.length > 0) {
            url += `&search=${search}`
        }
        setLoading(true)
        axios.get(url, { cancelToken: source.token }).then(({ data }) => {
            setData(data.data)
            setTotalPages(data.totalCount)
            setLoading(false)
        })
        return () => {
            source.cancel("Ruquest Canceled")
        }
    }, [currentPage, search, refresh])

    return <>
        <div className="flex justify-between mb-5">
            {can(user, 'create-reimbursement') &&
                <Link className="btn btn-primary" href={route('reimbursement.create')}><FaPlus />Tambah</Link>
            }
            <div className="flex w-1/4 gap-3">
                <input type="text" placeholder="Type here" className="input input-bordered w-full max-w-xs" onChange={(e) => setSearch(e.target.value)} value={search} />
                {search.length > 0 &&
                    <button className="btn btn-warning" onClick={(e) => setSearch("")}><FaXmark /></button>
                }
                <button className="btn btn-secondary" onClick={(e) => setRefresh((prev) => !prev)}><FaArrowsRotate /></button>

            </div>
        </div>
        {loading ? <Loading /> :
            <DataTable tbHeader={columns} pagination={<Pagination totalData={totalPages} currentPage={currentPage} handlePageChange={handlePageChange} />}>
                <ReimbersementTableBody refreshData={refreshTable} columns={columns} data={data} funcDelete={deleteData} />
            </DataTable>
        }
    </>
}
