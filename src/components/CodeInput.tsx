"use client";

type CodeInputProps = {
    value: string,
    onChange: (value: string) => void,
    disabled?: boolean,
    onSubmitShortcut?: () => void
};

const CodeInput = ({ value, onChange, disabled, onSubmitShortcut }: CodeInputProps) => {

    const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
        if ((e.metaKey || e.ctrlKey) && e.key === "Enter" && value.length) {
            e.preventDefault();
            onSubmitShortcut?.();
        }
    }

    return (
        <textarea
            value={value}
            onChange={(e) => onChange(e.target.value)}
            placeholder="Paste your UI code (JSX, HTML, or CSS only) here..."
            className={`bg-(--input-bg) text-gray-200 placeholder:text-gray-500 rounded-lg p-4 h-80 resize-none focus:outline-none focus:ring-1 focus:ring-white/10 ${disabled ? "opacity-60 cursor-not-allowed" : ""}`}
            disabled={disabled}
            onKeyDown={handleKeyDown}
        />
    );
};

export default CodeInput;