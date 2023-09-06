import { Link } from "@inertiajs/react";
import type { ReactElement, ReactNode, PropsWithChildren } from "react";
import { FaArrowLeft } from "react-icons/fa6";
interface CardProps {
    title: string,
    children: ReactNode,
    isFooter?: boolean,
    childrenFooter?: ReactNode,
    className?: string,
    toolBar?: ReactNode,
    routeBack?: string
}
export default function Card({ title, children, isFooter, childrenFooter, className, toolBar, routeBack }: PropsWithChildren<CardProps>): ReactElement {
    return <div className={`max-w-7xl mx-auto sm:px-6 lg:px-8 ${className} overflow-x-auto`}>
        <div className="bg-white dark:bg-gray-800 shadow-sm sm:rounded-lg">
            <div className="flex justify-between items-center pt-5 px-5">
                <div className="">
                    <p className="font-bold">{title}</p>
                </div>
                <div className="flex gap-2">
                    {routeBack && <Link href={routeBack as string} className="btn btn-sm btn-secondary"><FaArrowLeft />Kembali</Link>}
                    {toolBar}
                </div>
            </div>
            <div className="divider"></div>
            <div className="p-5">
                {children}
            </div>
            {isFooter && <>
                {<div className="p-5">{childrenFooter}</div>}
            </>}

        </div>
    </div>
}
