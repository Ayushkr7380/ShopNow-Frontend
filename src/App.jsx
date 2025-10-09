import Navbar from "./Components/Products/Navbar/Navbar"
import CustomRoute from "./CustomRoutes/CustomRoute"
import { useLocation } from "react-router-dom"

function App() {

  const location = useLocation();

  //List of routes where you do not have to show navbar

  const hideNavbarPrefixes = ["/auth/reset-password"]

  const shouldHideNavbar = hideNavbarPrefixes.some(prefix =>
    location.pathname.startsWith(prefix)
  );


  return (
    <>
      {!shouldHideNavbar && <Navbar/>}
      <CustomRoute/>      
    </>
  )
}

export default App
