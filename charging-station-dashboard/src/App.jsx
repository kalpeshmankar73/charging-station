import Body from "./components/Body";
import Header from "./components/Header";
import Sidebar from "./components/Sidebar";

function App() {
  return (
    <div className="min-h-screen flex flex-col">
      {/* Header */}
      <Header />

      {/* Main content */}
      <div className="flex flex-1">
        {/* Sidebar */}
        <div className="hidden md:block w-64">
          <div className="h-[calc(100vh-64px)] overflow-y-auto bg-gray-100 p-4">
            <Sidebar />
          </div>
        </div>

        {/* Body */}
        <div className="flex-1 h-[calc(100vh-64px)] overflow-y-auto p-4">
          <Body />
        </div>
      </div>
    </div>
  );
}

export default App;
