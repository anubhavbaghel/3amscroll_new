import { Footer } from "@/components/layout/Footer";
import { ContactForm } from "@/components/contact/ContactForm";
import { Mail, MapPin, MessageCircle } from "lucide-react";

export default function ContactPage() {
    return (
        <div className="min-h-screen bg-white dark:bg-black">

            <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-20">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-24">
                    {/* Left Column: Info */}
                    <div>
                        <h1 className="text-4xl md:text-5xl font-bold mb-6 font-display">Get in Touch</h1>
                        <p className="text-xl text-gray-600 dark:text-gray-400 mb-12">
                            Have a story to pitch? Found a bug? Or just want to say hi? We&apos;d love to hear from you.
                        </p>

                        <div className="space-y-8">
                            <div className="flex items-start gap-4">
                                <div className="p-3 bg-blue-50 dark:bg-blue-900/20 rounded-xl text-blue-600 dark:text-blue-400">
                                    <Mail className="w-6 h-6" />
                                </div>
                                <div>
                                    <h3 className="font-bold text-lg mb-1">Email Us</h3>
                                    <p className="text-gray-600 dark:text-gray-400">hello@3amscroll.com</p>
                                    <p className="text-gray-500 text-sm mt-1">We usually reply within 24 hours.</p>
                                </div>
                            </div>

                            <div className="flex items-start gap-4">
                                <div className="p-3 bg-blue-50 dark:bg-blue-900/20 rounded-xl text-blue-600 dark:text-blue-400">
                                    <MessageCircle className="w-6 h-6" />
                                </div>
                                <div>
                                    <h3 className="font-bold text-lg mb-1">Socials</h3>
                                    <p className="text-gray-600 dark:text-gray-400">@3amscroll everywhere</p>
                                    <div className="flex gap-4 mt-2">
                                        <a href="#" className="text-gray-400 hover:text-blue-500 transition-colors">Twitter</a>
                                        <a href="#" className="text-gray-400 hover:text-pink-500 transition-colors">Instagram</a>
                                        <a href="#" className="text-gray-400 hover:text-blue-700 transition-colors">LinkedIn</a>
                                    </div>
                                </div>
                            </div>

                            <div className="flex items-start gap-4">
                                <div className="p-3 bg-blue-50 dark:bg-blue-900/20 rounded-xl text-blue-600 dark:text-blue-400">
                                    <MapPin className="w-6 h-6" />
                                </div>
                                <div>
                                    <h3 className="font-bold text-lg mb-1">Location</h3>
                                    <p className="text-gray-600 dark:text-gray-400">
                                        Remote-First<br />
                                        HQ in San Francisco, CA
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Right Column: Form */}
                    <div className="bg-white dark:bg-gray-950 rounded-3xl p-6 md:p-8 border border-gray-100 dark:border-gray-800 shadow-xl shadow-gray-200/50 dark:shadow-none">
                        <ContactForm />
                    </div>
                </div>
            </main>

            <Footer />
        </div>
    );
}
