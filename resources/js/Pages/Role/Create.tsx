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
    permissions: any[]
}


export default function Create({ auth, title, permissions }: PageProps<CreateProps>) {
    const [value, setValue] = useState<string>("");
    const [role, setRole] = useState<string>("");
    //a list of countries to show the dropdown
    const [permission, setPermissions] = useState<any[]>([])
    const { errors } = usePage().props
    const [permissionData, setPermissionsData] = useState<string[]>([])
    const [loading, setLoading] = useState<boolean>(false)
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
        router.post(route('role.store'), { role_name: role, permissions: permissionData.length ? JSON.stringify(permissionData) : '' }, {
            onSuccess: () => {
                setPermissionsData([])
                setRole("")
                setLoading(false)
                toast.success("Data berhasil disimpan");
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
    useEffect(() => {
        setPermissions(permissions)
    }, [])
    return <Authenticated user={auth.user}>
        <Head title={title} />
        <Card title={title} isFooter={true} childrenFooter={<FooterCard />} routeBack={route('role.index')}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                <div className="form-control w-full">
                    <label className="label">
                        <span className="label-text">Role Name</span>
                    </label>
                    <input type="text" placeholder="Type here" className="input input-bordered w-full" value={role} onChange={(e) => setRole(e.target.value)} />
                    {errors.role_name && <small className="text-error">{errors.role_name}</small>}
                </div>
                <div className="form-control w-full">
                    <label className="label">
                        <span className="label-text">Permissions</span>
                    </label>
                    <AutoComplete value={value} onChange={handleInputChange} items={permission} handleClick={selectValue} />
                    {errors.permissions && <small className="text-error">{errors.permissions}</small>}

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
