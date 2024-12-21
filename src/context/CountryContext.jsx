import { createContext, useEffect, useState } from "react";
import axios from "axios";

const CountryContext = createContext();

export const CountryProvider = ({ children }) => {
    const [getCountries, setGetCountries] = useState([]);
    const [sortBy, setSortBy] = useState("population");
    const [sortedCountries, setSortedCountries] = useState([]);
    const [filterRegionValue, setFilterRegionValue] = useState("");
    const [isMember, setIsMember] = useState("");

    useEffect(() => {
        axios
            .get("https://restcountries.com/v3.1/all")
            .then((response) => {
                setGetCountries(response.data);
                setSortedCountries(response.data);
                console.log(response.data)
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

    const filterAndSortCountries = () => {
        let countries = [...getCountries];

        // Filtrar por región
        if (filterRegionValue) {
            countries = countries.filter((country) => country.region === filterRegionValue);
        }

        // Filtrar por membresía
        if (isMember === "Independent") {
            countries = countries.filter((country) => country.unMember === false);
        } else if (isMember === "IsMember") {
            countries = countries.filter((country) => country.unMember === true);
        }

        // Ordenar
        return countries.sort(orderBy[sortBy]);
    };

    useEffect(() => {
        const result = filterAndSortCountries();
        setSortedCountries(result);
    }, [getCountries, filterRegionValue, isMember, sortBy]);

    const sortCountries = (criteria) => {
        setSortBy(criteria);
    };

    const filterByRegion = (region) => {
        setFilterRegionValue(region);
    };

    const filterByStatus = (status) => {
        setIsMember(status);
    };

    useEffect(() => {
        setSortedCountries([...getCountries].sort(orderBy[sortBy]));
    }, [getCountries, sortBy]);

    return (
        <CountryContext.Provider
            value={{
                getCountries: sortedCountries,
                sortBy,
                sortCountries,
                filterRegionValue,
                filterByRegion,
                isMember,
                filterByStatus,
            }}
        >
            {children}
        </CountryContext.Provider>
    );
};

export default CountryContext;
