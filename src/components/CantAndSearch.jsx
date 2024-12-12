
export const CantAndSearch = () => {
    return (
        <section className="flex justify-between items-center w-full mt-10 font-bold xl:text-xl lg:text-lg">
            <div className="xl:ml-[65px] lg:ml-[32px] xl:text-2xl text-gray-600 ">
                Found 234 countries
            </div>
            <div className="xl:mr-[68px] lg:mr-[32px] relative flex items-center">
                <img src="/Search.svg" alt="" className="absolute pl-2 w-10"/>
                <input type="Search" placeholder="Search by Name, Region, Subregion" className="bg-[#282B30] w-[440px] h-14 rounded-xl pl-14 lg:text-sm xl:text-lg"/>
            </div>
        </section>
    )
}
