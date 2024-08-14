import { useContext, useEffect, useState } from "react";
import { Link, useLocation ,useNavigate } from "react-router-dom";
import { FaRegHeart ,FaHeart } from "react-icons/fa";
import axios from "axios";
import { CreateProductContext } from "../../../Context/ProductContext/CreateProductContext";

const AllProducts = () => {

    const context = useContext(CreateProductContext);
    const {setCartTotal , isAddedToCart , setIsAddedToCart ,noOfItems ,setNoOfitems ,postAddtoCart,userData,authStateChange,cartItems,wishlist , setWishlist,addItemToWishlist,setAuthStateChange,buyNowData , setBuyNowData} = context;
    const location = useLocation();

    const navigate = useNavigate();
    const queryParams = new URLSearchParams(location.search);
    
    const type = queryParams.get('type');

    const addtocartfnc =(productid,productprice)=>{
        setCartTotal((prev)=>prev + Number(productprice));
        setIsAddedToCart((prev)=>[...prev , productid]);
        setNoOfitems(noOfItems + 1);
        postAddtoCart(productid,productprice);
    }


    console.log('allpro',userData);
    
    const checkAddedTocartFnc = (productid) =>{
        return isAddedToCart.includes(productid);
    }

    const [data,setData] = useState([]);
    

    const handleWishlist = (productid) =>{
        console.log('Wishlist Clicked.. with ',productid);
        setWishlist((prev)=>{
            if(!prev.includes(productid)){
                return [...prev,productid];
            }
            else{
                return prev.filter(id=>id!==productid);
            }
        });
        addItemToWishlist(productid);    
    }
    // console.log(wishlist);

    const URL = 'http://localhost:5000';
    async function fetchData(){
        try {
            
            const response = await axios.get(`${URL}/products/?type=${type}`);
            setData([...response.data.filteredproducts]);
        } catch (error) {
            console.log(error.message);
        }
    }
    
    async function fetchWishlist(){
        console.log('fetch wishlist data');
        try {
            const response = await axios.get(`${URL}/user/wishlist`,{withCredentials:true});
            console.log("Wishlist items fetched",response.data.wishlist);
            const wishlistProductIds = response.data.wishlist.map(item => item.product._id);
            // setAuthStateChange(!authStateChange);
            console.log("wishlist ids",wishlistProductIds);
            setWishlist(wishlistProductIds);
        } catch (error) {
            console.log(error.message);
        }
    }


    const handleBuyNow = (productid,price)=>{
        console.log('Buy Now id',productid);
        setBuyNowData([{
            'products':{
                "_id":productid
            },
            'noofitems' : '1',  
            "price":price
        }]);
        navigate('/address')
    }
    useEffect(()=>{
        fetchData()
        // cartData()
        setBuyNowData([])
        fetchWishlist()
    },[authStateChange])

    console.log('Buy Now data from allproduct page',buyNowData)
    return (
        <>
        
        <div className="md:text-3xl text-2xl font-bold  m-3 p-3 italic underline">Trending {type}</div>
        <div className=" py-2  relative grid grid-cols-2 md:grid-cols-4 mx-4 sm:grid-cols-3 ">
            {data && data.map((ele,idx)=>
                    <div  className="border-2 border-black  md:mx-2 mt-3 md:w-[300px] mx-[3px]  p-1 md:p-3 rounded-md " key={idx}>
                        <div className="flex p-2 float-right cursor-pointer" onClick={()=>handleWishlist(ele._id)} >
                            {wishlist.includes(ele._id) ? ( <FaHeart className="text-xl text-red-600"/> ): (<FaRegHeart className="text-xl"/> )}
                                         
                        </div>
                        <Link  to={`/products/${ele._id}`}>
                        
                        <div>
                            <img className="md:h-[230px] md:w-[300px] p-3 cursor-pointer" src={ele.ProductPhoto.secure_url} alt={ele.ProductName} />
                        </div>
                        <hr />
                        <p className="ml-2">{ele.ProductName}</p>
                        <p className="ml-2 text-lg font-bold">₹{ele.ProductPrice}</p>
                        </Link>
                        <div className="flex justify-evenly mt-2 gap-[1px] cursor-pointer">
                    
                        {userData  ? (
                                checkAddedTocartFnc(ele._id) ? (
                                    <p className="bg-green-500 text-white md:px-3 py-[3px] px-[5px] text-[14px] md:py-2 md:font-semibold rounded-lg">
                                        Added to cart
                                    </p>
                                ) : (
                                    <p
                                        className="bg-red-500 text-white md:px-3 py-[3px] px-[5px] text-[14px] md:py-2 md:font-semibold rounded-lg hover:bg-red-700"
                                        onClick={() => addtocartfnc(ele._id, ele.ProductPrice)}
                                    >
                                        Add to cart
                                    </p>
                                )
                            ) : (
                                <Link to={'/auth/userlogin'}>
                                    <p className="bg-red-500 text-white md:px-3 py-[3px] px-[5px] text-[14px] md:py-2 md:font-semibold rounded-lg hover:bg-red-700">Add to cart</p>
                                </Link>
                            )}
                            <div onClick={()=>handleBuyNow(ele._id,ele.ProductPrice)}>
                                <p className="bg-orange-500 text-white md:px-3 py-[3px] px-[5px] text-[14px] md:py-2 md:font-semibold rounded-lg hover:bg-orange-600">Buy Now</p>
                            </div>
                        </div>
                    </div>               
            )}
            
        </div>
        </>
    )
}

export default AllProducts;