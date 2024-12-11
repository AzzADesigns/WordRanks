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
        <div className="h-full font-outfit text-gray-200 w-full">
            <div className="grid grid-cols-5 gap-4  border-gray-700 py-4 w-[95%] text-gray-600 font-bold ml-4">
            <div className="absolute bottom-[370px] right-[146px] w-[59.5%] h-[1px] bg-gray-700"></div>
                <div className="text-xl ml-16">Flag</div>
                <div className="text-xl">Name</div>
                <div className="text-xl ml-6">Population</div>
                <div className="text-xl">Area (km²)</div>
                <div className="text-xl">Region</div>
            </div>
            {visiblePaises.map((country, index) => (
                <div key={index} className="grid grid-cols-5 gap-4 border-gray-700 py-4 w-[95%]">
                    <div className="flex items-center justify-center">
                        <img
                            src={country.flags.svg}
                            alt={`Flag of ${country.name.common}`}
                            className="w-20 h-16 object-cover rounded-xl"
                        />
                    </div>
                    <div className="flex items-center pl-4 text-2xl">{country.name.common}</div>
                    <div className="flex items-center pl-4 text-2xl ml-6">
                        {country.population.toLocaleString()}
                    </div>
                    <div className="flex items-center pl-4 text-2xl">
                        {country.area?.toLocaleString()}
                    </div>
                    <div className="flex items-center pl-4 text-2xl">{country.region}</div>
                </div>
            ))}
            {/* Div que se observa con IntersectionObserver */}
            <div ref={observerRef} className="h-50 bg-red w-full" />
        </div>
    );
};
