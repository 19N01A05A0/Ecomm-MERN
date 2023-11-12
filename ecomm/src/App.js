import logo from './logo.svg';
import './App.css';
import {BrowserRouter,Routes,Route} from 'react-router-dom'
import Login from "./components/login"
import Home from "./components/home"
import AddProduct from "./components/addproduct"
import GetProducts from "./components/getproducts"
import GetProduct from './components/getproduct';
import Signup from './components/signup';
import UseCart from "./components/usecart"
function App() {
  return (
    <BrowserRouter>
    <Routes>
      <Route path="/" element={<Login></Login>}/>
      <Route path="/signup" element={<Signup></Signup>}></Route>
      <Route path="/login" element={<Login/>}></Route>
      <Route path="/home" element={<Home/>}></Route>
      <Route path="/add/product" element={<AddProduct/>}></Route>
      <Route path="/get/products" element={<GetProducts/>}></Route>
      <Route path="/get/product/:id" element={<GetProduct/>}></Route>
      <Route path="/get/cart" element={<UseCart></UseCart>}></Route>

      </Routes>
    </BrowserRouter>
  );
}

export default App;
