import InterfaceCreator from "./components/InterfaceCreator";
import Providers from "./contexts/Providers";

function App() {
  return (
    <Providers>
      <div className="flex justify-center items-start pt-10 w-screen h-screen bg-slate-100">
        <InterfaceCreator />
      </div>
    </Providers>
  );
}

export default App;
