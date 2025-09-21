import { useContext,useEffect } from "react";
import { CreateProductContext } from "../../Context/ProductContext/CreateProductContext";
import {PulseLoader} from "react-spinners"


const ForgotPassword = ()=>{

    const context = useContext(CreateProductContext);

    const { forgotPasswordEmail , setForgotPasswordEmail , forgotPassword , responseMessage,setresponseMessage , loading} = context;

    useEffect(() => {
                return () => {
                        setresponseMessage({});   
                };
            }, []);
    const handleChange = (e)=>{
        const { name , value } = e.target;
        setForgotPasswordEmail({
            ...forgotPasswordEmail,
            [name]:value
        })

    }

    console.log(forgotPasswordEmail)
return (
    <div className="flex justify-center items-center min-h-[90vh] bg-gray-100">
      <div className="bg-white shadow-md rounded-lg p-6 w-96">
        <h2 className="text-xl font-bold mb-4 text-center">Forgot Password</h2>

        <form className="space-y-4" onSubmit={forgotPassword}>
          
          <div>
            <label className="block text-sm font-medium text-gray-700">Email</label>
            <input
              type="email"
              placeholder="Enter your email"
              className="mt-1 block w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring focus:ring-blue-300"
              onChange={handleChange}
              name="email"
              required
            />
            
          </div>

         
          <button
            type="submit"
            required
            className="w-full bg-blue-500 hover:bg-blue-600 text-white py-2 rounded-lg"
          >
            {
                loading?(
                    <PulseLoader size={5} color="#ffffff"/>
                ):("Forgot Password")
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
  );

}

export default ForgotPassword;