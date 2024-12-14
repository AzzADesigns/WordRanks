import '../index.css';


export const SortRegionStatus = () => {
    return (
        <form className='text-gray-600 xl:text-xl sm:w-full font-bold sm:flex sm:flex-col  sm:items-start sm:pl-7 lg:ml-0 '>
            <fieldset className='w-full'>
                <legend className="mb-4">Sort By</legend>
                <select name="" id="" className='xl:w-[375px] lg:w-[260px] sm:w-[96%]  lg:ml-5 h-16 p-4 rounded-2xl bg-gray-bg border border-gray-600 text-white' >
                    <option value="">Organize by ...</option>
                    <option  value="Name">Name</option>
                    <option  value="Population">Population</option>
                    <option  value="area">Area</option>
                    <option  value="region">Region</option>
                </select>
            </fieldset>
            <fieldset className='mt-16'>
                <legend className="mb-2">Region</legend>
                <div className='lg:flex lg:flex-col lg:gap-3 mt-4 sm:flex '>
                    <div className='lg:flex lg:gap-11  sm:flex'>
                        <button htmlFor="" className='col-span-2  hover:bg-gray-600 hover:text-white p-2 sm:px-3 lg:px-5 rounded-2xl'>Americas</button>
                        <button htmlFor="" className='hover:bg-gray-600 hover:text-white p-2 rounded-2xl sm:px-3 lg:px-5'>Antartic</button>
                    </div>
                    <div className=' sm:flex lg:flex-wrap '>
                        <button htmlFor="" className='lg:mr-9  hover:bg-gray-600 hover:text-white p-2 sm:px-3 lg:px-5 rounded-2xl'>Africa</button>
                        <button htmlFor="" className='lg:mr-9  hover:bg-gray-600 hover:text-white p-2 sm:px-3 lg:px-5 rounded-2xl'>Asia</button>
                        <button htmlFor="" className='lg:mr-9  hover:bg-gray-600 hover:text-white p-2 sm:px-3 lg:px-5 rounded-2xl xl:mt-0 lg:mt-4'>Europe</button>
                        <button htmlFor="" className='col-span-3 hover:bg-gray-600 hover:text-white p-2 sm:px-3 lg:px-5 rounded-2xl xl:hidden lg:flex-col'>Oceania</button>
                    </div>
                    <div>
                        <button htmlFor="" className='col-span-3 hover:bg-gray-600 hover:text-white p-2 sm:px-3 lg:px-5 rounded-2xl xl:flex lg:hidden'>Oceania</button>
                    </div>
                </div>
            </fieldset>

            <fieldset className="mt-8">
                <legend className="mb-4">Status</legend>
                <div className="flex flex-col gap-4">
                    <label className="flex items-center gap-2 cursor-pointer">
                        <input
                            type="checkbox"
                            className="hidden peer"
                        />
                        <span
                            className="w-8 h-8 flex items-center justify-center border-2 border-gray-500 rounded-md peer-checked:bg-blue-500 "
                        >

                        </span>
                        Member of the United Nations
                    </label>
                    <label className="flex items-center gap-2 cursor-pointer">
                        <input
                            type="checkbox"
                            className="hidden peer"
                        />
                        <span
                            className="w-8 h-8 flex items-center justify-center border-2 border-gray-500 rounded-md peer-checked:bg-blue-500"
                        >

                        </span>
                        Independent
                    </label>
                </div>
            </fieldset>
        </form>
    )
}