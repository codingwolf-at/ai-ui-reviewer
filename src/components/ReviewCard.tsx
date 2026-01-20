"use client";

type ReviewCardProps = {
    title: string;
    content: string;
};

const ReviewCard = ({ title, content }: ReviewCardProps) => {
    return (
        <div className="bg-(--surface-bg) rounded-lg p-4">
            <h3 className="text-white font-medium mb-1">
                {title}
            </h3>

            <p className="text-gray-300 text-sm leading-relaxed">
                {content}
            </p>
        </div>
    );
};

export default ReviewCard;
