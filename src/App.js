import Header from "./components/Header/Header";
import { BrowserRouter } from "react-router-dom";

function App() {
  return (
    <BrowserRouter>
      <div>
        <Header />
      </div>
    </BrowserRouter>
  );
}

export default App;
