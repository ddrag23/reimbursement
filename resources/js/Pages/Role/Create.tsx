import AutoComplete from "@/Components/AutoComplete";
import Card from "@/Components/Card";
import Authenticated from "@/Layouts/AuthenticatedLayout";
import { PageProps } from "@/types";
import { Head, router } from "@inertiajs/react";
import { FaTrash } from "react-icons/fa6";
import { useEffect, useState, ReactNode } from "react";
import toast, { Toaster } from 'react-hot-toast';
type CreateProps = {
    title: string
    permissions: any[]
}


export default function Create({ auth, title, permissions }: PageProps<CreateProps>) {
    const [value, setValue] = useState<string>("");
    const [role, setRole] = useState<string>("");
    //a list of countries to show the dropdown
    const [permission, setPermissions] = useState<any[]>([])

    const [permissionData, setPermissionsData] = useState<string[]>([])
    function handleInputChange(value: string) {
        if (value == '') {
            setPermissions(permissions)
            setValue(value);
            return
        }
        setValue(value);
        const filtered = permission.filter(option =>
            option.toLowerCase().includes(value.toLowerCase())
        );
        setPermissions(filtered);
    };
    function selectValue(value: string) {
        if (permissionData.some(item => item == value)) {
            toast.error("Data sudah ada")
            return
        }
        setPermissionsData([...permissionData, value])
        setValue("")
        setPermissions(permissions)

    }
    function removePermissionData(item: string) {
        setPermissionsData(permissionData.filter((i) => i != item))
    }
    function submit(e: any) {
        e.preventDefault()
        router.post(route('role.store'), { role_name: role, permissions: JSON.stringify(permissionData) })
    }
    function FooterCard() {
        return <>
            <div className="flex justify-end">
                <button className="btn btn-primary" onClick={submit}>Simpan</button>
            </div></>
    }
    useEffect(() => {
        setPermissions(permissions)
    }, [])
    return <Authenticated user={auth.user}>
        <Head title={title} />
        <Card title={title} isFooter={true} childrenFooter={<FooterCard />}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                <div className="form-control w-full">
                    <label className="label">
                        <span className="label-text">Role Name</span>
                    </label>
                    <input type="text" placeholder="Type here" className="input input-bordered w-full" value={role} onChange={(e) => setRole(e.target.value)} />
                </div>
                <div className="form-control w-full">
                    <label className="label">
                        <span className="label-text">Permissions</span>
                    </label>
                    <AutoComplete value={value} onChange={handleInputChange} items={permission} handleClick={selectValue} />
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
                            {permissionData.length ? permissionData.map((item, key) => <tr key={key}>
                                <td>{item}</td>
                                <td><button className="btn btn-error btn-sm" onClick={() => removePermissionData(item)}><FaTrash /></button></td>
                            </tr>) : <tr><td colSpan={2} className="text-center text-gray-600">Tidak ada data</td></tr>}
                        </tbody>
                    </table>
                </div>
            </div>
        </Card>
        <Toaster position="top-center" toastOptions={{
            style: {
                background: '#363636',
                color: '#fff',
            },
        }} />
    </Authenticated>
}
