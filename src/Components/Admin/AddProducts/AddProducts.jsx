import {  useContext, useEffect, useState } from "react"
import axios from "axios"
import { useNavigate } from "react-router-dom";
import { CreateAdminContext} from "../../../Context/AdminContext/CreateAdminContext";
function AddProducts(){
    const [adminInfo,setAdminInfo] = useState([]);
    const context = useContext(CreateAdminContext);
    const { adminLogout ,addProductFormData,setAddProductFormData ,handleAddProductSubmit , isLoading, addProductStatus} = context;
    const navigate = useNavigate();
    const URL = `http://localhost:5000`
    async function adminHome(){
        try {           
            const response  = await axios.get(`${URL}/auth/`,{withCredentials:true});
            setAdminInfo(response.data.user);
        } catch (error) {
            navigate('/admin/login')
        }
    }
    useEffect(()=>{
        adminHome()
    },[])

    const addProductHandleChange = (e) =>{
        const {name,value} = e.target; 
        setAddProductFormData({
            ...addProductFormData,
            [name]:value,
        });
    }

    function handleFileChange(e) {
        setAddProductFormData({
            ...addProductFormData,
            ProductPhoto: e.target.files[0]
        });
    }
    return(
        <>
            <div className=" flex justify-between py-2 px-1 bg-slate-900 text-white items-center">
                <div>
                    <p className="md:text-2xl font-semibold ">ShopNow Admin</p>
                </div>
                <div className="flex md:mx-2">
                    <p className="md:mx-2 bg-green-400 px-2 rounded-md cursor-pointer font-semibold md:py-1">{adminInfo.username}</p>
                    <p className="mx-2 bg-red-400 px-2 rounded-md cursor-pointer font-semibold md:py-1" onClick={adminLogout}>Logout</p>
                </div>
            </div>
            <div>
               
                <div className=" flex flex-col items-center border-2 border-black p-2 w-96  mx-auto my-5 rounded-2xl ">                
                    <p className="font-semibold text-2xl mb-7">Add Product</p>
                    <form className="flex flex-col items-center" onSubmit={handleAddProductSubmit}>
                        <div className=" px-3 rounded-lg py-1 w-80">
                                <p  className="text-sm">Enter Product Name</p>
                                <input
                                type="text"
                                name="ProductName"
                                required
                                className=" outline-none bg-slate-200 w-72 p-1 rounded-lg"
                                onChange={addProductHandleChange}
                                />
                        </div>
                        
                        <div className="px-3 rounded-lg py-1 w-80">
                                <p className="text-sm">Enter Product Type</p>
                                <input
                                type="text"
                                name="ProductType"
                                required
                                className=" outline-none bg-slate-200 w-72 p-1 rounded-lg"
                                onChange={addProductHandleChange}
                                />
                        </div>
                        <div className="px-3 rounded-lg py-1 w-80">
                                <p className="text-sm">Enter Product Brand</p>
                                <input
                                type="text"
                                name="ProductBrand"
                                required
                                className=" outline-none bg-slate-200 w-72 p-1 rounded-lg"
                                onChange={addProductHandleChange}
                                />
                        </div>
                        <div className="px-3 rounded-lg py-1 w-80">
                                <p className="text-sm">Select Product Photo</p>
                                <input
                                type="file"
                                name="ProductPhoto"
                                required
                                className="boutline-none bg-slate-200 w-72 p-1 rounded-lg"
                                onChange={handleFileChange}
                                />
                        </div>
                        <div className="px-3 rounded-lg py-1 w-80">
                                <p className="text-sm">Enter Product Price</p>
                                <input
                                type="text"
                                name="ProductPrice"
                                required
                                className="boutline-none bg-slate-200 w-72 p-1 rounded-lg"
                                onChange={addProductHandleChange}
                                />
                        </div>
                        <div className="px-3 rounded-lg py-1 w-80">
                                <p className="text-sm">Enter Product Description</p>
                                <input
                                type="text"
                                name="ProductDescription"
                                required
                                className=" outline-none bg-slate-200 w-72 p-1 rounded-lg"
                                onChange={addProductHandleChange}
                                />
                        </div>
                        <div className="my-2 text-center">
                        {isLoading ?  <p className="text-lg font-semibold text-orange-400">Loading...</p> : <p className="text-sm font-semibold text-red-600">{addProductStatus}</p>}
                        </div>
                        <button className="bg-green-900 text-white mx-2 mt-2 py-1 px-5 rounded-2xl" type="submit">Add Product</button>
                    </form>
                    
                </div>
            </div>
        </>
    )
}

export default AddProducts