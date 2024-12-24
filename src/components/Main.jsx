import { useState } from "react";
import useCountries from "../hooks/useContextCountry";
import { Country } from "./OneCountry/Country";
import { ScreenCountries } from "./screenCountries";





export const Main = () => {
    const [filter, setFilter] = useState("");
    const { getCountries,selectedCountry } = useCountries();

    const filteredCountries = getCountries.filter((country) =>
        country.name.common.toLowerCase().includes(filter.toLowerCase())
    );
    
    return (
        <main className="h-full flex flex-col justify-center items-center xl:-mt-[2%]  -mt-5 border border-gray-500 rounded-3xl w-[92%] bg-[#1C1D1F] sm:px-0 px-5 mb-9 pb-9">
            <section className="w-full">
                {selectedCountry===null ? <ScreenCountries setFilter={setFilter} filteredCountries={filteredCountries}/> : <Country/>}
            </section>


        </main>
    )
}
