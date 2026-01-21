"use client";

import { ReactNode } from "react";

type TooltipProps = {
    content: string;
    children: ReactNode;
};

const Tooltip = ({ content, children }: TooltipProps) => {
    if (!content) return children;
    const tooltipId = `tooltip-${content.replace(/\s+/g, "-")}`;
    return (
        <div className="relative inline-flex group" aria-describedby={tooltipId}>
            <span className="inline-flex flex-1">
                {children}
            </span>
            <div
                id={tooltipId}
                role="tooltip"
                aria-hidden="true"
                className="pointer-events-none absolute bottom-full mb-2 opacity-0 scale-95 translate-y-1 group-hover:opacity-100 group-hover:scale-100 group-hover:translate-y-0 transition-all duration-150 ease-out bg-gray-800 text-gray-100 text-xs px-2 py-1 rounded-md shadow-lg whitespace-nowrap z-20"
            >
                {content}
            </div>
        </div>
    );
};

export default Tooltip;
