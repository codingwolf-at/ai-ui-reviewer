"use client";

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

    // TODO: change loading animation, use spinner instead

    return (
        <button
            onClick={onClick}
            disabled={isDisabled}
            className="bg-(--primary-btn) text-(--primary-btn-text) rounded-lg px-5 py-2.5 font-medium hover:opacity-90 active:scale-[0.98] cursor-pointer transition-all disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:opacity-50 flex justify-center gap-2"
        >
            {loading ? (
                <>
                    <span className="opacity-90">{loadingText}</span>
                    <span className="flex items-center gap-1 ml-1">
                        <span className="w-2 h-2 bg-black rounded-full animate-bounce [animation-delay:-0.3s]" />
                        <span className="w-2 h-2 bg-black rounded-full animate-bounce [animation-delay:-0.15s]" />
                        <span className="w-2 h-2 bg-black rounded-full animate-bounce" />
                        <span className="w-2 h-2 bg-black rounded-full animate-bounce" />
                    </span>
                </>
            ) : (
                children
            )}
        </button>
    );
};

export default PrimaryButton;
