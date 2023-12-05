import LogInForm from "./components/LogInForm/LogInForm";
import { Route, Routes, BrowserRouter } from "react-router-dom";
import './App.scss';
import Chat from "./components/Chat/Chat";
import { CartProvider } from "./Context/ChatContext";


function App() {
  return (
    <CartProvider>
      <div className="App">
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<LogInForm />}/>
            <Route path="/chat" element={<Chat />}/>
          </Routes>
        </BrowserRouter>
      </div>
    </CartProvider>
  );
}

export default App;
