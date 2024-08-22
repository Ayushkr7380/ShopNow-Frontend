import { useContext, useEffect, useState } from "react";
import { useParams ,Link ,useNavigate} from "react-router-dom"
import axios from 'axios';
import { CreateProductContext } from "../../../Context/ProductContext/CreateProductContext";
import { FaRegHeart ,FaHeart } from "react-icons/fa";
import ClipLoader from "react-spinners/ClipLoader";
function EachProduct(){
    const {productid} = useParams();
    const [itemData , setItemData] = useState({});
    const context = useContext(CreateProductContext);
    const { setCartTotal , isAddedToCart , setIsAddedToCart ,noOfItems ,setNoOfitems ,postAddtoCart,userData,authStateChange, wishlist , setWishlist,addItemToWishlist, buyNowData , setBuyNowData} = context;
    const navigate = useNavigate();
    const [ loadingEachItem , setLoadingEachItem] = useState(false);
    const URL = 'http://localhost:5000';
    
    const fetchEachProductdata = async(productid)=>{
        try {
            const response = await axios.get(`${URL}/products/eachitem/${productid}`,{withCredentials:true});
            setItemData(response.data.item);
        } catch (error) {
            console.log(error.message)
        }
    }

    const addtocartfnc =(productid,productprice)=>{
        setCartTotal((prev)=>prev + Number(productprice));
        setIsAddedToCart((prev)=>[...prev , productid]);
        setNoOfitems(noOfItems + 1);
        postAddtoCart(productid,productprice);
    }
    const checkAddedTocartFnc = (productid) =>{
        return isAddedToCart.includes(productid);
    }

    const handleWishlist = (productid) =>{
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

    async function fetchWishlist(){
        try {
            setLoadingEachItem(true);
            const response = await axios.get(`${URL}/user/wishlist`,{withCredentials:true});
            const wishlistProductIds = response.data.wishlist.map(item => item.product._id);
            setLoadingEachItem(false);
            setWishlist(wishlistProductIds);
        } catch (error) {
            setLoadingEachItem(false);
        }
    }

    const handleBuyNow = (productid,price)=>{
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
        fetchEachProductdata(productid);
        setBuyNowData([]);
        fetchWishlist()
    },[authStateChange])
    return(
        <>{loadingEachItem  ? (
            <div className="flex justify-center my-[35vh]">
                <ClipLoader/>
            </div>
        ) : (
            <div className=" m-2">
                <div className=" m-2 p-2 md:flex">
                    <div className="md:w-1/2 p-2 md:p-5 md:mx-2">
                        <img className="md:h-[480px]" src={itemData.ProductPhoto && itemData.ProductPhoto.secure_url} alt={itemData.ProductName}/>
                    </div>
                    <div className="flex p-2  cursor-pointer m-2" onClick={()=>handleWishlist(itemData._id)} >
                            {wishlist.includes(itemData._id) ? ( <FaHeart className="text-xl text-red-600"/> ): (<FaRegHeart className="text-xl"/> )}
                                         
                    </div>
                    <div className="w-[1px] border-[1px] border-gray-400"></div>
                    <div className=" md:w-1/2  p-2 md:mx-[100px] md:flex md:flex-col md:justify-center">
                        <div className=" p-2">
                            <p className="md:text-xl font-semibold italic">{itemData.ProductBrand}</p>
                            <p className="">{itemData.ProductName}</p>
                            <p className="italic text-gray-500">{itemData.ProductDescription}</p>
                            <p className="font-bold md:text-2xl text-lg">₹{itemData.ProductPrice}</p>
                        </div>
                        <div className="flex gap-2 p-2 my-2 cursor-pointer">
                            
                            {userData  ? (
                                checkAddedTocartFnc(itemData._id) ? (
                                    <p className="border-gray-400 border-2 py-1 rounded-md font-semibold bg-green-500 text-white px-2">
                                        Added to cart
                                    </p>
                                ) : (
                                    <p
                                        className="border-2 border-gray-400 py-1 rounded-md font-semibold bg-orange-500 text-white px-2 hover:bg-orange-600"
                                        onClick={() => addtocartfnc(itemData._id, itemData.ProductPrice)}
                                    >
                                        Add to cart
                                    </p>
                                )
                            ) : (
                                <Link to={'/auth/userlogin'}>
                                    <p className="bg-red-500 text-white md:px-3 py-[3px] px-[5px] text-[14px] md:py-2 md:font-semibold rounded-lg hover:bg-red-700">Add to cart</p>
                                </Link>
                            )}
                            <div onClick={()=>handleBuyNow(itemData._id,itemData.ProductPrice)}>
                                <p className="border-2 border-gray-500 py-1 rounded-md font-semibold bg-red-600 text-white px-2">
                                    Buy Now
                                </p>
                            </div>
                        </div>
                    </div>
                    
                </div>
            </div>
            )}
        </>
    )
}

export default EachProduct