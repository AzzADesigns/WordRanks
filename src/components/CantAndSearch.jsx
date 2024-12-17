
export const CantAndSearch = () => {
    return (
        <section className="flex flex-col sm:flex-row justify-between items-center w-full mt-10 font-bold xl:text-xl lg:text-lg">
            <div className="xl:ml-[94px] lg:ml-[60px] sm:ml-6 xl:text-2xl text-gray-600 mb-5 sm:mb-0 ">
                Found 234 countries
            </div>
            <div className="xl:mr-[105px] lg:mr-[55px] sm:mr-5 relative flex  items-center mb-5 sm:mb-0  w-full sm:w-auto">
                <img src="/Search.svg" alt="" className="absolute pl-2 w-10"/>
                <input type="Search" placeholder="Search by Name, Region, Subregion" className="bg-[#282B30] xl:w-[440px] lg:w-[350px] sm:w-72 w-full  h-14 rounded-xl pl-14 lg:text-sm xl:text-lg"/>
            </div>
        </section>
    )
}
