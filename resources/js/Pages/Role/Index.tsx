import Card from "@/Components/Card"
import Authenticated from "@/Layouts/AuthenticatedLayout"
import { PageProps } from "@/types"
import { Head } from '@inertiajs/react';
import RoleTable from "./RoleTable";

export default function Index({ auth, table, title }: PageProps) {
    return <Authenticated user={auth.user}
        header={<h2 className="font-semibold text-xl text-gray-800 dark:text-gray-200 leading-tight">Dashboard</h2>}>
        <Head title={title as string} />

        <Card title={title as string} className="max-w-7xl mx-auto sm:px-6 lg:px-8">
            <RoleTable tableUrl={table as string} />
        </Card>
    </Authenticated>
}
