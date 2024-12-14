import { CantAndSearch } from "./components/CantAndSearch"
import { Header } from "./components/Header"
import { Paises } from "./components/Paises"
import { SortRegionStatus } from "./components/SortRegionStatus"

function App() {


  return (
    <section className="bg-[#000002] h-full  font-outfit text-white flex flex-col  items-center">
      <header className="w-full">
        <Header/>
      </header>

      <main className="flex flex-col justify-center items-center -mt-[4%] border border-gray-500 rounded-3xl w-[92%] bg-[#1C1D1F]">
        <div className=" w-[98.5%]">
          <CantAndSearch/>
        </div>
        <div className=" lg:flex lg:flex-row lg:items-start lg:mt-14  lg:ml-10 sm:flex sm:flex-col  lg:gap-1 sm:gap-5 sm:mt-0">
          <div className="flex flex-col h-[20%] xl:mt-2  xl:ml-10 justify-center items-start  sm:w-full lg:w-auto sm:mt-12 ">
            <SortRegionStatus/>
          </div>
          <div className=" sm:flex sm:justify-center  lg:mt-8">
            <Paises/>
          </div>
        </div>

      </main>

    </section>
  )
}

export default App
