import { Container } from "react-bootstrap";
import { Routes, Route } from "react-router-dom";
import Home from './components/pages/Home/Home';
import Ad from "./components/pages/Ad/Ad";
import Register from "./components/pages/Register/Register";
import Header from "./components/views/Header/Header";
import Login from "./components/pages/Login/Login";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { loadUserRequest } from "./redux/usersRedux";
import { loadAdsRequest } from "./redux/adsRedux";
import AdAdd from "./components/pages/AdAdd/AdAdd";
import Logout from "./components/pages/Logout/Logout";
import AdEdit from "./components/pages/AdEdit/AdEdit";
import Searched from "./components/pages/Searched/Searched";


function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(loadAdsRequest())
  }, [dispatch]);

  useEffect(() => {
    dispatch(loadUserRequest())
  }, [dispatch]);

  return (
      <Container>
         <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/ad/:id" element={<Ad />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/ad/add" element={<AdAdd />} />
          <Route path="/ad/edit/:id" element={<AdEdit />} />
          <Route path="/logout" element={<Logout />} />
          <Route path="/search/:searchPhrase" element={<Searched />} />
        </Routes> 
    </Container>
  );
}

export default App;
