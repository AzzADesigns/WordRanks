
export const CantAndSearch = () => {
    return (
        <section className="flex justify-between items-center w-full mt-10 font-bold text-xl">
            <div className="ml-[63px] text-2xl text-gray-600 ">
                Found 234 countries
            </div>
            <div className="mr-[58px] relative flex items-center">
                <img src="/Search.svg" alt="" className="absolute pl-2 w-10"/>
                <input type="Search" placeholder="Search by Name, Region" className="bg-[#282B30] w-80 h-14 rounded-xl pl-14 text-lg"/>
            </div>
        </section>
    )
}
