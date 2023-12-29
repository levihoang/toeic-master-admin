import React, { ReactNode } from "react";

export const ArticleCard = ({children, className}: {children: ReactNode, className?: string}) => {
    return(<div className={`${className} bg-white py-3 px-3 rounded-xl border border-solid border-gray-e0 mb-3`}>
        {children}
    </div>)
}