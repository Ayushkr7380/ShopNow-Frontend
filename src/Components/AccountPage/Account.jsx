import { useContext } from "react"
import { CreateProductContext } from "../../Context/ProductContext/CreateProductContext";
import { FaRegHeart } from "react-icons/fa6";
import { BsBoxSeam } from "react-icons/bs";
import { MdOutlineAccountCircle } from "react-icons/md";
import { Link } from "react-router-dom";
function Account(){
    const context = useContext(CreateProductContext);
    const { userData ,userlogout} = context;
    return(
        <>
            <div className=" m-2 p-2 h-[92vh] md:h-[86vh]">
                <div className="md:text-3xl text-2xl italic font-semibold my-2 md:px-5 px-3">
                    <p>Hello! {userData.name}</p>
                </div>
                <hr />
                <div className=" my-5 p-2 md:flex grid grid-cols-2 gap-2">
                    <Link to={'/wishlist'}>
                        <div className="border-2  md:mx-3 md:px-10 py-1 rounded-md font-medium flex items-center gap-2 px-2 hover:bg-gray-200">
                            <FaRegHeart className="text-blue-700"/>
                            <p>Wishlist</p>
                        </div>
                    </Link>
                    <Link to={'/order'}>
                        <div className="border-2  md:mx-3 md:px-10 px-2 py-1 rounded-md font-medium flex items-center gap-2 hover:bg-gray-200">
                            <BsBoxSeam className="text-blue-700"/>
                            <p >Orders</p>
                        </div>
                    </Link>
                    <Link to={'/profile'}>
                        <div className="border-2  md:mx-3 md:px-10 px-2 py-1 rounded-md font-medium flex items-center gap-2 hover:bg-gray-200">
                            <MdOutlineAccountCircle className="text-blue-700"/>
                            <p>Edit Profile</p>
                        </div>
                    </Link>
                </div>
                <hr />
                <div className="bg-red-500 text-white text-center rounded-md py-1 my-3 font-semibold md:mx-5 mx-3 md:mt-[57vh] mt-[64vh] cursor-pointer hover:bg-red-700"  onClick={userlogout}>
                    <p>Logout</p>
                </div>
            </div>
        </>
    )
}
export default Account