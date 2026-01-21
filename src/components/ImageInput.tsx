"use client";

import { useEffect, useMemo } from "react";

type ImageInputProps = {
    selectedFile: File | null;
    onSelect: (file: File | null) => void;
    disabled?: boolean;
};

const ImageInput = ({ selectedFile, onSelect, disabled }: ImageInputProps) => {

    const previewUrl = useMemo(() => {
        if (!selectedFile) return null;
        return URL.createObjectURL(selectedFile);
    }, [selectedFile]);

    useEffect(() => {
        return () => {
            if (previewUrl) {
                URL.revokeObjectURL(previewUrl);
            }
        };
    }, [previewUrl]);

    if (!selectedFile && !previewUrl) {
        return (
            <label
                className="flex h-80 flex-col items-center justify-center border border-dashed border-gray-700 rounded-lg p-8 cursor-pointer hover:border-gray-500 transition-colors"
                aria-label="Upload UI screenshot"
            >
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
    } else {
        return (
            <div className="flex flex-col items-center justify-center border border-gray-700 rounded-lg p-8 space-y-4 hover:border-gray-500 transition-colors">
                {previewUrl ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img
                        src={previewUrl}
                        alt="UI preview"
                        className="w-full rounded-md max-h-[400px] object-contain"
                    />

                ) : (
                    <p className="text-sm text-gray-400">
                        There is some problem with the uploaded image file
                    </p>
                )}
            </div>
        );
    }
};

export default ImageInput;