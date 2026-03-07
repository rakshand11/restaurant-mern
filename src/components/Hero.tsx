
import { useNavigate } from "react-router-dom";

const Hero = () => {
  const navigate = useNavigate()
  return (
    <section
      className="relative h-[90vh] flex items-center justify-center bg-center bg-cover"
      style={{
        backgroundImage:
          "url('https://images.unsplash.com/photo-1600891964599-f61ba0e24092?auto=format&fit=crop&w=1600&q=80')",
      }}
    >
      {/* Overlay */}
      <div className="absolute inset-0 bg-black/60"></div>

      {/* Content */}
      <div className="relative z-10 text-center text-white px-4">
        <h1 className="text-4xl md:text-6xl font-bold mb-4">
          Welcome to Our Restaurant
        </h1>
        <p className="text-lg md:text-xl mb-8 max-w-2xl mx-auto">
          {" "}
          Experience the taste of perfection — where every bite tells a story.
        </p>

        <div className="flex flex-col sm:flex-row justify-center gap-4">
          <button
            onClick={() => navigate("/menu")}
            className="cursor-pointer bg-orange-500 hover:bg-orange-600 text-black font-semibold px-6 py-3 rounded-full transition-all duration-300"
          >
            All Menus
          </button>
          <button
            onClick={() => navigate("/book-table")}
            className="cursor-pointer bg-transparent border-white  hover:bg-white hover:text-black font-semibold px-6 py-3 rounded-full transition-all duration-300"
          >
            Book a Table
          </button>
        </div>
      </div>
    </section>
  );
};
export default Hero;
