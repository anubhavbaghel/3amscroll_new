import { useState, useRef } from "react";
import { WorkflowData } from "./WorkflowDashboard";
import { Copy, CheckCircle2, Upload, Loader2, Image as ImageIcon } from "lucide-react";
import { optimizeImage } from "@/lib/image-optimizer";
import { createClient } from "@/lib/supabase/client";

interface Props {
    data: WorkflowData;
    updateData: (updates: Partial<WorkflowData>) => void;
}

export function Stage4ImageGen({ data, updateData }: Props) {
    const [copied, setCopied] = useState(false);
    const [isUploading, setIsUploading] = useState(false);
    const [uploadStatus, setUploadStatus] = useState<string>("");
    const fileInputRef = useRef<HTMLInputElement>(null);

    // The highly engineered Prompt 4: The Image Prompt
    const generatePrompt = () => `Generate a highly cinematic, ultra-aesthetic cover image for an article titled "${data.workingTitle}".

**STYLE GUIDE:**
- Visual Vibe: "3AM SCROLL"
- Lighting: Moody, glowing neon accents, high contrast, cinematic soft lighting.
- Palette: Deep blacks, rich grays, paired with electric lime green or cyber-purple accents.
- Composition: Editorial, minimalist, slightly glassmorphic. Must look incredibly premium, like a high-end tech/lifestyle magazine.
- Important: Absolutely NO text, NO words, and NO letters anywhere in the image.

**SUBJECT MATTER:**
Create an abstract but relatable visualization of: ${data.seoKeyword}`;

    const handleCopy = () => {
        navigator.clipboard.writeText(generatePrompt());
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;

        try {
            setIsUploading(true);
            setUploadStatus("Optimizing image locally... (Converting to WebP)");

            // 1. Optimize the image in the browser first
            const optimizedFile = await optimizeImage(file, 1200, 0.85);

            setUploadStatus("Uploading to Supabase Storage...");

            // 2. Upload to Supabase Storage
            const supabase = createClient();
            const fileName = `article-covers/${Date.now()}-${optimizedFile.name}`;

            const { data: uploadData, error: uploadError } = await supabase.storage
                .from('images') // Assumes a standard 'images' public bucket exists
                .upload(fileName, optimizedFile);

            if (uploadError) {
                console.error("Supabase Upload Error:", uploadError);
                // Fallback: if bucket error, inform user to create it
                if (uploadError.message.includes("Bucket not found")) {
                    alert("Upload failed: The 'images' storage bucket does not exist in your Supabase project. Please create a public bucket named 'images'.");
                } else {
                    alert("Upload failed: " + uploadError.message);
                }
                setIsUploading(false);
                return;
            }

            // 3. Get the public URL
            const { data: { publicUrl } } = supabase.storage
                .from('images')
                .getPublicUrl(fileName);

            updateData({ imageUrl: publicUrl });
            setUploadStatus("Optimization & Upload Complete!");

            setTimeout(() => {
                setIsUploading(false);
                setUploadStatus("");
            }, 2000);

        } catch (error) {
            console.error("Image processing error:", error);
            alert("Failed to process and upload image.");
            setIsUploading(false);
            setUploadStatus("");
        }
    };

    return (
        <div className="space-y-8 animate-fade-in">
            <div>
                <h2 className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-500 to-pink-500 mb-2">Stage 4: The Designer</h2>
                <p className="text-gray-400">Generate a stunning, cohesive cover image for your article.</p>
            </div>

            {/* Step 1: The Generated Prompt */}
            <div className="space-y-3 animate-fade-in-up">
                <div className="flex justify-between items-end">
                    <label className="block text-sm font-medium text-gray-300">1. Copy this Designer Prompt into Midjourney, DALL-E 3, or Replicate:</label>
                    <button
                        onClick={handleCopy}
                        className="flex items-center space-x-2 text-sm text-purple-400 hover:text-purple-300 transition-colors px-3 py-1 rounded-full bg-purple-500/10"
                    >
                        {copied ? <CheckCircle2 className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                        <span>{copied ? "Copied!" : "Copy Image Prompt"}</span>
                    </button>
                </div>
                <div className="relative group">
                    <div className="absolute inset-0 bg-gradient-to-r from-purple-500/20 to-pink-500/20 rounded-xl blur opacity-50 group-hover:opacity-100 transition duration-500"></div>
                    <pre className="relative bg-black/80 border border-white/10 text-gray-300 p-6 rounded-xl overflow-x-auto whitespace-pre-wrap text-sm leading-relaxed font-mono">
                        {generatePrompt()}
                    </pre>
                </div>
            </div>

            {/* Step 2: Handoff / Uploader Mockup */}
            <div className="space-y-4 pt-6 border-t border-white/5">
                <label className="block text-sm font-medium text-gray-300">2. Upload your generated image (Auto-Optimized via WebP Engine):</label>

                <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center">
                    <input
                        type="file"
                        accept="image/jpeg, image/png, image/webp"
                        className="hidden"
                        ref={fileInputRef}
                        onChange={handleImageUpload}
                        disabled={isUploading}
                    />

                    <button
                        onClick={() => fileInputRef.current?.click()}
                        disabled={isUploading}
                        className={`flex items-center space-x-2 px-6 py-3 rounded-xl font-medium transition-all ${isUploading
                            ? "bg-gray-800 text-gray-500 cursor-not-allowed"
                            : "bg-white/10 hover:bg-white/20 text-white border border-white/20 hover:border-brand"
                            }`}
                    >
                        {isUploading ? <Loader2 className="w-5 h-5 animate-spin" /> : <Upload className="w-5 h-5" />}
                        <span>{isUploading ? "Processing..." : "Upload Cover Image"}</span>
                    </button>

                    {uploadStatus && (
                        <div className="text-sm text-brand flex items-center space-x-2">
                            <span className="animate-pulse">{uploadStatus}</span>
                        </div>
                    )}
                </div>

                <div className="relative pt-2">
                    <div className="absolute inset-0 flex items-center">
                        <div className="w-full border-t border-white/10"></div>
                    </div>
                    <div className="relative flex justify-center text-sm">
                        <span className="px-2 bg-dark-background text-gray-500">OR manually paste URL</span>
                    </div>
                </div>

                <div className="space-y-2">
                    <input
                        type="url"
                        value={data.imageUrl}
                        onChange={(e) => updateData({ imageUrl: e.target.value })}
                        placeholder="https://... (URL to image)"
                        className="w-full bg-white dark:bg-dark-background/50 border border-gray-200 dark:border-white/10 rounded-xl px-4 py-3 text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-500 font-mono text-sm"
                    />
                </div>

                {data.imageUrl && (
                    <div className="mt-4 border border-white/10 rounded-xl overflow-hidden bg-black/50 aspect-video relative">
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img
                            src={data.imageUrl}
                            alt="Cover preview"
                            className="object-cover w-full h-full opacity-80"
                            onError={(e) => (e.currentTarget.style.display = 'none')}
                        />
                    </div>
                )}
            </div>
        </div>
    );
}
