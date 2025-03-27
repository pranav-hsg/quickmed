import React from 'react';

export default function HomePage() {
    return (
        <div className="min-h-screen bg-gray-50 flex flex-col">
            {/* Glassy Header */}
            <header className="p-4 backdrop-blur-lg bg-teal-500/20 text-teal-700 flex justify-between items-center fixed top-0 left-0 w-full z-50 shadow-md rounded-b-lg">
                <div className="flex items-center space-x-2">
                    <div className="w-8 h-8 bg-teal-500 rounded-md flex items-center justify-center p-1">
                        <span className="text-white text-base font-bold leading-none">+</span>
                    </div>
                    <h1 className="text-2xl font-bold tracking-wide">QuickMed</h1>
                </div>
                <nav className="flex space-x-6">
                    <a href="/" className="hover:text-teal-600 transition-colors">
                        Home
                    </a>
                    <a href="/medical-stores" className="hover:text-teal-600 transition-colors">
                        Medical Stores
                    </a>
                </nav>
            </header>

            {/* Main Hero Section */}
            <main className="flex-grow flex items-center justify-center mt-20 px-4">
                <div className="text-center max-w-2xl">
                    <h2 className="text-4xl font-extrabold text-teal-700 mb-4">
                        Your Health, Our Priority
                    </h2>
                    <p className="text-lg text-gray-700 mb-8">
                        QuickMed helps people in remote locations quickly search for nearby medical stores.
                        Once you select a store, you'll be guided to enter your symptoms or disease details,
                        and then receive personalized medicine suggestions tailored just for you.
                    </p>
                    <a
                        href="/medical-stores"
                        className="px-6 py-3 bg-teal-500 text-white rounded-md shadow hover:bg-teal-600 transition-colors"
                    >
                        Find Medical Stores Near You
                    </a>
                </div>
            </main>

            {/* Footer */}
            <footer className="p-4 text-center text-gray-600">
                &copy; {new Date().getFullYear()} QuickMed. All rights reserved.
            </footer>
        </div>
    );
}
