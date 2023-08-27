import { useContext, useEffect, useState } from "react";
import axios from "axios";
import Pagination from "@/Components/Pagination";
import DataTable, { ColumnHeader } from "@/Components/DataTable";
import { FaPlus, FaXmark, FaArrowsRotate } from "react-icons/fa6";
import UserTableBody from "./Partials/UserTableBody";
import Loading from "@/Components/Loading";
import can from "@/utils/can";
import AuthContext from "@/Context/AuthContext";
type UserTableProps = {
    tableUrl: string
}

export default function UserTable({ tableUrl }: UserTableProps) {
    const columns: ColumnHeader[] = [
        { id: 'name', title: "Nama" },
        { id: 'email', title: "Email" },
        { id: 'roles', title: "Roles" },
        { id: 'action', title: "Aksi" },
    ];
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
            {can(user, 'create-user') &&
                <button className="btn btn-primary"><FaPlus />Tambah</button>
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
                <UserTableBody columns={columns} data={data} />
            </DataTable>
        }
        <dialog id="my_modal_1" className="modal">
            <form method="dialog" className="modal-box">
                <h3 className="font-bold text-lg">Hello!</h3>
                <p className="py-4">Press ESC key or click the button below to close</p>
                <div className="modal-action">
                    {/* if there is a button in form, it will close the modal */}
                    <button className="btn">Close</button>
                </div>
            </form>
        </dialog>
    </>
}
