import { useState } from "react";
import { CantAndSearch } from "./components/CantAndSearch";
import { Header } from "./components/Header";
import { Countries } from "./components/Countries";
import { SortRegionStatus } from "./components/SortRegionStatus";
import useCountries from "./hooks/useContextCountry";

function App() {
  const [filter, setFilter] = useState("");
  const { getCountries } = useCountries();

  const filteredCountries = getCountries.filter((country) =>
    country.name.common.toLowerCase().includes(filter.toLowerCase())
  );

  return (
    <section className="bg-[#000002] h-full font-outfit text-white flex flex-col items-center">
      <header className="w-full">
        <Header />
      </header>
      <main className="flex flex-col justify-center items-center -mt-[4%] border border-gray-500 rounded-3xl w-[92%] bg-[#1C1D1F] sm:px-0 px-5 mb-9 pb-9">
        <section className="w-full h-full">
          <div className="w-[98.5%]">
            <CantAndSearch setFilter={setFilter} countries={filteredCountries} />
          </div>
          <div className="lg:flex lg:flex-row lg:items-start lg:mt-14 lg:ml-10 sm:flex sm:flex-col lg:gap-1 sm:gap-5 sm:mt-0">
            <div className="flex flex-col h-[20%] xl:mt-2 xl:ml-10 justify-center items-start sm:w-full lg:w-auto sm:mt-12">
              <SortRegionStatus />
            </div>
            <div className="sm:flex sm:justify-center lg:mt-8 min-h-screen">
              <Countries countries={filteredCountries} />
            </div>
          </div>
        </section>
      </main>
    </section>
  );
}

export default App;
