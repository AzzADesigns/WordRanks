import { createContext, useEffect, useState } from "react"
import axios from "axios";

const CountryContext= createContext()

export const CountryProvider = ({children}) => {
    const [getCountries, setGetCountries]= useState([])

    useEffect(() => {
        axios
            .get("https://restcountries.com/v3.1/all")
            .then((response) => {
                setGetCountries(response.data);
                
            })
            .catch((error) => {
                console.error("Error fetching countries:", error);
            });
    }, []);

    return (
        <CountryContext.Provider value={{getCountries}}>
            {children}
        </CountryContext.Provider >
    )
}

export default CountryContext;