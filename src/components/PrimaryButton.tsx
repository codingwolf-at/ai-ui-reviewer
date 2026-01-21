"use client";

import Spinner from "./Spinner";

type PrimaryButtonProps = {
    loading?: boolean;
    disabled?: boolean;
    loadingText?: string;
    onClick: () => void;
    children: React.ReactNode;
};

const PrimaryButton = ({
    loading = false,
    disabled = false,
    loadingText = "Loading",
    onClick,
    children,
}: PrimaryButtonProps) => {
    const isDisabled = disabled || loading;

    return (
        <button
            onClick={onClick}
            disabled={isDisabled}
            className="bg-(--primary-btn) text-(--primary-btn-text) rounded-lg px-5 py-2.5 font-medium hover:opacity-90 active:scale-[0.98] cursor-pointer transition-all disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:opacity-50 flex items-center justify-center gap-2"
        >
            {loading ? (
                <>
                    <Spinner />
                    <span className="opacity-90">{loadingText}</span>
                </>
            ) : (
                children
            )}
        </button>
    );
};

export default PrimaryButton;
