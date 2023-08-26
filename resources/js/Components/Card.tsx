import type { ReactElement, ReactNode, PropsWithChildren } from "react";
import React from "react";
interface CardProps {
    title: string,
    children: ReactNode,
    isFooter?: boolean,
    childrenFooter?: ReactNode,
    className?: string
}
export default function Card({ title, children, isFooter, childrenFooter, className }: PropsWithChildren<CardProps>): ReactElement {
    return <div className={`max-w-7xl mx-auto sm:px-6 lg:px-8 ${className}`}>
        <div className="bg-white dark:bg-gray-800 overflow-hidden shadow-sm sm:rounded-lg">
            <div className="pt-5 px-5">
                <p className="font-bold">{title}</p>
            </div>
            <div className="divider"></div>
            <div className="p-5">
                {children}
            </div>
            {isFooter && <>
                {childrenFooter}
            </>}

        </div>
    </div>
}
