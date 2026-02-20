import Link from "next/link";
import { ChevronRight, Home } from "lucide-react";

interface BreadcrumbItem {
    label: string;
    href: string;
    active?: boolean;
}

interface BreadcrumbsProps {
    items: BreadcrumbItem[];
}

export function Breadcrumbs({ items }: BreadcrumbsProps) {
    return (
        <nav aria-label="Breadcrumb" className="flex items-center space-x-2 text-sm text-gray-500 dark:text-gray-400 mb-6 font-medium">
            <Link
                href="/"
                className="hover:text-brand transition-colors flex items-center gap-1"
            >
                <Home className="w-4 h-4" />
                <span className="sr-only">Home</span>
            </Link>

            {items.map((item, index) => (
                <div key={item.href} className="flex items-center space-x-2">
                    <ChevronRight className="w-4 h-4 text-gray-300 dark:text-gray-600" />
                    {item.active ? (
                        <span className="text-gray-900 dark:text-white font-semibold truncate max-w-[200px] sm:max-w-md">
                            {item.label}
                        </span>
                    ) : (
                        <Link
                            href={item.href}
                            className="hover:text-brand transition-colors whitespace-nowrap"
                        >
                            {item.label}
                        </Link>
                    )}
                </div>
            ))}
        </nav>
    );
}
