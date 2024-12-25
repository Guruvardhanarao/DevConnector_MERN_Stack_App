import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { Provider } from "react-redux";
import store from "./store";

import "./App.css";
import Footer from "./components/layout/Footer";
import Header from "./components/layout/Header";
import LandingPage from "./components/layout/LandingPage";
import Register from "./components/auth/Register";
import Login from "./components/auth/Login";

function App() {
  return (
    <Provider store={store}>
      <Router>
        <div className="d-flex flex-column vh-100">
          <Header />
          <div className="flex-grow-1">
            <Routes>
              <Route exact path="/" element={<LandingPage />} />
              <Route exact path="/register" element={<Register />} />
              <Route exact path="/login" element={<Login />} />
            </Routes>
          </div>
          <Footer />
        </div>
      </Router>
    </Provider>
  );
}

export default App;
