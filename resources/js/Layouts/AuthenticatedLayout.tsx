import { createContext, PropsWithChildren, ReactNode } from "react";
import Sidebar from "@/Components/Sidebar";
import Navbar from "@/Components/Navbar";
import { User } from "@/types";
import AuthContext from "@/Context/AuthContext";
import { Toaster } from "react-hot-toast";

export default function Authenticated({
    user,
    header,
    children,
}: PropsWithChildren<{ user?: User; header?: ReactNode }>) {
    return (
        <AuthContext.Provider value={user}>
            <div className="flex flex-col min-h-screen w-full">
                <Navbar />
                <main className="py-12">{children}</main>
            </div>
            <Toaster position="top-center" toastOptions={{
                style: {
                    background: '#363636',
                    color: '#fff',
                },
            }} />
        </AuthContext.Provider>
    );
}
