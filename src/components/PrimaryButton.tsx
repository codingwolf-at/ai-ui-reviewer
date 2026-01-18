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

    return (
        <button
            onClick={onClick}
            disabled={isDisabled}
            className="
        relative inline-flex items-center justify-center gap-2
        px-5 h-10 rounded-lg font-medium cursor-pointer
        bg-blue-600 text-white
        hover:bg-blue-500
        focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-offset-2 focus:ring-offset-gray-900
        disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:bg-blue-600
        transition-colors
      "
        >
            {loading ? (
                <>
                    <span className="opacity-90">{loadingText}</span>
                    <span className="flex items-center gap-1 ml-1">
                        <span className="w-2 h-2 bg-white rounded-full animate-bounce [animation-delay:-0.3s]" />
                        <span className="w-2 h-2 bg-white rounded-full animate-bounce [animation-delay:-0.15s]" />
                        <span className="w-2 h-2 bg-white rounded-full animate-bounce" />
                        <span className="w-2 h-2 bg-white rounded-full animate-bounce" />
                    </span>
                </>
            ) : (
                children
            )}
        </button>
    );
};

export default PrimaryButton;
