import { useContext , useEffect } from "react"
import { Link } from "react-router-dom"
import { CreateProductContext } from "../../Context/ProductContext/CreateProductContext"
import {PulseLoader} from "react-spinners"

function UserRegistration(){
    const context = useContext(CreateProductContext);
    const {userRegistration , setUserRegistration ,UserRegistrationHandleSubmit ,responseMessage , setresponseMessage , loading} = context;
    useEffect(() => {
            return () => {
                    setresponseMessage({});   
            };
        }, []);

    const handleChange = (e)=>{
        const { name , value } = e.target;
        setUserRegistration({
            ...userRegistration,
            [name]:value
        }) 
    }
    return(
        <>
            <div className="border-2 border-gray-400 flex justify-center md:my-3 py-4 md:w-[400px] md:mx-auto  rounded-md m-3 ">
                <form onSubmit={UserRegistrationHandleSubmit} className="flex flex-col">
                    <p>Enter your name</p>
                    <input 
                        type="text"
                        className="border-2 border-gray-300 outline-none px-3 py-1 rounded-md"
                        onChange={handleChange}
                        name="name"
                        value={userRegistration.name}
                        required
                     />
                    <p>Enter your email</p>
                    <input 
                        type="email"
                        className="border-2 border-gray-300 outline-none px-3 py-1 rounded-md"
                        onChange={handleChange}
                        name="email"
                        value={userRegistration.email}
                        required
                     />
                    <p>Enter phone Number</p>
                    <input 
                        type="text"
                        className="border-2 border-gray-300 outline-none px-3 py-1 rounded-md"
                        onChange={handleChange}
                        name="phone"
                        value={userRegistration.phone}
                        required
                     />
                     <p>Enter Password</p>
                     <input
                        type="password"
                        className="border-2 border-gray-300 outline-none px-3 py-1 rounded-md"
                        onChange={handleChange}
                        name="password"
                        value={userRegistration.password}
                        required
                     />
                     <div className="mt-4 flex justify-center">
                        <button type="submit" disabled={loading} className="cursor-pointer bg-green-500 text-white px-4  rounded-lg py-1 hover:bg-green-700">{
                            loading?(
                    <           PulseLoader size={5} color="#ffffff"/>
                            ):("Create new account")
                            }</button>
                        <Link className="hover:underline ml-4" to={'/auth/userlogin'}>Login</Link>
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
export default UserRegistration