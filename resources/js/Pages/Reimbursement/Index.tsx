import Card from "@/Components/Card"
import Authenticated from "@/Layouts/AuthenticatedLayout"
import { PageProps } from "@/types"
import { Head } from '@inertiajs/react';
import ReimbursementTable from "./ReimbursementTable";
import { toast } from "react-hot-toast";
import { usePage } from "@inertiajs/react";
import { useEffect } from "react"

export default function Index({ auth, table, title }: PageProps) {
    const page = usePage<PageProps>().props;
    useEffect(() => {
        if (page.flash.message) {
            toast.success(page.flash.message)
        }
    }, [page.flash.message])
    return <Authenticated user={auth.user}
        header={<h2 className="font-semibold text-xl text-gray-800 dark:text-gray-200 leading-tight">Dashboard</h2>}>
        <Head title={title as string} />

        <Card title={title as string} className="max-w-7xl mx-auto sm:px-6 lg:px-8">
            <ReimbursementTable tableUrl={table as string} />
        </Card>

    </Authenticated>
}
