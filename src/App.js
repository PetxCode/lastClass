import { BrowserRouter, Routes, Route } from "react-router-dom";
import HomePage from "./components/HomePage";
import { Payment } from "./components/Payment";
import { Header } from "./components/LastClass/Header";
import { HomeScreen } from "./components/LastClass/HomeScreen";
import { Register } from "./components/LastClass/Register";
import { AuthProvider } from "./components/LastClass/AuthProvider";

function App() {
  return (
    <div>
      <AuthProvider>
        <BrowserRouter>
          <Header />
          <Routes>
            <Route path="/" element={<HomeScreen />} />
            <Route path="/home" element={<HomePage />} />
            <Route path="/reg" element={<Register />} />
            <Route path="/payment/:id" element={<Payment />} />
          </Routes>
        </BrowserRouter>
      </AuthProvider>
    </div>
  );
}

export default App;
