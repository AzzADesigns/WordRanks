import { useContext } from "react";
import CountryContext from "../../context/CountryContext";
import { FaRegWindowClose } from "react-icons/fa";

export const Country = () => {
    const { selectedCountry, setSelectedCountry, getCountries } = useContext(CountryContext); 
    console.log("Rendered country:", selectedCountry);

    if (!selectedCountry) {
        return <div>No country selected</div>; 
    }

    const handleSelectedCountry = () => {
        setSelectedCountry(null);
    };

    const handleClick = (borderCountry) => {
        if (selectedCountry.cca3 !== borderCountry.cca3) {
            setSelectedCountry(borderCountry);
            console.log(selectedCountry);
        }
    };

    return (
        <div className="flex flex-col items-center  bg-[#1C1D1F] w-full lg:w-[80%] xl:w-[60%] absolute lg:relative lg:-mt-16  left-0 lg:left-[10%] lg:right-[10%] xl:left-[20%] xl:right-[20%] top-36 lg:top-0 lg:border lg:shadow-2xl border-gray-700 lg:rounded-3xl">
            <div className=" mt-52 absolute right-5 bottom-[90%]">
                <button  onClick={handleSelectedCountry}><FaRegWindowClose className="w-8 h-8 lg:w-12 lg:h-12 text-gray-600" /></button>
            </div>
            <div className="absolute -top-10">
                <img
                    src={selectedCountry.flags.svg}
                    alt={`Flag of ${selectedCountry.name.common}`}
                    className="w-40 h-30 object-cover rounded-xl mb-4 sm:w-60 "
                />
            </div>

            {/*name para abajo */}
            <div className="mt-20 sm:mt-32 lg:mt-44 flex flex-col justify-center items-center">
                <h2 className="text-2xl sm:text-3xl lg:text-6xl font-bold lg:mb-2 ">{selectedCountry.name.common}</h2>

                {/*capital para abajo */}
                <div className="w-80 sm:w-[600px] lg:w-[700px]">
                    <div className=" flex justify-center sm:text-lg lg:text-3xl font-semibold mb-5"><h3>{selectedCountry.altSpellings[2]}</h3></div>
                    {/*population y area */}
                    <div className=" flex justify-between text-sm sm:px-16 lg:px-2 mb-5">
                        <div className="bg-[#282B30] p-2 rounded-lg flex items-center gap-2 sm:gap-5">
                            <span className="text-xs sm:text-base lg:text-2xl border-r border-gray-600 sm:px-2">Popultation</span> 
                            <span className="sm:text-lg lg:text-3xl">{selectedCountry.population}</span>
                        </div>
                        <div className="bg-[#282B30] p-2 rounded-lg flex items-center gap-2 sm:gap-5">
                            <span  className="text-xs sm:text-base lg:text-2xl border-r border-gray-600 sm:px-2" >Area (km²)</span>
                            <span className="sm:text-lg lg:text-3xl">{selectedCountry.area}</span>
                        </div>
                    </div>

                    {/*Resto */}
                    <div  className="text-xs sm:text-base lg:text-2xl sm:mb-3 lg:mb-5">
                        <div className="flex justify-between py-4 sm:py-5 px-2 border-t border-gray-600">
                            <span>Capital</span>
                            <span>{selectedCountry.capital[0]}</span>
                        </div>
                        <div className="flex justify-between py-4 sm:py-5 px-2 border-t border-gray-600">
                            <span>Subregion</span>
                            <span>{selectedCountry.subregion}</span>
                        </div>
                        <div className="flex justify-between py-4 sm:py-5 px-2 border-t border-gray-600">
                            <span>Language</span>
                            <span>{Object.values(selectedCountry.languages).join(", ")}</span>
                        </div>
                        <div className="flex justify-between py-4 sm:py-5 px-2 border-t border-gray-600">
                            <span>Currencies</span>
                            <span>{Object.entries(selectedCountry.currencies).map(([key, value]) => `${value.name} (${value.symbol})`).join(", ")}</span>
                        </div>
                        <div className="flex justify-between py-4 sm:py-5 px-2 border-t border-b border-gray-600">
                            <span>Continent</span>
                            <span>{selectedCountry.continents}</span>
                        </div>
                    </div>

                    {/*paises vecinos */}
                    <div className="flex mb-10">
                        {Array.isArray(selectedCountry.borders) && selectedCountry.borders.length > 0 ? (
                            <div className=" flex flex-wrap justify-center items-center gap-5">
                                {selectedCountry.borders.map((border) => {
                                    const borderCountry = getCountries.find((country) => country.cca3 === border);
                                    return borderCountry ? (
                                        <div
                                            key={borderCountry.cca3}
                                            className="cursor-pointer hover:scale-105 w-24 h-24 lg:w-28 lg:h-28 xl:w-32 xl:h-32 flex flex-col justify-center items-center"
                                            onClick={() => handleClick(borderCountry)}
                                        >
                                            <img src={borderCountry.flags.svg} alt={borderCountry.name.common} className="w-16 h-16 lg:w-28 xl:w-32 xl:h-32 lg:h-28 mt-5 rounded-md" />
                                            <h3 className="text-sm">{borderCountry.name.common}</h3>
                                        </div>
                                    ) : null;
                                })}
                            </div>
                        ) : (
                            <div className="lg:text-2xl">There are no neighboring countries</div> 
                        )}
                    </div>
                </div>
            </div>

        </div>
    );
};
