import { createContext, useEffect, useState } from "react";
import axios from "axios";
//https://app.zety.es/app/rsme/105ddab0-a170-420d-84eb-693d1db741b9/content/75e9e5df-7379-4e73-b1e1-b3db93895c2d

//https://www.youtube.com/watch?v=uAUQ0XdQnGY


const CountryContext = createContext();

export const CountryProvider = ({ children }) => {
    const [getCountries, setGetCountries] = useState([]);
    const [sortBy, setSortBy] = useState("population");
    const [sortedCountries, setSortedCountries] = useState([]);
    const [filterRegionValue, setFilterRegionValue] = useState("");
    const [isMember, setIsMember] = useState("");
    const [selectedCountry, setSelectedCountry] = useState(null);

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

    const filterAndSortCountries = () => {
        let countries = [...getCountries];

        if (filterRegionValue) {
            countries = countries.filter((country) => country.region === filterRegionValue);
        }

        if (isMember === "Independent") {
            countries = countries.filter((country) => country.unMember === false);
        } else if (isMember === "IsMember") {
            countries = countries.filter((country) => country.unMember === true);
        }

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
                selectedCountry,
                setSelectedCountry,
            }}
        >
            {children}
        </CountryContext.Provider>
    );
};

export default CountryContext;
