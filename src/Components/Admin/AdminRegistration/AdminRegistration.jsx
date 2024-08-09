import { useContext, useState } from "react"
import { Link } from "react-router-dom"
import { CreateAdminContext } from "../../../Context/AdminContext/CreateAdminContext";


function AdminRegistration(){

    const context = useContext(CreateAdminContext)
    
    const { formData , setFormData ,registerHandleSubmit ,isLoading , registrationStatus } = context;
    function handleChange(e){
        const { name , value } = e.target;
        setFormData({
            ...formData,
            [name]:value,
        })
    }
    
    // console.log(formData);
    return(
        <>
            <div>
                <div className="flex justify-center my-3">
                    <p className="font-bold text-3xl mt-2 mb-7 underline ">ShopNow Admin</p>
                </div>
                
                <div className=" flex flex-col items-center border-2 border-black p-2 w-96  mx-auto my-8 rounded-2xl ">                
                    <p className="font-semibold text-2xl mb-7 ">Registration Page</p>
                    <form className="flex flex-col items-center" onSubmit={registerHandleSubmit}>
                        <input
                        type="text"
                        placeholder="Enter your username"
                        required
                        name="username"
                        className="border border-black my-2 px-3 rounded-2xl py-1 outline-none"
                        onChange={handleChange}
                        value={formData.username}
                        />
                        <input
                        type="text"
                        placeholder="Enter your email"
                        required
                        name="email"
                        className="border border-black my-2 px-3 outline-none rounded-2xl py-1"
                        onChange={handleChange}
                        value={formData.email}
                        />
                        <input
                        type="password"
                        placeholder="Enter your password"
                        required
                        name="password"
                        className="border border-black my-2 px-3 rounded-2xl py-1 outline-none"
                        onChange={handleChange}
                        value={formData.password}
                        />
                        <button className="bg-green-900 text-white mx-2 py-1 px-3 rounded-2xl" type="submit">Register Now</button>
                    </form>
                    <div className="my-2 text-center">
                    {isLoading ?  <p className="text-lg font-semibold">Loading...</p> : <p className="text-sm font-semibold text-red-600">{registrationStatus}</p>}
                    </div>
                    <div className="mt-1">
                        <Link  className="underline" to="/admin/login">Login here</Link>
                    </div>

                </div>
            </div>
        </>
    )
}
export default AdminRegistration