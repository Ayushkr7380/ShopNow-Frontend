import { useContext ,useEffect} from "react";
import { useParams } from "react-router-dom";
import { CreateProductContext } from "../../Context/ProductContext/CreateProductContext";
import {PulseLoader} from "react-spinners"
const ResetPassword = ()=>{

    const {token} = useParams();
    console.log(token)
    const context = useContext(CreateProductContext);
    const {setResetPassword , resetPassword , resetUserPassword  , responseMessage,setresponseMessage , loading} = context;
    useEffect(() => {
            return () => {
                    setresponseMessage({});   
            };
        }, []);

    const handleChange = (e)=>{
        const { name , value } = e.target;
        setResetPassword({
            ...resetPassword,
            [name]:value,
            token:token
        })
    }

    console.log(resetPassword)
    return (
        <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="bg-white shadow-md rounded-lg p-6 w-96">
        <h2 className="text-xl font-bold mb-4 text-center">Forgot Password</h2>

        <form className="space-y-4" onSubmit={resetUserPassword}>
          
          <div>
            <label className="block text-sm font-medium text-gray-700">Enter new password</label>
            <input
              type="password"
              placeholder="Enter new password"
              className="mt-1 block w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring focus:ring-blue-300"
              onChange={handleChange}
              name="password"
              required
            />
            
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Enter new password again</label>
            <input
              type="password"
              placeholder="Enter new password again"
              className="mt-1 block w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring focus:ring-blue-300"
              onChange={handleChange}
              name="repeatPassword"
              required
            />
            
          </div>

         
          <button
            type="submit"
            required
            disabled={loading}
            className="w-full bg-green-500 hover:bg-green-600 text-white py-2 rounded-lg"
          >
            {
                loading?(
                    <PulseLoader size={5} color="#ffffff"/>
                ):("Reset Password")
            }
          </button>
        </form>

       {
        responseMessage&& ( <p className="flex justify-center mt-2">
            {responseMessage.status === true ? (<span className="text-green-600 font-semibold text-sm">{responseMessage.message}</span> ): (<span className="text-red-600 font-semibold text-sm">{responseMessage.message}</span>)}
        </p>)
       }
        
      </div>
    </div>
    )
}

export default ResetPassword;