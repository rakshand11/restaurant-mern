export default function NewsLetter() {
    return (
        <>
            <style>{`
                @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700&display=swap');
                *{
        ont-family: 'Poppins', sans-serif;
                }
            `}</style>

            <div
                className=" bg-black relative w-full px-4 text-center text-white py-24 flex flex-col items-center justify-center bg-cover bg-center"
            >

                {/* Black overlay */}
                <div className="absolute inset-0 bg-black/70"></div>

                {/* Content */}
                <div className="relative z-10 flex flex-col items-center">

                    <p className="text-yellow-500 font-medium">
                        Stay Updated
                    </p>

                    <h1 className="max-w-lg font-semibold text-4xl mt-2 text-orange-400">
                        Never miss our delicious updates
                    </h1>

                    <p className="max-w-md mt-4 text-gray-400">
                        Subscribe to our newsletter to get updates about new dishes,
                        chef specials, and exclusive food offers delivered straight
                        to your inbox.
                    </p>

                    <div className="flex items-center justify-center mt-10 border border-slate-500 focus-within:outline focus-within:outline-indigo-500 text-sm rounded-full h-14 max-w-md w-full">
                        <input
                            type="email"
                            className="bg-transparent outline-none rounded-full px-4 h-full flex-1"
                            placeholder="Enter your email address"
                        />
                        <button className="bg-indigo-600 hover:bg-indigo-700 text-white rounded-full h-11 mr-1 px-8">
                            Subscribe
                        </button>
                    </div>

                    <p className="text-xs text-slate-400 mt-4">
                        We respect your privacy. No spam, only tasty updates.
                    </p>

                </div>
            </div>
        </>
    );
}