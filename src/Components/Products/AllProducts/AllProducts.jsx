import { useContext, useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import axios from "axios";
import { CreateProductContext } from "../../../Context/ProductContext/CreateProductContext";

const AllProducts = () => {

    const context = useContext(CreateProductContext);
    const {setCartTotal , isAddedToCart , setIsAddedToCart ,noOfItems ,setNoOfitems ,postAddtoCart,userData,authStateChange,cartItems} = context;
    const location = useLocation();
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

    const URL = 'http://localhost:5000';
    async function fetchData(){
        try {
            
            const response = await axios.get(`${URL}/products/?type=${type}`);
            setData([...response.data.filteredproducts]);
        } catch (error) {
            console.log(error.message);
        }
    }
    
    useEffect(()=>{
        fetchData()
        // cartData()
    },[authStateChange])
    return (
        <>
        
        <div className="text-3xl font-bold text-red-600">{type}</div>
        <div className=" py-2  relative grid grid-cols-2 md:grid-cols-4 mx-4 sm:grid-cols-3 ">
            {data && data.map((ele,idx)=>
                    <div  className="border-2 border-black  md:mx-2 mt-3 md:w-[300px] mx-[3px]  p-3 rounded-md " key={idx}>
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

                            <p className="bg-orange-500 text-white md:px-3 py-[3px] px-[5px] text-[14px] md:py-2 md:font-semibold rounded-lg hover:bg-orange-600">Buy Now</p>
                        </div>
                    </div>               
            )}
            
        </div>
        </>
    )
}

export default AllProducts;