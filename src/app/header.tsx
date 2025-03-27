export default function Header() {
    return (
        <>
            <div className="h-[64px] w-1"></div>
            <header className="p-4 backdrop-blur-lg bg-teal-500/20 text-teal-700 flex justify-between items-center fixed top-0 left-0 w-full z-50 shadow-md rounded-b-lg">
                {/* Logo */}
                <div className="flex items-center space-x-2">
                    <div className="w-6 h-6 bg-teal-500 rounded-md flex items-center justify-center">
                        <span className="text-white h-[20px] text-lg font-bold leading-none">+</span>
                    </div>
                    <h1 className="text-2xl font-bold tracking-wide">QuickMed</h1>
                </div>

                {/* Navigation */}
                <nav className="flex space-x-6">
                    <a href="/" className="hover:text-teal-600 transition-colors">Home</a>
                    <a href="/medical-stores" className="hover:text-teal-600 transition-colors">Medical Stores</a>
                </nav>
            </header>
        </>
    );
}
