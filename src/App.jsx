import { CantAndSearch } from "./components/CantAndSearch"
import { Header } from "./components/Header"
import { Paises } from "./components/Paises"
import { SortRegionStatus } from "./components/SortRegionStatus"

function App() {


  return (
    <section className="bg-[#1C1D1F] h-full  font-outfit text-white flex flex-col  items-center ">
      <header className="w-full bg-red-200">
        <Header/>
      </header>

      <main className="flex flex-col justify-center items-center -mt-[4%] border border-gray-500 rounded-3xl w-[92%] bg-[#1C1D1F]">
        <div className=" w-[98.5%]">
          <CantAndSearch/>
        </div>
        <div className=" flex mt-8 gap-20 ">
          <div className="flex flex-col h-9  justify-center items-start mt-[280px]">
            <SortRegionStatus/>
          </div>
          <div className="">
            <Paises/>
          </div>
        </div>

      </main>

    </section>
  )
}

export default App
