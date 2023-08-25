import Card from "@/Components/Card"
import Authenticated from "@/Layouts/AuthenticatedLayout"
import { PageProps } from "@/types"
import { Head } from '@inertiajs/react';

export default function Index({ auth }: PageProps) {
    const cardFooter = <>
        <p>Hello word</p>
    </>
    return <Authenticated user={auth.user}
        header={<h2 className="font-semibold text-xl text-gray-800 dark:text-gray-200 leading-tight">Dashboard</h2>}>
        <Head title="User Management" />

        <Card title="User Management" className="max-w-7xl mx-auto sm:px-6 lg:px-8" isFooter={true} childrenFooter={cardFooter}>
            <p>Hello word</p>
        </Card>
    </Authenticated>
}
