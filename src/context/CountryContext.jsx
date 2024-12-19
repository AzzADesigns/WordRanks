import { createContext, useEffect, useState } from "react";
import axios from "axios";

const CountryContext = createContext();

export const CountryProvider = ({ children }) => {
    const [getCountries, setGetCountries] = useState([]); 
    const [sortBy, setSortBy] = useState("population");   
    const [sortedCountries, setSortedCountries] = useState([]); 
    const [valueForFilter , setValueForFilter] = useState("")

    useEffect(() => {
        axios
            .get("https://restcountries.com/v3.1/all")
            .then((response) => {
                setGetCountries(response.data);
                setSortedCountries(response.data); 
            })
            .catch((error) => {
                console.error("Error fetching countries:", error);
            });
    }, []);

    const orderBy = {
        population: (a, b) => b.population - a.population,
        area: (a, b) => b.area - a.area,
        region: (a, b) => a.region.localeCompare(b.region),
    };

    const sortCountries = (titulo) => {
        const sorted = [...getCountries].sort(orderBy[titulo]);
        setSortedCountries(sorted);
        setSortBy(titulo);
    };

    const filerRegion = (region) => {
        //aca  tenes que hacer el filtro ... tenes que comparar si region es igual a la region que llega de response, para eso, deberias guardar el valor en alguna variable....
        //al resultado del filtro que vas a hacer, lo guardar en setValueForRegion ... creo que vas a necesitar tambien uno que tenga el valor actual almacenado para utilizar ...
    }

    useEffect(() => {
        setSortedCountries([...getCountries].sort(orderBy[sortBy]));
    }, [getCountries, sortBy]);

    return (
        <CountryContext.Provider value={{ getCountries: sortedCountries, sortBy, sortCountries }}>
            {children}
        </CountryContext.Provider>
    );
};

export default CountryContext;
