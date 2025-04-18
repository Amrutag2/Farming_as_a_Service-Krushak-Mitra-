import Login from './components/login_component';
import SignUp from './components/signup_component';
import UserDetails from './components/userDetails';
import './App.css';
import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Reset from './components/reset';
import Scheme from './components/Scheme';
import Chat from './components/Chat';
import Posts from './components/Posts';
import NameLogo from './components/NameLogo';
import Navigate from './components/Navigate';

function App() {
  const isLoggedIn = window.localStorage.getItem("loggedIn");

  return (
    <Router>
      <div className="App">
        <NameLogo/>
        <Navigate/>
        <Routes>
          <Route
            exact
            path="/"
            element={isLoggedIn == "true" ? <UserDetails /> : <Login />}
          />
          <Route path="/sign-in" element={<Login />} />
          <Route path="/sign-up" element={<SignUp />} />
          <Route path="/userDetails" element={<UserDetails />} />
          <Route path="/reset" element={<Reset />} />
          <Route path="/scheme" element={<Scheme />} />
          <Route path="/chat" element={<Chat />} />
          <Route path="/fertilizer" element={<Posts />} />

        </Routes>

      </div>
    </Router>
  );
}

export default App;
