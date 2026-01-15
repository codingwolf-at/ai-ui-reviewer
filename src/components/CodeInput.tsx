"use client";

type CodeInputProps = {
    value: string,
    onChange: (value: string) => void,
    disabled?: boolean
};

const CodeInput = ({ value, onChange, disabled }: CodeInputProps) => {
    return (
        <textarea
            value={value}
            onChange={(e) => onChange(e.target.value)}
            placeholder="Paste JSX, HTML, or CSS here..."
            className={`w-full min-h-[200px] rounded-md bg-gray-900 border border-gray-800 p-4 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 ${disabled ? "opacity-60 cursor-not-allowed" : ""}`}
            disabled={disabled}
        />
    );
};

export default CodeInput;