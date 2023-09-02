import Card from "@/Components/Card"
import Authenticated from "@/Layouts/AuthenticatedLayout"
import { PageProps } from "@/types"
import { Head, usePage } from '@inertiajs/react';
import UserTable from "./UserTable";
import { toast } from "react-hot-toast";
import { useEffect } from 'react'
export default function Index({ auth, table }: PageProps) {
    const page = usePage<PageProps>().props;
    useEffect(() => {
        if (page.flash.message) {
            toast.success(page.flash.message)
        }
    }, [page.flash.message])
    return <Authenticated user={auth.user}
        header={<h2 className="font-semibold text-xl text-gray-800 dark:text-gray-200 leading-tight">Dashboard</h2>}>
        <Head title="User Management" />

        <Card title="User Management" className="max-w-7xl mx-auto sm:px-6 lg:px-8">
            <UserTable tableUrl={table as string} />
        </Card>
    </Authenticated>
}
