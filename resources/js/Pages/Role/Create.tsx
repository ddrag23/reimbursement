import AutoComplete from "@/Components/AutoComplete";
import Card from "@/Components/Card";
import Authenticated from "@/Layouts/AuthenticatedLayout";
import { PageProps } from "@/types";
import { Head } from "@inertiajs/react";
import { useEffect, useState } from "react";

type CreateProps = {
    title: string
    permissions: any[]
}
export default function Create({ auth, title, permissions }: PageProps<CreateProps>) {
    const [value, setValue] = useState("");
    //a list of countries to show the dropdown
    const [permission, setPermissions] = useState<any[]>([])

    const [permissionData, setPermissionsData] = useState<string[]>([])

    const handleInputChange = (value: string) => {
        if (value == '') {
            setPermissions(permissions)
            setValue(value);
            return
        }
        setValue(value);
        setPermissionsData([...permissionData, value])
        const filtered = permission.filter(option =>
            option.toLowerCase().includes(value.toLowerCase())
        );
        setPermissions(filtered);
    };
    useEffect(() => {
        setPermissions(permissions)
    }, [])
    return <Authenticated user={auth.user}>
        <Head title={title} />
        <Card title={title}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                <div className="form-control w-full">
                    <label className="label">
                        <span className="label-text">Role Name</span>
                    </label>
                    <input type="text" placeholder="Type here" className="input input-bordered w-full" />
                </div>
                <div className="form-control w-full">
                    <label className="label">
                        <span className="label-text">Permissions</span>
                    </label>
                    <AutoComplete value={value} onChange={handleInputChange} items={permission} />
                </div>
            </div>
            <div className="grid grid-cols-1 mt-5">
                <div className="overflow-x-auto">
                    <table className="table static">
                        {/* head */}
                        <thead>
                            <tr>
                                <th>Name</th>
                                <th>Aksi</th>
                            </tr>
                        </thead>
                        <tbody>
                            {permissionData.map(item => <tr>
                                <td>{item}</td>
                            </tr>)}
                        </tbody>
                    </table>
                </div>
            </div>
        </Card>
    </Authenticated>
}
