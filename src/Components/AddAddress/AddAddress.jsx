import { useContext, useEffect, useState } from "react";
import { CreateProductContext } from "../../Context/ProductContext/CreateProductContext";
import { FaCirclePlus } from "react-icons/fa6";
import { Link } from "react-router-dom";
import { MdOutlineDeleteForever } from "react-icons/md";

function AddAddress(){

    
    const context = useContext(CreateProductContext);
    const { submitAddress ,saveAddress , setsaveAddress ,fetchSavedAddress , storeAddress ,storeAddressIdForOrder , setStoreAddressIdForOrder,addtocartChange,buyNowData,deleteAddress,addressPageChange} = context;

    const [showAddAddress,setShowAddAddress] = useState(false);
    const [ isSetAddressColor , setAddressIdColor] = useState({});

    
    
    const handleChange = (e)=>{
        const { name , value } = e.target;
        setsaveAddress({
            ...saveAddress,
            [name]:value
        })
    }

    const handleClick = ()=>{
        setShowAddAddress(!showAddAddress);
    }
    // console.log(saveAddress);
    const setAddressIdForOrderfnc = (addressid)=>{
        console.log('selected Address id ',addressid);
        setStoreAddressIdForOrder(addressid);
        setAddressIdColor({[addressid]:"orange"});
    }

    const handleDeleteAddress = (addressid)=>{
        console.log('Deleting address',addressid);
        deleteAddress(addressid);
    }

    useEffect(()=>{
        fetchSavedAddress()
    },[addtocartChange,addressPageChange])
    console.log('StoredAddress',storeAddress);
    console.log(isSetAddressColor);
    console.log('Buy Now data',buyNowData);
    
    return(
        <>
            <div className="m-3">           
                <div className="border-2 my-2 p-2">
                    <div>
                        <p className="font-semibold text-2xl italic">Saved Addresses..</p>
                        <p className="text-gray-400 italic p-1">{storeAddress.length} Saved address</p>
                    </div>
                    <div className="md:flex md:flex-wrap md:gap-3 justify-center ">
                        {storeAddress && storeAddress.map((ele,idx)=>
                        <div className="border-2 border-black  rounded-md m-2">
                            <div className="float-right  p-1 text-xl hover:text-red-500 text-blue-700 cursor-pointer" onClick={()=>handleDeleteAddress(ele._id)}>
                                <MdOutlineDeleteForever />
                            </div>
                            <div key={idx} className={` hover:bg-gray-200 p-2 cursor-pointer ${storeAddressIdForOrder === ele._id ? 'bg-gray-200' : ''}`} onClick={()=>setAddressIdForOrderfnc(ele._id)
                            }>                                
                                <p>{ele.fullname}</p>
                                <p>{ele.housenumber} , {ele.roadname}</p>
                                <p>{ele.city} , {ele.pincode}</p>
                                <p>{ele.state}</p>
                                <p className="font-semibold">{ele.phonenumber}</p>  
                            </div>
                        </div>
                        )}
                    </div>
                </div>
                <div className="border-2 my-2 md:w-[15%] bg-gray-300 rounded-lg flex items-center p-2 cursor-pointer justify-center"  onClick={handleClick}>
                    <FaCirclePlus className="text-red-500"/> 
                    <p className="text-red-600 font-semibold px-2 text-center">Add New Address</p>
                </div>
                {showAddAddress &&
                 (
                    <div className=" my-2">
                        <form className="flex flex-col my-3  mx-3 md:mx-auto border-2 border-gray p-3 md:w-1/2 rounded-md italic" onSubmit={submitAddress}>
                            <div>
                                <p>Full Name</p>
                                <input
                                    type="text"
                                    className="border-2  border-gray-400 rounded-md md:w-1/2 md:px-2 py-1 px-1 cursor-pointer "
                                    onChange={handleChange}
                                    name='fullname'
                                    value={saveAddress.fullname}
                                />
                            </div>
                            <div>
                                <p>Phone Number</p>
                                <input
                                    type="text"
                                    className="border-2  border-gray-400 rounded-md md:w-1/2 md:px-2 py-1 px-1 cursor-pointer "
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
                                        className="border-2  border-gray-400 rounded-md  md:px-2 py-1 md:w-full w-[90%] px-1 cursor-pointer "
                                        onChange={handleChange}
                                        name='pincode'
                                        value={saveAddress.pincode}
                                    />
                                </div>
                                <div>
                                    <p>City</p>
                                    <input
                                        type="text"
                                        className="border-2  border-gray-400 rounded-md md:px-2 py-1 md:w-full w-[90%] px-1 cursor-pointer "
                                        onChange={handleChange}
                                        name='city'
                                        value={saveAddress.city}
                                    />
                                </div>
                                <div>
                                    <p>State</p>
                                    <input
                                        type="text"
                                        className="border-2  border-gray-400 rounded-md  md:px-2 py-1 md:w-full w-[90%] px-1 cursor-pointer "
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
                                    className="border-2  border-gray-400 rounded-md md:w-1/2 md:px-2 py-1 px-1 cursor-pointer "
                                    onChange={handleChange}
                                    name='housenumber'
                                    value={saveAddress.housenumber}
                                />
                            </div>
                            <div>
                                <p>Road Name,Area,Colony</p>
                                <input
                                    type="text"
                                    className="border-2 border-gray-400 rounded-md md:w-1/2 md:px-2 py-1 px-1 cursor-pointer  "
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
                    )}
                    <Link to={storeAddressIdForOrder ? '/payment' : '#'}>
                        <div className={`bg-orange-500 text-white  font-semibold text-center px-3 py-2 rounded-lg hover:bg-orange-700 ${!storeAddressIdForOrder ? 'pointer-events-none opacity-50' : ''}`}>
                            Next
                        </div>
                    </Link>

            </div>
        </>
    )
}
export default AddAddress