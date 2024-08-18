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
    const [ userRegistration , setUserRegistration] = useState({
        name:'',
        email:'',
        phone:'',
        password:''
    });
    //new user login 
    const [ userLogin , setUserLogin] = useState({phone:'',password:''});
    //store the loggedin user data
    const [userData,setUserData] = useState({});
    //whenever it makes change useeffect renders, mainly for login and logout
    const [ authStateChange,setAuthStateChange] = useState(false);
    //show logout button
    const [ showLogoutBtn , setShowLogoutBtn] = useState(false);
    //show cart items of db
    const [cartItems , setCartItems] = useState([]);
    //rerenders addtocart page when it makes changes..
    const [ addtocartChange , setAddtocartChange] = useState(false)
    //Store address data and send to DB
    const [saveAddress , setsaveAddress ] = useState({
        fullname : '',
        phonenumber : '',
        pincode : '',
        city : '',
        state : '',
        housenumber : '',
        roadname : ''
    })
    //stored address 
    const [ storeAddress , setStoreAddress ] = useState([]);
    //store address id
    const [ storeAddressIdForOrder , setStoreAddressIdForOrder] = useState('');
    //Display redirect Page after placing order
    const [ displayRedirect , setDisplayRedirect] = useState(false);
    //Order status i.e order placed or failed
    const [redirectPageName,setRedirectPageName] = useState('');
    //State for Order Page Loadingbar
    const [ placeOrderLoading ,setPlaceOrderLoading] = useState(false);
    //Wishlist data
    const [ wishlist , setWishlist ] = useState([]);
    //Fetch all Order data
    const [ orderData , setOrderData] = useState([]);
    //Fetched all wishlist data
    const [ fetchWishlist , setFetchWishlist ] = useState([]);
    //Store item data for buyNow
    const [ buyNowData , setBuyNowData ] = useState([]);
    //Rerenders wishlist Page whenever it makes changes
    const [ wishlistChange , setWishlistChange] = useState(false);
    //Rerenders Address page whenever it makes changes
    const [ addressPageChange , setAddressPageChange] = useState(false);
    //Store and Send edited user profile data to DB
    const [editProfile,setEditProfile] = useState({name:'',phone:'',email:''});
    //State for EditProfile Page Loadingbar
    const [ loadingEditProfile , setLoadingEditProfile ] = useState(false);
    //Status for EditProfile Page i.e edit success or fail
    const [ editProfileStatus , setEditProfileStatus ] = useState("");
    //set Search value 
    const [ searchInput , setSeachInput ] = useState("");
    //Fetch all items that is searched
    const [ searchData ,setSearchData] = useState([]);
    //State for Search Page Loadingbar
    const [ loadingSearchInput , setLoadingSearchInput ] = useState(false);
    //Status for Search Page i.e Item successfully found or fail
    const [ searchInputStatus , setSearchInputStatus ] = useState("");

    //Backend URL
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
            setUserData({});
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

    //Remove item from cart api call
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
    
    //set quantity of each items api call
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
            cartData();
            setAddtocartChange(!addtocartChange);

        } catch (error) {
            console.log(error.message)
        }
    }

    //Add address to DB api call
    const submitAddress = (e) =>{
        e.preventDefault();
        console.log(saveAddress);
        async function AddAddress(){
            try {
                const response = await axios.post(`${URL}/user/addaddress`,saveAddress,{withCredentials:true})
                console.log(response.data);
                setsaveAddress({fullname : '',
                    phonenumber : '',
                    pincode : '',
                    city : '',
                    state : '',
                    housenumber : '',
                    roadname : ''})
                setAddtocartChange(!addtocartChange);
            } catch (error) {
                console.log(error.message);
            }
        }

        AddAddress();
        
    }
    
    //fetch all address api call
    const fetchSavedAddress = async()=>{
        try {
            const response = await axios.get(`${URL}/user/addaddress`,{withCredentials:true});
            console.log(response.data.address);
            setStoreAddress([...response.data.address]);
            
            
        } catch (error) {
            console.log(error.message);
        }
    }

    //Place Order api call
    const placeOrderfnc = async()=>{
        if(buyNowData.length > 0){
            console.log('Buy Now Worked..');
            try {
                setPlaceOrderLoading(true);
                const totalprice = buyNowData.reduce((acc,item)=>acc + Number(item.price),0)
                const response = await axios.post(`${URL}/user/placeorder`,{
                    cartitems:buyNowData,
                    addressid:storeAddressIdForOrder,
                    totalprice:totalprice   
                },{withCredentials:true});
                console.log(response.data);
                setPlaceOrderLoading(false);
                setBuyNowData([]);
                let sec = 4;
                const interval = setInterval(()=>{
                    setRedirectPageName(`Order Placed ....Redirecting to Home page in ${sec} second`);
                    sec -= 1;
                },1000);
                setTimeout(() => {
                    clearInterval(interval);
                    setDisplayRedirect(false);
                    navigate('/products');
                }, 4000);
            } catch (error) {
                setPlaceOrderLoading(false);
                console.log(error.message);
                setBuyNowData([]);
                let sec = 4;
                const interval = setInterval(()=>{
                    setRedirectPageName(`Order failed....Redirecting to Cart page in ${sec} second`);
                    sec -= 1;
                },1000);
                setTimeout(() => {
                    clearInterval(interval);
                    setDisplayRedirect(false);
                    navigate('/addtocart');
                }, 4000);
            }
        }
        else{           
            console.log('add to cart Worked..');
            try {
                setPlaceOrderLoading(true);
                const response = await axios.post(`${URL}/user/placeorder`,{
                cartitems:cartItems,
                addressid:storeAddressIdForOrder,
                totalprice:cart   
            },{withCredentials:true});
            console.log(response.data);
            setPlaceOrderLoading(false);
            setCartTotal(0);
            setIsAddedToCart([]);
            setNoOfitems(0)
            setCartItems([])
            const cartResponse = await axios.post(`${URL}/user/deleteaddtocart`,{},{withCredentials:true});
            console.log("cart items removed ",cartResponse.data);
            let sec = 4;
            const interval = setInterval(()=>{
                setRedirectPageName(`Order Placed ....Redirecting to Home page in ${sec} second`);
                sec -= 1;
            },1000);
            setTimeout(() => {
                clearInterval(interval);
                setDisplayRedirect(false);
                navigate('/products');
            }, 4000);
            
            } catch (error) {
                setPlaceOrderLoading(false);
                console.log(error.message);
                let sec = 4;
                const interval = setInterval(()=>{
                    setRedirectPageName(`Order failed....Redirecting to Cart page in ${sec} second`);
                    sec -= 1;
                },1000);
                setTimeout(() => {
                    clearInterval(interval);
                    setDisplayRedirect(false);
                    navigate('/addtocart');
                }, 4000);
                
            }
        }
    }

    //Add item to wishlist api call
    async function addItemToWishlist(productid){
        console.log('add item to wishlist',productid);
        try {
            const response = await axios.post(`${URL}/user/wishlist`,{
                productid
            },{
                withCredentials:true
            })
            console.log(response.data);
            
        } catch (error) {
            console.log(error.message);
        }
    }

    //View all orders api call
    const viewOrder = async() =>{
        console.log('View ordered Clicked..');
        try {
            const response = await axios.get(`${URL}/user/vieworder`,{withCredentials:true});
            console.log(response.data.orders);
            setOrderData(response.data.orders);
        } catch (error) {
            console.log(error.message);
        }
    }
    
    //view all wishlists api call
    const viewWishlist = async()=>{
        console.log('View Wishlist..');
        try {
            const response = await axios.get(`${URL}/user/wishlist`,{withCredentials:true});
            console.log(response.data.wishlist);
            setFetchWishlist(response.data.wishlist);
            
        } catch (error) {
            console.log(error.message);
        }
    }

    //Remove item from wishlist api call
    const removeFromWishlist = async(wishlistid) =>{
        console.log("removing wishlist id is ",wishlistid);
        try {
            const response = await axios.post(`${URL}/user/removeitemfromwishlist`,{
                wishlistid:wishlistid
            },{
                withCredentials:true
            });
            console.log(response.data);
            setWishlistChange(!wishlistChange);
        } catch (error) {
            console.log(error.message);
            setWishlistChange(!wishlistChange);
        }
   }

   //Delete address api call
   const deleteAddress = async(addressid)=>{
        console.log('delete id',addressid);
        try {
            const response = await axios.post(`${URL}/user/deleteaddress`,{
                addressid:addressid
            },{
                withCredentials:true
            })
            console.log(response.data);
            setAddressPageChange(!addressPageChange);
        } catch (error) {
            console.log(error.message);
        }
   }

   //Edit user profile api call
   const editProfileChange =async()=>{
    console.log("Edit Profile Clicked..");
    setLoadingEditProfile(true);
    try {
        const response = await axios.post(`${URL}/user/editprofile`,{
            editProfile:editProfile
        },{withCredentials:true});
        console.log("message    ",response.data.message);
        setUserData({...response.data.user});
        setEditProfileStatus(response.data.message);
        setLoadingEditProfile(false);
    } catch (error) {
        console.log(error.message);
        setLoadingEditProfile(false);
        setEditProfileStatus(response.data.message);
    }
   }

   //search item api call
   const searchInputfnc = async()=>{
        console.log('Input Data',searchInput);
        try {
            setLoadingSearchInput(true);
            const response = await axios.get(`${URL}/products/search/?search=${searchInput}`);
            console.log(response.data); 
            setSearchData(response.data.product);
            setLoadingSearchInput(false);
            setSearchInputStatus('');
            setSeachInput("");
        } catch (error) {
            console.log(error.message)
            setLoadingSearchInput(false);
            setSearchData([]);
            setSearchInputStatus(error.response.data.message);
        }
   }
   
    return(
        <>
            <CreateProductContext.Provider value={{cart ,setCartTotal ,isAddedToCart , setIsAddedToCart,noOfItems,setNoOfitems ,postAddtoCart,userRegistration , setUserRegistration,UserRegistrationHandleSubmit,userLogin , setUserLogin,userLoginHandleSubmit,userData,setUserData,userlogout,authStateChange,showLogoutBtn , setShowLogoutBtn,cartData,cartItems , setCartItems,fetchUser,removeItemFromCart,handleQuanityofEachItem,addtocartChange , setAddtocartChange,submitAddress,saveAddress , setsaveAddress,fetchSavedAddress,setStoreAddress,storeAddress,storeAddressIdForOrder , setStoreAddressIdForOrder ,placeOrderfnc,displayRedirect , setDisplayRedirect,redirectPageName,placeOrderLoading,wishlist , setWishlist,addItemToWishlist,viewOrder,orderData,viewWishlist,fetchWishlist, buyNowData , setBuyNowData,removeFromWishlist,wishlistChange,deleteAddress,addressPageChange,editProfile,setEditProfile,editProfileChange,loadingEditProfile , setLoadingEditProfile ,editProfileStatus,setEditProfileStatus,searchInput , setSeachInput,searchInputfnc ,searchData,loadingSearchInput,searchInputStatus}}>
                {props.children}
            </CreateProductContext.Provider>
        </>
    )
}
export default ShopNowproductContext