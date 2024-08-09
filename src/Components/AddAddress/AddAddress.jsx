import { useContext, useState } from "react";
import { CreateProductContext } from "../../Context/ProductContext/CreateProductContext";

function AddAddress(){
    const context = useContext(CreateProductContext);
    const { submitAddress } = context;
    const [saveAddress , setsaveAddress ] = useState({
        fullname : '',
        phonenumber : '',
        pincode : '',
        city : '',
        state : '',
        housenumber : '',
        roadname : ''
    })
    const handleChange = (e)=>{
        const { name , value } = e.target;
        setsaveAddress({
            ...saveAddress,
            [name]:value
        })
    }
    console.log(saveAddress)
    return(
        <>
            <div className="border-2 m-3 ">
                <form className="flex flex-col my-3  mx-3 md:mx-auto border-2 border-black p-3 md:w-1/2 " onSubmit={submitAddress}>
                    <div>
                        <p>Full Name</p>
                        <input
                            type="text"
                            className="border-2  border-black rounded-md md:w-1/2 md:px-2 py-1 px-1 cursor-pointer"
                            onChange={handleChange}
                            name='fullname'
                            value={saveAddress.fullname}
                        />
                    </div>
                    <div>
                        <p>Phone Number</p>
                        <input
                            type="text"
                            className="border-2  border-black rounded-md md:w-1/2 md:px-2 py-1 px-1 cursor-pointer"
                            onChange={handleChange}
                            name='phonenumber'
                            value={saveAddress.phonenumber}
                        />
                    </div>
                    <div className="md:flex md:gap-3 grid grid-cols-2">
                        <div>
                            <p>Pincode</p>
                            <input
                                type="text"
                                className="border-2  border-black rounded-md  md:px-2 py-1 md:w-full w-[90%] px-1 cursor-pointer"
                                onChange={handleChange}
                                name='pincode'
                                value={saveAddress.pincode}
                            />
                        </div>
                        <div>
                            <p>City</p>
                            <input
                                type="text"
                                className="border-2  border-black rounded-md md:px-2 py-1 md:w-full w-[90%] px-1 cursor-pointer"
                                onChange={handleChange}
                                name='city'
                                value={saveAddress.city}
                            />
                        </div>
                        <div>
                            <p>State</p>
                            <input
                                type="text"
                                className="border-2  border-black rounded-md  md:px-2 py-1 md:w-full w-[90%] px-1 cursor-pointer"
                                onChange={handleChange}
                                name='state'
                                value={saveAddress.state}
                            />
                        </div>                        
                    </div>
                    <div>
                        <p>House No.,Building Name</p>
                        <input
                            type="text"
                            className="border-2  border-black rounded-md md:w-1/2 md:px-2 py-1 px-1 cursor-pointer"
                            onChange={handleChange}
                            name='housenumber'
                            value={saveAddress.housenumber}
                        />
                    </div>
                    <div>
                        <p>Road Name,Area,Colony</p>
                        <input
                            type="text"
                            className="border-2 border-black rounded-md md:w-1/2 md:px-2 py-1 px-1 cursor-pointer"
                            onChange={handleChange}
                            name='roadname'
                            value={saveAddress.roadname}
                        />
                    </div>
                    <button type="submit" className="bg-orange-400 text-white my-3 mx-1 font-semibold md:px-2 py-1 px-1 rounded-lg text-center cursor-pointer hover:bg-orange-600">
                        Save Address
                    </button>

                </form>
            </div>
        </>
    )
}
export default AddAddress