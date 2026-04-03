import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

interface Category {
    _id: string;
    name: string;
    image: string;
}

const Categories = () => {
    const [categories, setCategories] = useState<Category[]>([]);
    const navigate = useNavigate();

    useEffect(() => {
        let cancelled = false;

        axios
            .get("https://api.rakshand.site/category/get", { withCredentials: true })
            .then((res) => {
                if (!cancelled) setCategories(res.data?.category ?? []);
            })
            .catch((error) => {
                console.log(error);
            });

        return () => {
            cancelled = true;
        };
    }, []);

    const handleCategoryClick = (cat: Category) => {
        navigate(`/menu?category=${encodeURIComponent(cat._id)}`);
    };

    return (
        <div
            className="min-h-screen bg-[#0a0a0a] py-12 px-4"
            style={{ fontFamily: "'Montserrat', sans-serif" }}
        >
            {/* Import fonts */}
            <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,600;1,300;1,400&family=Montserrat:wght@300;400;500&display=swap');
      `}</style>

            <div className="max-w-5xl mx-auto text-center">
                {/* Header */}
                <p
                    style={{
                        fontSize: 10,
                        letterSpacing: "0.35em",
                        textTransform: "uppercase",
                        color: "#b8965a",
                        marginBottom: "0.5rem",
                    }}
                >
                    Explore Our Categories
                </p>

                <h1
                    style={{
                        fontFamily: "'Cormorant Garamond', serif",
                        fontSize: "2.25rem",
                        fontWeight: 300,
                        color: "#f5ead6",
                        margin: "0 auto 0.5rem",
                    }}
                >
                    Explore Our{" "}
                    <em style={{ color: "#c9a55a" }}>Categories</em>
                </h1>

                <p
                    style={{
                        fontSize: 12,
                        letterSpacing: "0.12em",
                        color: "#8a7e68",
                    }}
                >
                    Discover delicious dishes from our carefully curated categories
                </p>

                {/* Grid of categories */}
                <div
                    style={{
                        display: "grid",
                        gridTemplateColumns: "repeat(3, 1fr)",
                        gap: "1.5rem",
                        marginTop: "2rem",
                    }}
                    className="sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5"
                >
                    {categories.map((cat) => (
                        <div
                            key={cat._id}
                            className="cursor-pointer group relative"
                            onClick={() => handleCategoryClick(cat)}
                        >
                            {/* Circle image card */}
                            <div
                                style={{
                                    width: "clamp(6rem, 8vw, 8rem)",
                                    height: "clamp(6rem, 8vw, 8rem)",
                                    margin: "0 auto",
                                    borderRadius: "9999px",
                                    overflow: "hidden",
                                    border: "2px solid #3a3020",
                                    boxShadow: "0 0 0 1px rgba(58, 48, 32, 0.1), 0 6px 16px rgba(0, 0, 0, 0.3)",
                                    transition: "all 0.25s ease",
                                }}
                                className="group-hover:border-[#b8965a] group-hover:shadow-xl group-hover:scale-105"
                            >
                                <img
                                    src={cat.image}
                                    alt={cat.name}
                                    style={{
                                        width: "100%",
                                        height: "100%",
                                        objectFit: "cover",
                                        transition: "transform 0.3s ease",
                                    }}
                                    className="group-hover:scale-110"
                                />
                            </div>

                            {/* Overlay glow on hover (optional if you want) */}
                            <div
                                style={{
                                    position: "absolute",
                                    inset: 0,
                                    width: "clamp(6rem, 8vw, 8rem)",
                                    height: "clamp(6rem, 8vw, 8rem)",
                                    margin: "0 auto",
                                    borderRadius: "9999px",
                                    background:
                                        "radial-gradient(circle at center, rgba(184, 150, 90, 0.25), transparent 70%)",
                                    opacity: 0,
                                    transition: "opacity 0.3s ease",
                                }}
                                className="group-hover:opacity-100"
                            />

                            {/* Category name */}
                            <div
                                style={{
                                    marginTop: "0.75rem",
                                    color: "#8a7e68",
                                    fontWeight: 500,
                                    fontSize: 11,
                                    letterSpacing: "0.1em",
                                    textTransform: "uppercase",
                                }}
                                className="group-hover:text-[#b8965a] group-hover:font-semibold transition-colors"
                            >
                                {cat.name}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Categories;