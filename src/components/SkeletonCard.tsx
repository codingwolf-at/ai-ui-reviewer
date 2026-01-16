"use client";

const SkeletonCard = () => {
    return (
        <div className="rounded-lg border border-gray-800 bg-gray-900 p-4 shadow-sm animate-pulse">
            <div className="h-4 w-32 bg-gray-700 rounded mb-3" />
            <div className="space-y-2">
                <div className="h-3 w-full bg-gray-800 rounded" />
                <div className="h-3 w-5/6 bg-gray-800 rounded" />
                <div className="h-3 w-2/3 bg-gray-800 rounded" />
            </div>
        </div>
    );
};

export default SkeletonCard;
