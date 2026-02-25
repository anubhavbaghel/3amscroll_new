import { Metadata } from 'next';
import { WorkflowDashboard } from '@/components/workflow/WorkflowDashboard';

export const metadata: Metadata = {
    title: 'Content Workflow Dashboard - 3AM SCROLL',
    description: 'Internal prompt engine and publishing dashboard.',
};

export default function WorkflowPage() {
    return (
        <div className="min-h-screen bg-gray-50 dark:bg-black pt-24 pb-12">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="mb-8">
                    <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
                        Content Production Workflow
                    </h1>
                    <p className="text-gray-600 dark:text-gray-400">
                        The 5-stage automated prompt engine for generating high-quality, Gen-Z optimized articles.
                    </p>
                </div>

                {/* The main dashboard that manages state between stages */}
                <WorkflowDashboard />
            </div>
        </div>
    );
}
