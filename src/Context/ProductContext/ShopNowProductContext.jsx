import { useState } from "react"
import { CreateProductContext } from "./CreateProductContext"
import axios from "axios";
import { useNavigate } from "react-router-dom";

function ShopNowproductContext(props){
    const navigate = useNavigate();

    //total amount calculation 
    const [ cart ,setCartTotal] = useState(0);
    //change the button from add to cart to added to cart via storing productid 
    const [ isAddedToCart , setIsAddedToCart] = useState([]);
    //total number of items in cart
    const [ noOfItems,setNoOfitems] = useState(0);
    //new user registration
    const [ userRegistration , setUserRegistration] = useState({name:'',email:'',phone:'',password:''});
    //new user login 
    const [ userLogin , setUserLogin] = useState({phone:'',password:''});
    //store the loggedin user data
    const [userData,setUserData] = useState([]);
    //whenever it makes change useeffect renders, mainly for login and logout
    const [ authStateChange,setAuthStateChange] = useState(false);
    //show logout button
    const [ showLogoutBtn , setShowLogoutBtn] = useState(false);
    //show cart items of db
    const [cartItems , setCartItems] = useState([]);

    const [ addtocartChange , setAddtocartChange] = useState(false)
    

    //backend url
    const URL = 'http://localhost:5000';

    //user registration api call
    const UserRegistrationHandleSubmit = (e)=>{
        e.preventDefault();
        console.log('from useState',userRegistration)
        async function UserRegister(){
            try {
                const response = await axios.post(`${URL}/user/registration`,userRegistration,{withCredentials:true});
                console.log(response.data);
                setUserRegistration({name:'',email:'',phone:'',password:''})
            } catch (error) {
                console.log(error.message);
            }
        }
        UserRegister();
    }
    

    //user login api call
    const userLoginHandleSubmit = (e)=>{
        e.preventDefault()
        async function login(){
            try {
                const response = await axios.post(`${URL}/user/login`,userLogin,{withCredentials:true});
                console.log(response.data)
                setUserLogin({phone:'',password:''});
                setAuthStateChange(true)
                navigate('/products')
            } catch (error) {
                console.log(error.message)
            }
        }
        login();
    }
    

    //user add to cart api call
    const postAddtoCart = (productid,productprice)=>{
            const data = {
                productid:productid,
                noofitems:'1',
                totalprice:productprice
            }
            console.log('dictionary',data);
            async function postcart(){
                try {
                    const response = await axios.post(`${URL}/user/addtocart`,data,{withCredentials: true});
                    console.log(response.data)
                } catch (error) {
                    console.log(error.message)
                }
            }
            postcart();
    }


    //user fetch cart data api call
    async function cartData(){
        try {
            const response = await axios.get(`${URL}/user/addtocart`,{withCredentials:true});
            console.log('Addtocart data in allproduct page -->',response.data.addtocart);
            response.data.addtocart.map((ele,idx)=>setIsAddedToCart((prev)=>[...prev , ele.products._id]));
            const total = response.data.addtocart.reduce((sum,item)=>sum+Number(item.totalprice),0);
            console.log(total)
            setCartTotal(total);
            setCartItems([...response.data.addtocart]);
            setNoOfitems(response.data.addtocart.length);
            console.log('CartData Clicked')
        } catch (error) {
            console.log('CartData Clicked')
            console.log(error.message);
            setCartItems([])
        }
    }

    //user logout api call
    async function userlogout(){
        console.log('Clicked Logout')
        try {    
            const response = await axios.post(`${URL}/user/logout`,{},{withCredentials:true});
            console.log(response.data);
            setShowLogoutBtn(false);
            setAuthStateChange(false);
            setIsAddedToCart([]);
            setUserData([]);
            setCartTotal(0);
            setNoOfitems(0);
            // fetchUser();
            // cartData();
            navigate('/auth/userlogin');
        } catch (error) {
            console.log(error.message);
        }
    }


    //user loggedin details api call
    async function fetchUser(){
        try {
            const response = await axios.get(`${URL}/user/`,{withCredentials:true});
            // console.log(response.data.checkUser);
            console.log('Useeffect used');
            setUserData({...response.data.checkUser});
            setShowLogoutBtn(true);
        } catch (error) {
            // console.log('Useeffect used');
            console.log(error.message);
        }
        console.log(userData.name)
    }

    async function removeItemFromCart(itemid){
        console.log('Item to be removed is ',itemid);
        try {
            const response = await axios.post(`${URL}/user/removeitemfromaddtocart`,{
                itemid:itemid
            },{withCredentials:true});
            console.log(response.data);
            setAuthStateChange(!authStateChange);
            setIsAddedToCart([isAddedToCart.filter((item)=>response.data.cart.products._id !== item.productid)]);
        } catch (error) {
            console.log(error.message);
        }
    }
    

    async function handleQuanityofEachItem(itemid,quantity,priceofEachItem){
        console.log('Clicked for quantity');
        console.log(`${quantity} item order of item id : ${itemid} worth ₹${priceofEachItem}`);
        try {
            const response = await axios.post(`${URL}/user/updateitemfromaddtocart`,{
                itemid:itemid,
                quantity:quantity,
                priceofEachItem:priceofEachItem
            },{
                withCredentials:true
            })

            console.log(response.data.cart);
            // setAuthStateChange(!authStateChange)
            // const total = cartItems.reduce((sum,item)=>sum+Number(item.totalprice),0);
            // console.log('After cart Update',total)
            // setCartTotal(total);
            // console.log('Total Bill after cart update',cart)
            cartData();
            setAddtocartChange(!addtocartChange);

        } catch (error) {
            console.log(error.message)
        }
    }

    const submitAddress = (e) =>{
        e.preventDefault();
        console.log("Save Address")
    }
    
    return(
        <>
            <CreateProductContext.Provider value={{cart ,setCartTotal ,isAddedToCart , setIsAddedToCart,noOfItems,setNoOfitems ,postAddtoCart,userRegistration , setUserRegistration,UserRegistrationHandleSubmit,userLogin , setUserLogin,userLoginHandleSubmit,userData,setUserData,userlogout,authStateChange,showLogoutBtn , setShowLogoutBtn,cartData,cartItems , setCartItems,fetchUser,removeItemFromCart,handleQuanityofEachItem,addtocartChange , setAddtocartChange,submitAddress}}>
                {props.children}
            </CreateProductContext.Provider>
        </>
    )
}
export default ShopNowproductContext