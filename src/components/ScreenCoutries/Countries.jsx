import { useContext, useState, useEffect, useRef } from "react";
import CountryContext from "../../context/CountryContext";

export const Countries = ({ countries }) => {
    const [visibleCountries, setVisibleCountries] = useState([]);
    const [loading, setLoading] = useState(false);
    const { setSelectedCountry } = useContext(CountryContext);
    const loaderRef = useRef(null);

    useEffect(() => {
        setVisibleCountries(countries.slice(0, 10));
    }, [countries]);

    const handleClick = (country) => {
        setSelectedCountry(country);
    };

    const loadMoreCountries = () => {
        if (loading) return; 

        setLoading(true);
        const nextCountries = countries.slice(visibleCountries.length, visibleCountries.length + 10);
        setVisibleCountries((prev) => [...prev, ...nextCountries]);

        setLoading(false);
    };

    const handleScroll = () => {
        const bottom = loaderRef.current.getBoundingClientRect().bottom <= window.innerHeight;
        if (bottom) {
            loadMoreCountries();
        }
    };

    useEffect(() => {
        window.addEventListener("scroll", handleScroll);
        return () => {
            window.removeEventListener("scroll", handleScroll);
        };
    }, [visibleCountries, loading]);

    return (
        <div className="h-full text-gray-200 w-full flex flex-col justify-center xl:mr-0 lg:mr-4">
            <section className="grid grid-cols-4 lg:grid-cols-5 gap-4 sm:grid-cols-4 border-gray-700 py-4 w-auto text-gray-600 font-bold sm:place-items-center lg:place-items-start sm:w-full 
                text-xs sm:text-base xl:text-lg 2xl:text-xl lg:text-[17px] mt-9 sm:mt-0">
                <h2 className="2xl:ml-20 xl:ml-1 lg:ml-8 sm:mr-14 lg:mr-0">Flag</h2>
                <h2 className="xl:ml-0 lg:ml-9">Name</h2>
                <h2 className="xl:ml-4 lg:ml-16">Population</h2>
                <h2 className="ml-3 xl:ml-0 lg:ml-20 sm:ml-0 lg:w-28">Area (km²)</h2>
                <h2 className="xl:flex hidden">Region</h2>
            </section>
            {visibleCountries.map((country, index) => (
            <section
                key={index}
                className="grid xl:grid-cols-5 grid-cols-4 gap-4 border-gray-700 py-4 w-[95%] lg:hover:scale-105 lg:hover:shadow-2xl transition-transform duration-200 cursor-pointer"
                onClick={() => handleClick(country)}
            >
                <div className="flex items-center justify-center">
                    <img
                        src={country.flags.svg}
                        alt={`Flag of ${country.name.common}`}
                        className="w-16 sm:w-20 h-12 sm:h-16 object-cover rounded-xl xl:ml-2"
                    />
                </div>
                <h3 className="flex items-center 2xl:text-2xl sm:w-40 lg:w-auto ml-2 sm:ml-14 lg:ml-5 xl:text-xl lg:text-lg text-xs sm:text-sm xl:w-52">
                    {country.name.common}
                </h3>
                <h3 className="flex items-center 2xl:text-2xl sm:w-40 lg:w-auto pl-3 sm:pl-14 lg:pl-5 xl:text-xl lg:text-lg xl:ml-6 text-xs sm:text-sm xl:w-52">
                    {country.population.toLocaleString()}
                </h3>
                <h3 className="flex ml-7 items-center 2xl:text-2xl lg:w-auto sm:ml-14 lg:ml-5 xl:ml-9 xl:text-xl lg:text-lg text-xs sm:text-sm xl:w-52">
                    {country.area.toLocaleString()}
                </h3>
                <h3 className="xl:flex items-center 2xl:text-2xl sm:w-40 lg:w-auto sm:pl-14 lg:text-xl xl:pl-[52px] xl:text-xl hidden xl:w-52">
                    {country.region}
                </h3>
            </section>
            ))}
            {loading && <div>Loading more countries...</div>}
            <div ref={loaderRef} />
        </div>
    );
};
