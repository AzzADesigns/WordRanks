import { useEffect, useState } from "react";
import axios from "axios";
import { useIntersectionObserver } from "../hooks/useIntersectionObserver";
 // Importa tu hook personalizado

export const Paises = () => {
    const [allPaises, setAllPaises] = useState([]); // Lista completa
    const [visiblePaises, setVisiblePaises] = useState([]); // Lista visible
    const [page, setPage] = useState(1); // Control de paginación
    const ITEMS_PER_PAGE = 10; // Número de países por "página"

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

  // Cargar más países cuando el observer detecta intersección
    useEffect(() => {
        if (isIntersecting) {
            setPage((prevPage) => prevPage + 1);
        }
    }, [isIntersecting]);

  // Actualizar la lista visible al cambiar de página
    useEffect(() => {
        const start = (page - 1) * ITEMS_PER_PAGE;
        const end = start + ITEMS_PER_PAGE;
        setVisiblePaises((prev) => [...prev, ...allPaises.slice(start, end)]);
    }, [page, allPaises]);

    return (
        <div className=" h-full font-outfit text-gray-200 w-full ">

            <table className="table-auto">
                <thead className="border-b border-gray-700 ">
                    <tr className="text-gray-600">
                        <th className=" px-4 pr-11  text-xl py-8">Flag</th>
                        <th className=" px-4 pr-52  text-xl py-8">Name</th>
                        <th className=" px-4 pr-12  text-xl py-8">Population</th>
                        <th className=" px-4 pr-1  text-xl py-8">Area (km²)</th>
                        <th className=" px-4 pl-16  text-xl py-8">Region</th>
                    </tr>
                </thead>
                <tbody className="">
                    {visiblePaises.map((country, index) => (
                        <tr key={index} className=" border-gray-700 text-start">
                            <td className=" w-26 py-2">
                                <img
                                    src={country.flags.svg}
                                    alt={`Flag of ${country.name.common}`}
                                    className="w-20 h-16 object-cover rounded-xl"
                                />
                            </td>
                            <td className="w-96 py-10 pl-[63px]  text-2xl  ">{country.name.common}</td>
                            <td className="w-52 py-10  pl-[35px] text-2xl  ">{country.population.toLocaleString()}</td>
                            <td className="w-56 py-10 pl-[60px]  text-2xl  ">{country.area?.toLocaleString()}</td>
                            <td className="w-52 py-10 pl-[100px]  text-2xl  ">{country.region}</td>
                        </tr>
                    ))}
                </tbody>
                {/* Div que se observa con IntersectionObserver */}
                <div ref={observerRef} className="h-50 bg-red w-full" />
            </table>
        </div>

    );
};
