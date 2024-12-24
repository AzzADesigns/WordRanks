import { Header } from "./components/ScreenCoutries/Header";
import { Main } from "./components/Main";

function App() {

  return (
    <section className="bg-[#000002] min-h-screen   font-outfit text-white flex flex-col items-center ">
      <header className="w-full">
        <Header />
      </header>
      <main className="w-full flex justify-center ">
        <Main/>
      </main>
    </section>
  );
}

export default App;
