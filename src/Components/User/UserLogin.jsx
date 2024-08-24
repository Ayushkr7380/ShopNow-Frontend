import { useContext } from "react"
import { Link } from "react-router-dom"
import { CreateProductContext } from "../../Context/ProductContext/CreateProductContext"
function UserLogin(){
    const context = useContext(CreateProductContext);
    const { userLogin , setUserLogin ,userLoginHandleSubmit} = context;
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
                <form onSubmit={userLoginHandleSubmit}>
                    <p>Enter phone Number</p>
                    <input 
                        type="text"
                        className="border-2 border-gray-300 px-3 py-1 rounded-md outline-none"
                        name="phone"
                        onChange={handleChange}
                     />
                     <p>Enter Password</p>
                     <input
                        type="password"
                        className="border-2 border-gray-300 px-3 py-1 rounded-md outline-none"
                        name="password"
                        onChange={handleChange}
                     />
                     <div className="mt-4 flex justify-center">
                        <button type="submit" className="cursor-pointer bg-blue-500 text-white px-4  rounded-lg py-1 hover:bg-blue-700">Login</button>
                        <Link className="ml-4 hover:underline" to={'/auth/userregistration'}>Signup</Link>
                     </div>
                </form>
            </div>        
        </>
    )
}

export default UserLogin