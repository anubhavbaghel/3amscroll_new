"use strict";
"use client";

import { createClient } from "@/lib/supabase/client";
import { UploadCloud, X } from "lucide-react";
import Image from "next/image";
import { useCallback, useState } from "react";
import { toast } from "sonner";

interface ImageUploadProps {
    value?: string;
    onChange: (url: string) => void;
    disabled?: boolean;
}

export function ImageUpload({ value, onChange, disabled }: ImageUploadProps) {
    const [isUploading, setIsUploading] = useState(false);
    const supabase = createClient();

    const handleUpload = useCallback(async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;

        setIsUploading(true);
        const fileExt = file.name.split('.').pop();
        const fileName = `${Math.random()}.${fileExt}`;
        const filePath = `${fileName}`;

        try {
            const { error: uploadError } = await supabase.storage
                .from('article-images')
                .upload(filePath, file);

            if (uploadError) {
                throw uploadError;
            }

            const { data } = supabase.storage
                .from('article-images')
                .getPublicUrl(filePath);

            onChange(data.publicUrl);
            toast.success("Image uploaded successfully");
        } catch (error) {
            console.error(error);
            toast.error("Error uploading image");
        } finally {
            setIsUploading(false);
        }
    }, [onChange, supabase.storage]);

    const handleRemove = useCallback((e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        onChange("");
    }, [onChange]);

    return (
        <div className="space-y-4 w-full flex flex-col justify-center items-center">
            <div className="flex flex-col items-center justify-center w-full">
                {value ? (
                    <div className="relative w-full h-64 rounded-lg overflow-hidden">
                        <div className="z-10 absolute top-2 right-2">
                            <button
                                type="button"
                                onClick={handleRemove}
                                className="bg-red-500 text-white p-1 rounded-full hover:bg-red-600 transition"
                            >
                                <X className="h-4 w-4" />
                            </button>
                        </div>
                        <Image
                            fill
                            className="object-cover"
                            alt="Cover Image"
                            src={value}
                        />
                    </div>
                ) : (
                    <label className="flex flex-col items-center justify-center w-full h-64 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-bray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600">
                        <div className="flex flex-col items-center justify-center pt-5 pb-6">
                            <UploadCloud className="w-8 h-8 mb-4 text-gray-500 dark:text-gray-400" />
                            <p className="mb-2 text-sm text-gray-500 dark:text-gray-400">
                                <span className="font-semibold">Click to upload</span> or drag and drop
                            </p>
                            <p className="text-xs text-gray-500 dark:text-gray-400">
                                SVG, PNG, JPG or GIF (max. 5MB)
                            </p>
                        </div>
                        <input
                            id="dropzone-file"
                            type="file"
                            className="hidden"
                            accept="image/*"
                            onChange={handleUpload}
                            disabled={disabled || isUploading}
                        />
                    </label>
                )}
            </div>
            {isUploading && (
                <div className="text-sm text-blue-500 animate-pulse">
                    Uploading...
                </div>
            )}
        </div>
    );
}
