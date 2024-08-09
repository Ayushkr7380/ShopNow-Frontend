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
            <div className="border-2 border-black flex justify-center my-3 py-4 w-[400px] mx-auto">
                <form onSubmit={userLoginHandleSubmit}>
                    <p>Enter phone Number</p>
                    <input 
                        type="text"
                        className="border-2 border-black px-3 py-1 rounded-md"
                        name="phone"
                        onChange={handleChange}
                     />
                     <p>Enter Password</p>
                     <input
                        type="password"
                        className="border-2 border-black px-3 py-1 rounded-md"
                        name="password"
                        onChange={handleChange}
                     />
                     <div className="mt-4 flex justify-center">
                        <button type="submit" className="cursor-pointer bg-blue-500 text-white px-4  rounded-lg py-1">Login</button>
                        <Link className="underline ml-4" to={'/auth/userregistration'}>Signup</Link>
                     </div>
                </form>
            </div>        
        </>
    )
}

export default UserLogin