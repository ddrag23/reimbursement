import AutoComplete from "@/Components/AutoComplete";
import Card from "@/Components/Card";
import Authenticated from "@/Layouts/AuthenticatedLayout";
import { PageProps } from "@/types";
import { Head } from "@inertiajs/react";
import React, { memo, useState } from "react";
export default function Create({ auth }: PageProps) {
    const [value, setValue] = useState("");
    //a list of countries to show the dropdown
    const countries = ["Africa", "Armenia", "Canada", "United States"];
    return <Authenticated user={auth.user}>
        <Head title="Create Role" />
        <Card title="Create Role">
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
                    <AutoComplete value={value} onChange={setValue} items={countries} />
                </div>
            </div>
        </Card>
    </Authenticated>
}
