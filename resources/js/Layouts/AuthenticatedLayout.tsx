import { useState, PropsWithChildren, ReactNode } from "react";
import Sidebar from "@/Components/Sidebar";
import Navbar from "@/Components/Navbar";
import { User } from "@/types";

export default function Authenticated({
    user,
    header,
    children,
}: PropsWithChildren<{ user: User; header?: ReactNode }>) {
    const [showingNavigationDropdown, setShowingNavigationDropdown] =
        useState(false);

    return (
        <>
            <div className="flex flex-col min-h-screen w-full">
                <Navbar />
                <main>{children}</main>
            </div>
        </>
    );
}
