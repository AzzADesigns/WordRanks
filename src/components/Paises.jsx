import { useEffect, useState } from "react";
import axios from "axios";
import { useIntersectionObserver } from "../hooks/useIntersectionObserver";

export const Paises = () => {
    const [allPaises, setAllPaises] = useState([]);
    const [visiblePaises, setVisiblePaises] = useState([]);
    const [page, setPage] = useState(1);
    const ITEMS_PER_PAGE = 10;

    const { ref: observerRef, isIntersecting } = useIntersectionObserver({
        threshold: 1.0,
    });

    useEffect(() => {
        axios
            .get("https://restcountries.com/v3.1/all")
            .then((response) => {
                setAllPaises(response.data);
                setVisiblePaises(response.data.slice(0, ITEMS_PER_PAGE));
            })
            .catch((error) => {
                console.error("Error fetching countries:", error);
            });
    }, []);

    useEffect(() => {
        if (isIntersecting) {
            setPage((prevPage) => prevPage + 1);
        }
    }, [isIntersecting]);

    useEffect(() => {
        const start = (page - 1) * ITEMS_PER_PAGE;
        const end = start + ITEMS_PER_PAGE;
        setVisiblePaises((prev) => [...prev, ...allPaises.slice(start, end)]);
    }, [page, allPaises]);

    return (
        <div className="h-full font-outfit text-gray-200 w-full xl:ml-0">
            <section className="grid grid-cols-5 gap-4  border-gray-700 py-4 w-[95%] text-gray-600 font-bold ml-4">
                <div className="absolute xl:bottom-[370px] lg:bottom-[960px] xl:right-[159px] xl:w-[59%] lg:w-[54.5%] h-[1px] bg-gray-700"></div>
                <h2 className="xl:text-xl xl:ml-16 lg:ml-5">Flag</h2>
                <h2 className="xl:text-xl xl:ml-0 lg:ml-9">Name</h2>
                <h2 className="xl:text-xl xl:ml-6 lg:ml-20">Population</h2>
                <h2 className="xl:text-xl xl:ml-6 lg:ml-28 xl:w-28 lg:w-28">Area (km²)</h2>
                <h2 className="xl:text-xl xl:flex lg:hidden">Region</h2>
            </section>
            {visiblePaises.map((country, index) => (
                <section key={index} className="grid xl:grid-cols-5 lg:grid-cols-4 gap-4 border-gray-700 py-4 w-[95%]">
                    <div className="flex items-center justify-center">
                        <img
                            src={country.flags.svg}
                            alt={`Flag of ${country.name.common}`}
                            className="w-20 h-16 object-cover rounded-xl"
                        />
                    </div>
                    <h3 className="flex items-center xl:pl-4 lg:pl-5 xl:text-2xl">{country.name.common}</h3>
                    <h3 className="flex items-center xl:pl-4 lg:pl-5 xl:text-2xl xl:ml-6 lg:ml-4">
                        {country.population.toLocaleString()}
                    </h3>
                    <h3 className="flex items-center xl:pl-4 lg:ml-10 xl:text-2xl">
                        {country.area?.toLocaleString()}
                    </h3>
                    <h3 className="flex items-center xl:pl-4 xl:text-2xl xl:flex lg:hidden">{country.region}</h3>
                </section>
            ))}
            {/* Div que se observa con IntersectionObserver */}
            <div ref={observerRef} className="h-50 bg-red w-full" />
        </div>
    );
};
