import { useContext } from "react";
import { Link } from "react-router-dom";
import { CreateAdminContext } from "../../../Context/AdminContext/CreateAdminContext";

function AdminLogin(){

    const context = useContext(CreateAdminContext);

    const { loginFormData , setLoginFormData , loginHandleSubmit ,isLoading ,loginStatus } = context;
    function loginHandleChange(e){
        const { name , value } = e.target;
        setLoginFormData({
            ...loginFormData,
            [name]:value,
        })
    }
    return(
        <>
            <div>
                <div className="flex justify-center my-3 ">
                    <p className="font-bold text-3xl mt-2 mb-7 underline ">ShopNow Admin</p>

                </div>
                
                <div className=" flex flex-col items-center border-2 border-black p-2 w-96  mx-auto my-8 rounded-2xl  ">                
                    <p className="font-semibold text-2xl mb-7 ">Login Page</p>
                    <form className="flex flex-col items-center" onSubmit={loginHandleSubmit}>
                        <input
                        type="text"
                        placeholder="Enter your username"
                        required
                        className="border border-black my-2 px-3 rounded-2xl py-1 outline-none"
                        onChange={loginHandleChange}
                        name="username"
                        value={loginFormData.username}
                        />
                    
                        <input
                        type="password"
                        placeholder="Enter your password"
                        required
                        className="border border-black my-2 px-3 rounded-2xl py-1 outline-none"
                        onChange={loginHandleChange}
                        name="password"
                        value={loginFormData.password}
                        />
                        <button className="bg-green-900 text-white mx-2 py-1 px-5 rounded-2xl" type="submit">Login</button>
                    </form>
                    <div className="my-2 text-center">
                        {isLoading ?  <p className="text-lg font-semibold text-orange-400">Loading...</p> : <p className="text-sm font-semibold text-red-600">{loginStatus}</p>}
                    </div>
                    <div className="mt-1">
                        <Link  className="underline" to="/admin/registration">Register here</Link>
                    </div>

                </div>
            </div>
        </>
    )
}
export default AdminLogin;