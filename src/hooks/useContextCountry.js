import { useContext } from "react";
import CountryContext from "../context/CountryContext";


const useCountries = () =>{
    return useContext(CountryContext);
}

export default useCountries