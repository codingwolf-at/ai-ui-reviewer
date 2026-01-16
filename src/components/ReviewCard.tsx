"use client";

type ReviewCardProps = {
    title: string;
    content: string;
};

const ReviewCard = ({ title, content }: ReviewCardProps) => {
    return (
        <div className="rounded-lg border border-gray-800 bg-gray-900 p-4 shadow-sm hover:border-gray-700 transition-colors">
            <h3 className="text-sm font-semibold text-gray-100 mb-2">
                {title}
            </h3>

            <p className="text-sm text-gray-400 leading-relaxed">
                {content}
            </p>
        </div>
    );
};

export default ReviewCard;
