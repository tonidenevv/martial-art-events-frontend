import Header from "./components/Header/Header";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./components/Home/Home";
import Events from "./components/Events/Events";
import Create from "./components/Create/Create";
import Details from "./components/Details/Details";
import Edit from "./components/Edit/Edit";
import Register from "./components/Register/Register";
import { useState } from "react";
import Login from "./components/Login/Login";
import Logout from "./components/Logout/Logout";
import { AuthContext } from "./contexts/AuthContext";

function App() {
  const [auth, setAuth] = useState(JSON.parse(localStorage.getItem('user')));

  const handleRegister = (data) => {
    localStorage.setItem('user', JSON.stringify(data));
    setAuth(JSON.parse(localStorage.getItem('user')));
  }

  const handleLogin = (data) => {
    localStorage.setItem('user', JSON.stringify(data));
    setAuth(JSON.parse(localStorage.getItem('user')));
  }

  const handleLogout = () => {
    localStorage.clear();
    setAuth(null);
  }

  return (
    <AuthContext.Provider value={{ auth }}>
      <BrowserRouter>
        <div>
          <Header />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/events" element={<Events />} />
            <Route path="/create" element={<Create />} />
            <Route path="/events/:eventId" element={<Details />} />
            <Route path="/events/:eventId/edit" element={<Edit />} />
            <Route path="/register" element={<Register handleRegister={handleRegister} />} />
            <Route path="/login" element={<Login handleLogin={handleLogin} />} />
            <Route path="/logout" element={<Logout handleLogout={handleLogout} />} />
          </Routes>
        </div>
      </BrowserRouter>
    </AuthContext.Provider>
  );
}

export default App;
