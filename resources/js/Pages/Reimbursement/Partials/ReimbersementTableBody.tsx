import { ReactNode, useContext, useState } from 'react'
import { FaPencil, FaTrash, } from 'react-icons/fa6'
import { ColumnHeader } from "@/Components/DataTable";
import { Link, router } from '@inertiajs/react';
import AuthContext from '@/Context/AuthContext';
import can from '@/utils/can';
import LoadingButton from '@/Components/LoadingButton';
import { PENGAJUAN, APPROVE_DIRECTOR, APPROVE_FINANCE, REJECT_DIRECTOR, REJECT_FINANCE } from '@/constant/reimbursement-status.constant';
type RoleTableBodyProps = {
    data: any
    columns: ColumnHeader[],
    funcDelete?: (id: number) => void,
    refreshData: (refresh: boolean) => void
}
export default function RoleTableBody({ data, columns, funcDelete, refreshData }: RoleTableBodyProps): ReactNode {
    const context = useContext(AuthContext)
    const [loadingApprove, setLoadingApprove] = useState<boolean>(false)
    const [loadingReject, setLoadingReject] = useState<boolean>(false)
    const [index, setIndex] = useState<number>()
    function modalDelete(id: number) {
        if (funcDelete) {
            funcDelete(id)
        }

        (window as any).delete_modal.showModal()
    }
    function canRole(role: string) {
        return context?.roles.some(e => e.name == role)
    }
    function showVerificationButton(permission: string, statusPengajuan: string) {
        return (canRole('direktur') || canRole('finance')) && can(context, permission) && ![REJECT_DIRECTOR, REJECT_FINANCE].includes(statusPengajuan)
    }

    function approve(e: any) {
        e.preventDefault()
        const payload = {
            status_pengajuan: canRole('direktur') ? APPROVE_DIRECTOR : APPROVE_FINANCE
        }
        router.put(route('reimbursement.verification', { id: e.target.dataset.id }), payload, {
            onSuccess: () => {
                refreshData(true)
                setLoadingApprove(false)
            },
            onStart: () => {
                setIndex(e.target.dataset.id)
                setLoadingApprove(true)
            },
            onError: (e) => {
                console.error(e)
                setLoadingApprove(false)
            }
        })
    }

    function reject(e: any) {
        e.preventDefault()
        const payload = {
            status_pengajuan: canRole('direktur') ? REJECT_DIRECTOR : REJECT_FINANCE
        }
        router.put(route('reimbursement.verification', { id: e.target.dataset.id }), payload, {
            onSuccess: () => {
                setLoadingReject(false)
                refreshData(true)

            },
            onStart: () => {
                setIndex(e.target.dataset.id)
                setLoadingReject(true)
            },
            onError: (e) => {
                console.error(e)
                setLoadingReject(false)
            }
        })
    }

    return data.length > 0 ? <>
        {data.map((item: any, key: any) =>
            <tr key={key}>
                <td>{item.tanggal}</td>
                <td>{item.pemohon.name}</td>
                <td>{item.nama_reimbursement}</td>
                <td>{item.deskripsi}</td>
                <td>{item.status_pengajuan}</td>
                <td className='flex gap-3' >
                    {loadingApprove && item.id == index ? <LoadingButton className='btn-success btn-sm' /> : showVerificationButton('approve-reimbursement', item.status_pengajuan) && <button className='btn btn-success btn-sm' onClick={approve} data-id={item.id}>Approve</button>}
                    {loadingReject && item.id == index ? <LoadingButton className='btn-error btn-sm' /> : showVerificationButton('reject-reimbursement', item.status_pengajuan) && <button className='btn btn-error btn-sm' onClick={reject} data-id={item.id}>Reject</button>}
                    {canRole('staff') && item.status_pengajuan == PENGAJUAN &&
                        <button className="btn btn-sm btn-error" onClick={() => modalDelete(item.id)}><FaTrash /></button>
                    }
                </td>
            </tr>)}

    </>
        : <tr>
            <td colSpan={columns.length} className="text-center">Tidak ada data</td>
        </tr>

}
