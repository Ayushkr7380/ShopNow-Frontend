import { useContext } from "react"
import { Link } from "react-router-dom"
import { CreateProductContext } from "../../Context/ProductContext/CreateProductContext"
import { useEffect } from "react";
import {PulseLoader} from "react-spinners"

function UserLogin(){
    const context = useContext(CreateProductContext);
    const { userLogin , setUserLogin ,userLoginHandleSubmit ,responseMessage , setresponseMessage , loading} = context;
    useEffect(() => {
        return () => {
                setresponseMessage({});   
        };
    }, []);

    const handleChange = (e)=>{
        const { name , value } = e.target;
        setUserLogin({
            ...userLogin,
            [name]:value
        })
    }
    return(
        <>
            <div className="border-2 border-gray-400 flex justify-center  md:my-[9.3vh] py-4 md:w-[400px] md:mx-auto rounded-md m-3">
                <form onSubmit={userLoginHandleSubmit} className="flex flex-col">
                    <p>Enter phone Number</p>
                    <input 
                        type="text"
                        className="border-2 border-gray-300 px-3 py-1 rounded-md outline-none"
                        name="phone"
                        onChange={handleChange}
                        required
                     />
                     <p>Enter Password</p>
                     <input
                        type="password"
                        className="border-2 border-gray-300 px-3 py-1 rounded-md outline-none"
                        name="password"
                        onChange={handleChange}
                        required
                     />
                     <div className="mt-4  justify-center">
                        <button type="submit" disabled={loading} className="cursor-pointer bg-blue-500 text-white px-4  rounded-lg py-1 hover:bg-blue-700">{
                            loading?(
                                <PulseLoader size={5} color="#ffffff"/>
                             ):("Login")
                        }</button>

                        <Link className="ml-4 underline" to={'/auth/forgot-password'}>Forgotten password?</Link>
                        
                     </div>
                     <div className="flex justify-center">
                        <Link className="cursor-pointer bg-red-500 text-white px-16  rounded-lg py-1 hover:bg-red-700  mt-2 " to={'/auth/userregistration'}>Create new account</Link>
                     </div>
                     {
                        responseMessage&& ( <p className="flex justify-center mt-2">
                        {responseMessage.status === true ? (<span className="text-green-600 font-semibold text-sm">{responseMessage.message}</span> ): (<span className="text-red-600 font-semibold text-sm">{responseMessage.message}</span>)}
                        </p>)
                    }
                </form>
            </div>        
        </>
    )
}

export default UserLogin