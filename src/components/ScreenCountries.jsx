import { CantAndSearch } from "./ScreenCoutries/CantAndSearch"
import { Countries } from "./ScreenCoutries/Countries"
import { SortRegionStatus } from "./ScreenCoutries/SortRegionStatus"

export const ScreenCountries = ({setFilter,filteredCountries}) => {
    return (
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
    )
}
