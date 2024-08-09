import { useContext } from "react"
import { Link } from "react-router-dom"
import { CreateProductContext } from "../../Context/ProductContext/CreateProductContext"

function UserRegistration(){
    const context = useContext(CreateProductContext);
    const {userRegistration , setUserRegistration ,UserRegistrationHandleSubmit} = context;

    const handleChange = (e)=>{
        const { name , value } = e.target;
        setUserRegistration({
            ...userRegistration,
            [name]:value
        }) 
    }
    return(
        <>
            <div className="border-2 border-black flex justify-center my-3 py-4 w-[400px] mx-auto">
                <form onSubmit={UserRegistrationHandleSubmit}>
                    <p>Enter your name</p>
                    <input 
                        type="text"
                        className="border-2 border-black px-3 py-1 rounded-md"
                        onChange={handleChange}
                        name="name"
                        value={userRegistration.name}
                     />
                    <p>Enter your email</p>
                    <input 
                        type="email"
                        className="border-2 border-black px-3 py-1 rounded-md"
                        onChange={handleChange}
                        name="email"
                        value={userRegistration.email}
                     />
                    <p>Enter phone Number</p>
                    <input 
                        type="text"
                        className="border-2 border-black px-3 py-1 rounded-md"
                        onChange={handleChange}
                        name="phone"
                        value={userRegistration.phone}
                     />
                     <p>Enter Password</p>
                     <input
                        type="password"
                        className="border-2 border-black px-3 py-1 rounded-md"
                        onChange={handleChange}
                        name="password"
                        value={userRegistration.password}
                     />
                     <div className="mt-4 flex justify-center">
                        <button type="submit" className="cursor-pointer bg-blue-500 text-white px-4  rounded-lg py-1">Signup</button>
                        <Link className="underline ml-4" to={'/auth/userlogin'}>Login</Link>
                     </div>
                </form>
            </div>
        </>
    )
}
export default UserRegistration