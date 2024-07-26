
import Home from "./Pages/Home/index";
import Login from "./Pages/Login/index";
import Register from "./Pages/Regis/index"
import {BrowserRouter , Route,  Routes } from 'react-router-dom';
import Menu from "./Pages/Menu/index.";
import Tambah from "./components/Create/buatProduct";
import Loading from "./components/Loading/Index";
import Order  from "./Pages/Order/index";
import Voice from "./Pages/Voice/index";
function App() {
  return (
    <>
    <BrowserRouter>
      <Routes>
          <Route path="/"         element={<Home/>} />
          <Route path="Menu"      element={<Menu/>}/>
          <Route  path="/Order"   element={<Order/>}/>
          <Route path="login"     element ={<Login/>}/> 
          <Route path="Regis"     element ={<Register/>}/> 
          <Route path="Loading"   element={<Loading/>}/>
          <Route path="tambahP"   element={<Tambah/>}/>
          <Route path="voice"     element={<Voice/>}/>
      </Routes>
    </BrowserRouter>
    </>
  );
}

export default App;
