import { useContext, useEffect } from "react"
import { CreateProductContext } from "../../Context/ProductContext/CreateProductContext"
import { FaRegHeart } from "react-icons/fa6";
import { Link } from "react-router-dom";
import { MdOutlineDeleteForever } from "react-icons/md";
const Wishlist = () => {
  const context = useContext(CreateProductContext);
  const { viewWishlist ,fetchWishlist ,removeFromWishlist,wishlistChange} = context;


  const handleremoveFromWishlist = (wishlistid) =>{
    removeFromWishlist(wishlistid);
  }
  useEffect(()=>{
    viewWishlist()
  },[wishlistChange])

  console.log("fetch ",fetchWishlist)
  return (
    <div className="m-2 p-2">    
      <div className=" p-2 italic my-2 mx-5">
        <p className="md:text-3xl font-semibold">My Wishlist</p>
        <div className="flex items-center">
          <FaRegHeart className="text-blue-700 mr-1"/>
          <p className="text-gray-400 my-2">{fetchWishlist.length} item in wishlist</p>
        </div>
      </div>
      <hr />
      <div className=" my-2 p-2">
        {fetchWishlist.length > 0 ? (
          <div className=" py-2  relative grid grid-cols-2 md:flex md:flex-wrap mx-4 sm:grid-cols-3">
            {fetchWishlist.map((ele,idx)=>
            <div key={idx} className="border-2 border-gray-400  md:mx-2 mt-3 md:w-[300px] mx-[3px]  p-3 rounded-md " >
                <div className="float-right text-xl text-red-600 cursor-pointer " onClick={()=>handleremoveFromWishlist(ele._id)}>
                  <MdOutlineDeleteForever />
                </div>
                <Link  to={`/products/${ele.product._id}`}>
                  <div>
                      <img className="md:h-[230px] md:w-[300px] p-3 cursor-pointer" src={ele.product.ProductPhoto.secure_url} alt={ele.product.ProductName} />
                  </div>
                <hr/>
                <p className="ml-2">{ele.product.ProductName}</p>
                <p className="ml-2 text-lg font-bold">₹{ele.product.ProductPrice}</p>
                </Link>
            </div>
            )}
          </div>
        ) : (
          <div className="italic text-gray-500 text-center">
            <p>Wishlist is empty!!</p>
          </div>
        )}
      </div>
    </div>
  )
}

export default Wishlist