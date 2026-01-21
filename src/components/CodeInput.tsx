"use client";

type CodeInputProps = {
    value: string,
    onChange: (value: string) => void,
    disabled?: boolean,
    onSubmitShortcut?: () => void
};

const CodeInput = ({ value, onChange, disabled, onSubmitShortcut }: CodeInputProps) => {
    return (
        <textarea
            value={value}
            onChange={(e) => onChange(e.target.value)}
            placeholder="Paste JSX, HTML, or CSS here..."
            className={`bg-(--input-bg) text-gray-200 placeholder:text-gray-500 rounded-lg p-4 h-80 resize-none focus:outline-none focus:ring-1 focus:ring-white/10 ${disabled ? "opacity-60 cursor-not-allowed" : ""}`}
            disabled={disabled}
            onKeyDown={(e) => {
                if ((e.metaKey || e.ctrlKey) && e.key === "Enter") {
                    e.preventDefault();
                    onSubmitShortcut?.();
                }
            }}
        />
    );
};

export default CodeInput;