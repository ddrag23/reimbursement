import AutoComplete from "@/Components/AutoComplete";
import Card from "@/Components/Card";
import Authenticated from "@/Layouts/AuthenticatedLayout";
import { PageProps } from "@/types";
import { Head, router, usePage } from "@inertiajs/react";
import { FaTrash } from "react-icons/fa6";
import { useEffect, useState } from "react";
import LoadingButton from "@/Components/LoadingButton";
import toast from 'react-hot-toast';
type CreateProps = {
    title: string
    roles_query: any[],
    query: any
}

type UserPayload = {
    name: string,
    email: string
    roles: string
}


export default function Create({ auth, title, roles_query, query }: PageProps<CreateProps>) {
    const [value, setValue] = useState<string>("");
    const [payload, setPayload] = useState<UserPayload>({ name: "", email: "", roles: "" });
    //a list of countries to show the dropdown
    const [roles, setRoles] = useState<any[]>([])
    const { errors } = usePage().props
    const [rolesData, setRolesData] = useState<string[]>([])
    const [loading, setLoading] = useState<boolean>(false)
    function handleInputChange(value: string) {
        if (value == '') {
            setRoles(roles_query)
            setValue(value);
            return
        }
        setValue(value);
        const filtered = roles.filter(option =>
            option.toLowerCase().includes(value.toLowerCase())
        );
        setRoles(filtered);
    };

    function bindingValue(e: any) {
        const key = e.target.id
        const value = e.target.value
        const ignore = ["roles", "", null, undefined]
        if (!ignore.includes(key)) {
            setPayload((val: any) => ({ ...val, [key]: value }))
        }
    }

    function selectValue(value: string) {
        if (rolesData.some(item => item == value)) {
            toast.error("Data sudah ada")
            return
        }
        setRolesData([...rolesData, value])
        setValue("")
        setRoles(roles_query)

    }
    function removerolesData(item: string) {
        setRolesData(rolesData.filter((i) => i != item))
    }
    function submit(e: any) {
        e.preventDefault()
        payload.roles = rolesData.length ? JSON.stringify(rolesData) : ""
        console.log(payload)
        router.put(route('user.update', { id: query.id }), payload, {
            onSuccess: () => {
                setRolesData([])
                setPayload({
                    name: "",
                    email: "",
                    roles: ""
                })
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
    useEffect(() => {
        setRoles(roles_query)
        setPayload({
            name: query.name,
            email: query.email,
            roles: ""
        })
        const userRoles = query.roles.map((item: any) => item.name)
        console.log(query.roles)
        setRolesData(userRoles)
    }, [])
    return <Authenticated user={auth.user}>
        <Head title={title} />
        <Card title={title} isFooter={true} childrenFooter={<FooterCard />} routeBack={route('role.index')}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                <div className="form-control w-full">
                    <label className="label">
                        <span className="label-text">Nama</span>
                    </label>
                    <input type="text" id="name" placeholder="Type here" className="input input-bordered w-full" value={payload.name} onChange={bindingValue} />
                    {errors.name && <small className="text-error">{errors.name}</small>}
                </div>
                <div className="form-control w-full">
                    <label className="label">
                        <span className="label-text">Email</span>
                    </label>
                    <input type="text" id="email" placeholder="Type here" className="input input-bordered w-full" value={payload.email} onChange={bindingValue} />
                    {errors.email && <small className="text-error">{errors.email}</small>}
                </div>
                <div className="form-control w-full">
                    <label className="label">
                        <span className="label-text">Roles</span>
                    </label>
                    <AutoComplete value={value} onChange={handleInputChange} items={roles} handleClick={selectValue} />
                    {errors.roles && <small className="text-error">{errors.roles}</small>}

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
                            {rolesData.length ? rolesData.map((item, key) => <tr key={key}>
                                <td>{item}</td>
                                <td><button className="btn btn-error btn-sm" onClick={() => removerolesData(item)}><FaTrash /></button></td>
                            </tr>) : <tr><td colSpan={2} className="text-center text-gray-600">Tidak ada data</td></tr>}
                        </tbody>
                    </table>
                </div>
            </div>
        </Card>
    </Authenticated>
}
