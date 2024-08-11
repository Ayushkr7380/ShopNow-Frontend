import { Routes , Route, Navigate} from "react-router-dom";
import Home from "../Components/Products/Home/Home";
import MensSection from "../Components/Products/MensSection/MensSection";
import KidsSection from "../Components/Products/KidsSection/KidsSection";
import WomensSection from "../Components/Products/WomensSection/WomenSection";
import AllProducts from "../Components/Products/AllProducts/AllProducts";
import EachProduct from "../Components/Products/EachProduct/EachProduct";
import AddToCart from "../Components/Products/AddToCart/AddToCart";
import UserLogin from "../Components/User/UserLogin";
import UserRegistration from "../Components/User/UserRegistration";
import AddProducts from "../Components/Admin/AddProducts/AddProducts";
import AdminRegistration from "../Components/Admin/AdminRegistration/AdminRegistration";
import AdminLogin from "../Components/Admin/AdminLogin/AdminLogin";
import AddAddress from "../Components/AddAddress/AddAddress";
import Payment from "../Components/Products/Payment/Payment";
import Account from "../Components/AccountPage/Account";
import Wishlist from "../Components/Wishlist/Wishlist";
import Order from "../Components/Order/Order";
import Profile from "../Components/Profile/Profile";

function CustomRoute(){
    return(
        <>
            <Routes>
                {/* admin routes  */}
                <Route path="/admin" element={<AddProducts/>}/>
                <Route path="/admin/registration" element={<AdminRegistration/>}/>
                <Route path="/admin/login" element={<AdminLogin/>}/>

                {/* user routes  */}
                <Route path="/auth/userlogin" element={<UserLogin/>}/>
                <Route path="/auth/userregistration" element={<UserRegistration/>}/>

                {/* product routes  */}
                <Route path="/" element={<Navigate to="/products"/>}/>
                <Route path="/products" element={<Home/>} />
                <Route path="/products/mens" element={<MensSection/>} />
                <Route path="/products/women" element={<WomensSection/>} />
                <Route path="/products/kids" element={<KidsSection/>} />
                <Route path="/all/" element={<AllProducts/>} />
                <Route path="/products/:productid" element={<EachProduct/>} />

                <Route path="/addtocart" element={<AddToCart/>} />
                <Route path="/address" element={<AddAddress/>} />
                <Route path="/payment" element={<Payment/>} />

                <Route path="/account" element={<Account/>} />

                <Route path="/wishlist" element={<Wishlist/>} />
                <Route path="/order" element={<Order/>} />
                <Route path="/profile" element={<Profile/>} />
            </Routes>
        </>
    )
}
export default CustomRoute