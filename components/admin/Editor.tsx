"use strict";
"use client";

import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Image from "@tiptap/extension-image";
import Link from "@tiptap/extension-link";
import Placeholder from "@tiptap/extension-placeholder";
import { Bold, Italic, List, ListOrdered, Link as LinkIcon, Image as ImageIcon, Heading1, Heading2, Quote, Undo, Redo, Code, Strikethrough, Type } from "lucide-react";
import { useCallback } from "react";

interface EditorProps {
    value: string;
    onChange: (value: string) => void;
}

export function Editor({ value, onChange }: EditorProps) {
    const editor = useEditor({
        immediatelyRender: false,
        extensions: [
            StarterKit,
            Image,
            Link.configure({
                openOnClick: false,
                HTMLAttributes: {
                    class: 'text-blue-500 underline cursor-pointer',
                },
            }),
            Placeholder.configure({
                placeholder: 'Start writing your story...',
                showOnlyWhenEditable: true,
                showOnlyCurrent: false,
            }),
        ],
        content: value,
        editorProps: {
            attributes: {
                class: 'prose dark:prose-invert max-w-none focus:outline-none min-h-[300px] px-4 py-2',
            },
        },
        onUpdate: ({ editor }) => {
            const html = editor.getHTML();
            // Only save if there's actual content (not just empty paragraph tags)
            if (html === '<p></p>' || html === '') {
                onChange('');
            } else {
                onChange(html);
            }
        },
    });

    const setLink = useCallback(() => {
        if (!editor) return;
        const previousUrl = editor.getAttributes('link').href;
        const url = window.prompt('URL', previousUrl);

        // cancelled
        if (url === null) return;

        // empty
        if (url === '') {
            editor.chain().focus().extendMarkRange('link').unsetLink().run();
            return;
        }

        // update
        editor.chain().focus().extendMarkRange('link').setLink({ href: url }).run();
    }, [editor]);

    const addImage = useCallback(() => {
        if (!editor) return;
        const url = window.prompt('Image URL');

        if (url) {
            editor.chain().focus().setImage({ src: url }).run();
        }
    }, [editor]);

    if (!editor) {
        return null;
    }

    return (
        <div className="border border-gray-300 dark:border-gray-700 rounded-md overflow-hidden bg-white dark:bg-gray-900">
            {/* Toolbar */}
            <div className="flex flex-wrap items-center gap-1 p-2 border-b border-gray-200 dark:border-gray-800 bg-gray-50 dark:bg-gray-800">
                <ToolbarButton
                    onClick={() => editor.chain().focus().setParagraph().run()}
                    isActive={editor.isActive('paragraph')}
                >
                    <Type className="w-4 h-4" />
                </ToolbarButton>
                <ToolbarButton
                    onClick={() => {
                        if (editor.isActive('heading', { level: 2 })) {
                            editor.chain().focus().setParagraph().run();
                        } else {
                            editor.chain().focus().toggleHeading({ level: 2 }).run();
                        }
                    }}
                    isActive={editor.isActive('heading', { level: 2 })}
                >
                    <Heading1 className="w-4 h-4" />
                </ToolbarButton>
                <ToolbarButton
                    onClick={() => {
                        if (editor.isActive('heading', { level: 3 })) {
                            editor.chain().focus().setParagraph().run();
                        } else {
                            editor.chain().focus().toggleHeading({ level: 3 }).run();
                        }
                    }}
                    isActive={editor.isActive('heading', { level: 3 })}
                >
                    <Heading2 className="w-4 h-4" />
                </ToolbarButton>

                <div className="w-px h-6 bg-gray-300 dark:bg-gray-600 mx-1" />

                <ToolbarButton
                    onClick={() => editor.chain().focus().toggleBold().run()}
                    isActive={editor.isActive('bold')}
                >
                    <Bold className="w-4 h-4" />
                </ToolbarButton>
                <ToolbarButton
                    onClick={() => editor.chain().focus().toggleItalic().run()}
                    isActive={editor.isActive('italic')}
                >
                    <Italic className="w-4 h-4" />
                </ToolbarButton>
                <ToolbarButton
                    onClick={() => editor.chain().focus().toggleStrike().run()}
                    isActive={editor.isActive('strike')}
                >
                    <Strikethrough className="w-4 h-4" />
                </ToolbarButton>

                <div className="w-px h-6 bg-gray-300 dark:bg-gray-600 mx-1" />

                <ToolbarButton
                    onClick={() => editor.chain().focus().toggleBulletList().run()}
                    isActive={editor.isActive('bulletList')}
                >
                    <List className="w-4 h-4" />
                </ToolbarButton>
                <ToolbarButton
                    onClick={() => editor.chain().focus().toggleOrderedList().run()}
                    isActive={editor.isActive('orderedList')}
                >
                    <ListOrdered className="w-4 h-4" />
                </ToolbarButton>
                <ToolbarButton
                    onClick={() => editor.chain().focus().toggleBlockquote().run()}
                    isActive={editor.isActive('blockquote')}
                >
                    <Quote className="w-4 h-4" />
                </ToolbarButton>
                <ToolbarButton
                    onClick={() => editor.chain().focus().toggleCodeBlock().run()}
                    isActive={editor.isActive('codeBlock')}
                >
                    <Code className="w-4 h-4" />
                </ToolbarButton>

                <div className="w-px h-6 bg-gray-300 dark:bg-gray-600 mx-1" />

                <ToolbarButton
                    onClick={setLink}
                    isActive={editor.isActive('link')}
                >
                    <LinkIcon className="w-4 h-4" />
                </ToolbarButton>
                <ToolbarButton
                    onClick={addImage}
                    isActive={false}
                >
                    <ImageIcon className="w-4 h-4" />
                </ToolbarButton>

                <div className="w-px h-6 bg-gray-300 dark:bg-gray-600 mx-1 ml-auto" />

                <ToolbarButton
                    onClick={() => editor.chain().focus().undo().run()}
                    isActive={false}
                    disabled={!editor.can().undo()}
                >
                    <Undo className="w-4 h-4" />
                </ToolbarButton>
                <ToolbarButton
                    onClick={() => editor.chain().focus().redo().run()}
                    isActive={false}
                    disabled={!editor.can().redo()}
                >
                    <Redo className="w-4 h-4" />
                </ToolbarButton>
            </div>

            {/* Content */}
            <EditorContent editor={editor} />
        </div>
    );
}

function ToolbarButton({
    children,
    onClick,
    isActive,
    disabled = false
}: {
    children: React.ReactNode;
    onClick: () => void;
    isActive: boolean;
    disabled?: boolean;
}) {
    return (
        <button
            type="button"
            onClick={onClick}
            disabled={disabled}
            className={`p-2 rounded hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors ${isActive ? 'bg-gray-200 dark:bg-gray-700 text-black dark:text-white' : 'text-gray-500 dark:text-gray-400'
                } ${disabled ? 'opacity-50 cursor-not-allowed' : ''}`}
        >
            {children}
        </button>
    );
}
