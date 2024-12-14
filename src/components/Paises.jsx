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
        <div className="h-full text-gray-200 w-full flex flex-col justify-center xl:mr-0 lg:mr-4">


            <section className="grid lg:grid-cols-5 gap-4 sm:grid-cols-4 border-gray-700 py-4 w-auto text-gray-600 font-bold sm:place-items-center lg:place-items-start sm:w-full ">
                <h2 className="xl:text-lg 2xl:text-xl lg:text-[17px] 2xl:ml-16 xl:ml-1 lg:ml-8 sm:mr-14 lg:mr-0">Flag</h2>
                <h2 className="xl:text-lg 2xl:text-xl lg:text-[17px] xl:ml-0 lg:ml-9">Name</h2>
                <h2 className="xl:text-lg 2xl:text-xl lg:text-[17px] xl:ml-6 lg:ml-16">Population</h2>
                <h2 className="xl:text-lg 2xl:text-xl lg:text-[17px] xl:ml-1 lg:ml-20 lg:w-28 ">Area (km²)</h2>
                <h2 className="xl:text-lg 2xl:text-xl lg:text-[17px] xl:flex  lg:hidden sm:hidden">Region</h2>
            </section>
            {visiblePaises.map((country, index) => (
                <section key={index} className="grid xl:grid-cols-5 lg:grid-cols-4 sm:grid-cols-4 gap-4 border-gray-700 py-4 w-[95%]">
                    <div className="flex items-center justify-center">
                        <img
                            src={country.flags.svg}
                            alt={`Flag of ${country.name.common}`}
                            className="w-20 h-16 object-cover rounded-xl"
                        />
                    </div>
                    <h3 className="flex items-center 2xl:text-2xl sm:w-40 lg:w-auto sm:ml-14 lg:ml-5 xl:text-xl lg:text-lg">{country.name.common}</h3>
                    <h3 className="flex items-center 2xl:text-2xl sm:w-40 lg:w-auto sm:pl-14 lg:pl-5 xl:text-xl lg:text-lg xl:ml-6 ">
                        {country.population.toLocaleString()}
                    </h3>
                    <h3 className="flex items-center 2xl:text-2xl sm:w-40 lg:w-auto sm:ml-14 lg:ml-5 xl:text-xl lg:text-lg">
                        {country.area?.toLocaleString()}
                    </h3>
                    <h3 className="flex items-center 2xl:text-2xl sm:w-40 lg:w-auto sm:pl-14  lg:text-xl xl:pl-11 xl:text-xl xl:flex lg:hidden sm:hidden">{country.region}</h3>
                </section>
            ))}
            {/* Div que se observa con IntersectionObserver */}
            <div ref={observerRef} className="h-50 bg-red w-full" />
        </div>
    );
};
