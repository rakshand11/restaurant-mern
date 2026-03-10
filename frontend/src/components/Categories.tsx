
import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

interface Category {
    _id: string;
    name: string;
    image: string;
}

const Categories = () => {
    const [category, setCategory] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        let cancelled = false;


        axios.get("http://localhost:3000/category/get", { withCredentials: true })
            .then((res) => {
                if (!cancelled) setCategory(res.data.category ?? []);
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
        <section className="py-16 bg-black">
            <div className="container mx-auto px-4 text-center">
                <h2 className="text-4xl font-bold mb-4 text-orange-400">
                    {" "}
                    Explore Our <span className="text-yellow-500">Categories</span>
                </h2>
                <p className="text-white"> Discover delicious dishes from our carefully curated categories</p>
                <div className="grid grid-cols-3 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-8 mt-4">
                    {category.map((cat) => (
                        <div
                            key={cat._id}
                            className="cursor-pointer group"
                            onClick={() => handleCategoryClick(cat)}
                        >
                            <div className="relative">
                                <div className="w-32 h-32 mx-auto rounded-full overflow-hidden shadow-lg border-4 border-white group-hover:border-yellow-400 transition-all duration-300 group-hover:scale-110 group-hover:shadow-2xl">
                                    <img
                                        src={cat.image}
                                        alt=""
                                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                                    />
                                </div>
                                <div className="absolute inset-0 w-32 h-32 mx-auto rounded-full bg-linear-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                            </div>
                            <div className="mt-4">
                                <h3 className="font-semibold text-gray-400 group-hover:text-yellow-500 transition-colors duration-300">
                                    {cat.name}
                                </h3>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};
export default Categories;