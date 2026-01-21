"use client";

import Spinner from "./Spinner";

type ButtonVariant = "primary" | "secondary";

type PrimaryButtonProps = {
    loading?: boolean;
    disabled?: boolean;
    loadingText?: string;
    variant?: ButtonVariant;
    onClick: () => void;
    children: React.ReactNode;
    isFullWidth?: boolean
};

const PrimaryButton = ({
    loading = false,
    disabled = false,
    loadingText = "Loading",
    variant = "primary",
    onClick = () => {},
    children,
    isFullWidth = false
}: PrimaryButtonProps) => {
    const isDisabled = disabled || loading;

    const baseClasses =
        "rounded-lg px-5 py-2.5 font-medium hover:opacity-90 active:scale-[0.98] cursor-pointer transition-all disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:opacity-50 flex items-center justify-center gap-2";

    const variantClasses = {
        primary: "bg-(--primary-btn) text-(--primary-btn-text)",
        secondary:
            "bg-transparent border border-(--primary-btn) text-(--primary-btn) hover:bg-(--primary-btn)/10",
    };

    return (
        <button
            onClick={onClick}
            disabled={isDisabled}
            className={`${baseClasses} ${variantClasses[variant]} ${isFullWidth && 'w-full'}`}
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
