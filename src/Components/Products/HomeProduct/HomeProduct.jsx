import { useEffect, useState } from "react";
import axios from "axios";
import { FaAngleRight } from "react-icons/fa";
import { Link } from "react-router-dom";
function HomeProduct({type,title}){
    const [data,setData] = useState([])
    const URL = 'http://localhost:5000';
    async function fetchData(){
        try {
            const response = await axios.get(`${URL}/products/?type=${type}`)
            // console.log(response.data);
            setData([...response.data.filteredproducts])
        } catch (error) {
            console.log(error.message);
        }
    }
    useEffect(()=>{
        fetchData()
    },[])
    // console.log(data);
    return (
        <>  
            <div className=" py-4 relative">
                <div className="mx-[45px] flex justify-between items-center">
                    <p  className="md:text-3xl font-semibold">Trending {title}</p>    
                    <Link to={`/all/?type=${type}`}>
                        <FaAngleRight className="text-white bg-blue-600 hover:bg-red-600 text-2xl rounded-2xl "/>
                    </Link>                                   
                </div>
                <div className="flex justify-center">
                    {data && data.slice(0,4).map((ele,idx)=>
                        <Link key={idx} to={`/products/${ele._id}`}>
                            <div  className="border-2 border-black  md:mx-2 mt-3 md:w-[300px] mx-[3px]  rounded-md p-3 hover:bg-gray-100">
                                <img className="md:w-[300px] p-3" src={ele.ProductPhoto.secure_url} alt={ele.ProductName} />
                                <hr />
                                <p className="ml-2 md:text-lg text-[11px]">{ele.ProductName}</p>
                                <p className="ml-2 md:text-lg md:font-bold ">₹{ele.ProductPrice}</p>
                            </div>
                        </Link>
                    )}
                </div>
            </div>
            <hr />
        </>
    )
};

export default HomeProduct;