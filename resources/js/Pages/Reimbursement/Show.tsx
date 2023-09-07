import Card from "@/Components/Card";
import Authenticated from "@/Layouts/AuthenticatedLayout";
import { PageProps } from "@/types";
import { Head } from "@inertiajs/react";

export default function Show({ auth, title, query, asset }: PageProps) {
    const data = query as any
    return <Authenticated user={auth.user}
        header={<h2 className="font-semibold text-xl text-gray-800 dark:text-gray-200 leading-tight">Dashboard</h2>}>
        <Head title={title as string} />

        <Card title={title as string} className="max-w-7xl mx-auto sm:px-6 lg:px-8" routeBack={route('reimbursement.index')}>
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
                {data.payment && <>
                    <tr>
                        <th className="text-left w-1/3">Notes</th>
                        <th className="text-left">:</th>
                        <th className="text-left">{data.payment.notes}</th>
                    </tr>
                    <tr>
                        <th className="text-left w-1/3">Nota Pembayaran Reimbursement</th>
                        <th className="text-left">:</th>
                        <th className="text-left"><a href={(asset as string) + "/" + data.payment.file_nota_reimbursement} target="_blank" className="btn btn-info btn-sm">Buka File</a></th>
                    </tr>
                </>}
            </table>
        </Card>

    </Authenticated>
}
