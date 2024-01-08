import './Main.css';
import { Outlet } from "react-router-dom";
import Navbar from './Widgets/Navbar/navbar';
import Footer from './Widgets/Footer/footer';

function Main() {
  return (
    <div className="Main">
      <Navbar/>
        <Outlet/>
      <Footer/>
    </div>

  );
}

export default Main;
