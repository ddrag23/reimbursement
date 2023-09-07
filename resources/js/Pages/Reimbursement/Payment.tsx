import Card from "@/Components/Card";
import LoadingButton from "@/Components/LoadingButton";
import Authenticated from "@/Layouts/AuthenticatedLayout";
import { PageProps } from "@/types";
import { Head, router, usePage } from "@inertiajs/react";
import { useState } from 'react'
import { toast } from "react-hot-toast";

export default function Show({ auth, title, query, asset }: PageProps) {
    const data = query as any
    const { errors } = usePage().props
    const [notes, setNotes] = useState<string>("")
    const [files, setFiles] = useState<File | string>("")
    const [loading, setLoading] = useState<boolean>(false)

    function changeFile(e: any) {
        setFiles(e.target.files[0])
    }
    function submit(e: any) {
        e.preventDefault()
        router.post(route('reimbursement.store-payment'), { reimbursement_id: data.id as number, notes, file_nota_reimbursement: files }, {
            forceFormData: true,
            headers: {
                'content-type': 'multipart/form-data',
            },
            onSuccess: () => {
                setLoading(false)
            },
            onStart: () => {
                setLoading(true)
            },
            onError: (e) => {
                console.error(e)
                toast.error("mohon lengkapi form")
                setLoading(false)
            }
        })
    }
    function FooterCard() {
        return <>
            <div className="flex justify-end">
                {loading ? <LoadingButton className="btn-primary" /> :
                    <button className="btn btn-primary" onClick={submit}>Simpan</button>
                }
            </div></>
    }
    return <Authenticated user={auth.user}
        header={<h2 className="font-semibold text-xl text-gray-800 dark:text-gray-200 leading-tight">Dashboard</h2>}>
        <Head title={title as string} />

        <Card title={title as string} isFooter={true} childrenFooter={<FooterCard />} className="max-w-7xl mx-auto sm:px-6 lg:px-8" routeBack={route('reimbursement.index')}>

            <table className="w-full">
                <tr>
                    <th className="text-left w-1/3">Pemohon</th>
                    <th className="text-left">:</th>
                    <th className="text-left">{data.pemohon.name}</th>
                </tr>
                <tr>
                    <th className="text-left w-1/3">Tanggal</th>
                    <th className="text-left">:</th>
                    <th className="text-left">{data.tanggal}</th>
                </tr>
                <tr>
                    <th className="text-left w-1/3">Nama Reimbursement</th>
                    <th className="text-left">:</th>
                    <th className="text-left">{data.nama_reimbursement}</th>
                </tr>
                <tr>
                    <th className="text-left w-1/3">Status Pengajuan</th>
                    <th className="text-left">:</th>
                    <th className="text-left">{data.nama_reimbursement}</th>
                </tr>
                <tr>
                    <th className="text-left w-1/3">File Pendukung</th>
                    <th className="text-left">:</th>
                    <th className="text-left"><a href={(asset as string) + "/" + data.file_pendukung} target="_blank" className="btn btn-info btn-sm">Buka File</a></th>
                </tr>
            </table>
            <div className="divider">Form</div>
            <div className="grid grid-cols-1 gap-3">
                <div className="form-control w-full">
                    <label className="label">
                        <span className="label-text">Catatan</span>
                    </label>
                    <textarea className="textarea textarea-bordered h-24" id="notes" onChange={(e) => setNotes(e.target.value)} placeholder="Bio" value={notes}></textarea>
                    {errors.notes && <small className="text-error">{errors.notes}</small>}
                </div>
                <div className="form-control w-full">
                    <label className="label">
                        <span className="label-text">Bukti Pembayaran <small>(gambar / pdf)</small></span>
                    </label>
                    <input type="file" id="file_nota_reimbursement" className="file-input file-input-bordered w-full" onChange={changeFile} />
                    {errors.file_nota_reimbursement && <small className="text-error">{errors.file_nota_reimbursement}</small>}
                </div>
            </div>
        </Card>

    </Authenticated>
}
