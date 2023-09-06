import AutoComplete from "@/Components/AutoComplete";
import Card from "@/Components/Card";
import Authenticated from "@/Layouts/AuthenticatedLayout";
import { PageProps } from "@/types";
import { Head, router, usePage } from "@inertiajs/react";
import { FaTrash } from "react-icons/fa6";
import { useEffect, useState } from "react";
import LoadingButton from "@/Components/LoadingButton";
import toast, { Toaster } from 'react-hot-toast';
type CreateProps = {
    title: string
}

type Payload = {
    nama_reimbursement: string
    deskripsi: string
    file_pendukung: File | string
    tanggal: string

}


export default function Create({ auth, title }: PageProps<CreateProps>) {
    const { errors } = usePage().props
    const [loading, setLoading] = useState<boolean>(false)
    const [payload, setPayload] = useState<Payload>({
        tanggal: new Date().toDateString(),
        nama_reimbursement: "",
        deskripsi: "",
        file_pendukung: "",
    })
    function bindingValue(e: any) {
        const key = e.target.id
        const value = e.target.value
        if (e.target.files && key == 'file_pendukung') {
            setPayload((val: any) => ({ ...val, file_pendukung: e.target.files[0] }))
        } else {
            setPayload((val: any) => ({ ...val, [key]: value }))
        }
    }
    function convert(str: string) {
        let date = new Date(str),
            mnth = ("0" + (date.getMonth() + 1)).slice(-2),
            day = ("0" + date.getDate()).slice(-2);
        return [date.getFullYear(), mnth, day].join("-");
    }
    function submit(e: any) {
        e.preventDefault()
        router.post(route('reimbursement.store'), payload, {
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
    return <Authenticated user={auth.user}>
        <Head title={title} />
        <Card title={title} isFooter={true} childrenFooter={<FooterCard />} routeBack={route('role.index')}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                <div className="form-control w-full">
                    <label className="label">
                        <span className="label-text">Nama Reimbursement</span>
                    </label>
                    <input type="text" placeholder="Type here" id="nama_reimbursement" className="input input-bordered w-full" value={payload.nama_reimbursement} onChange={bindingValue} />
                    {errors.nama_reimbursement && <small className="text-error">{errors.nama_reimbursement}</small>}
                </div>
                <div className="form-control w-full">
                    <label className="label">
                        <span className="label-text">Tanggal</span>
                    </label>
                    <input type="date" placeholder="Type here" id="tanggal" className="input input-bordered w-full" value={convert(payload.tanggal)} onChange={bindingValue} />
                    {errors.tanggal && <small className="text-error">{errors.tanggal}</small>}
                </div>
                <div className="form-control w-full">
                    <label className="label">
                        <span className="label-text">deksripsi</span>
                    </label>
                    <textarea className="textarea textarea-bordered h-24" id="deskripsi" onChange={bindingValue} placeholder="Bio" value={payload.deskripsi}></textarea>
                    {errors.deskripsi && <small className="text-error">{errors.deskripsi}</small>}
                </div>
                <div className="form-control w-full">
                    <label className="label">
                        <span className="label-text">File Pendukung <small>(gambar / pdf)</small></span>
                    </label>
                    <input type="file" id="file_pendukung" className="file-input file-input-bordered w-full" onChange={bindingValue} />
                    {errors.file_pendukung && <small className="text-error">{errors.file_pendukung}</small>}
                </div>
            </div>
        </Card>
    </Authenticated>
}
