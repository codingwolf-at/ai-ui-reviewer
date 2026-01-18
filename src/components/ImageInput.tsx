"use client";

type ImageInputProps = {
    onSelect: (file: File) => void;
    disabled?: boolean;
};

const ImageInput = ({ onSelect, disabled }: ImageInputProps) => {
    return (
        <label className="flex flex-col items-center justify-center border border-dashed border-gray-700 rounded-lg p-8 cursor-pointer hover:border-gray-500 transition-colors">
            <input
                type="file"
                accept="image/*"
                hidden
                disabled={disabled}
                onChange={(e) => {
                    const file = e.target.files?.[0];
                    if (file) onSelect(file);
                }}
            />

            <p className="text-sm text-gray-400">
                Click to upload UI screenshot
            </p>
        </label>
    );
};

export default ImageInput;