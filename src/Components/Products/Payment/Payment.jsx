import { useContext, useEffect, useState } from "react"
import { CreateProductContext } from "../../../Context/ProductContext/CreateProductContext";
import axios from "axios";
import ClipLoader from "react-spinners/ClipLoader";

function Payment(){
    const context = useContext(CreateProductContext);
    const { storeAddressIdForOrder ,cart , cartItems ,placeOrderfnc,displayRedirect , setDisplayRedirect,redirectPageName,placeOrderLoading,buyNowData} = context;
    const URL = `http://localhost:5000`;
    const [selectedAddressData , setSelectedAddressData] = useState({});
    
    const fetchSelectedAddress = async()=>{
        try {
            const response = await axios.get(`${URL}/user/addaddress`,{withCredentials:true});
            const allAddress = response.data.address;
            console.log(allAddress);
            const selectedAddress = allAddress.filter((ele)=>ele._id === storeAddressIdForOrder);
            console.log('SelectedAddress in Payment page',selectedAddress);
            setSelectedAddressData(...selectedAddress);
        } catch (error) {
            console.log(error.message);
        }
    }
    const [ buyNowTotalPriceState ,setBuyNowTotalPriceState] = useState(0)
    function buyNowTotalPrice(){
        const totalprice = buyNowData.reduce((acc,item)=>acc + Number(item.price),0);
        setBuyNowTotalPriceState(totalprice);
    }
    useEffect(()=>{
        fetchSelectedAddress();
        setBuyNowTotalPriceState(0);
        buyNowTotalPrice()
    },[]);

    const handleCheckOut = () =>{
        placeOrderfnc();
        setDisplayRedirect(true);
    }
    console.log(selectedAddressData);
    console.log("In P",cartItems);
    console.log("storeAddressIdForOrder",storeAddressIdForOrder);
    
    return(
        <>
            <div className="">
                <div className="border-2 border-black p-2 my-2 mx-3">
                    <div className="font-semibold mx-3 my-2 italic text-lg">
                        <p>Delivery to..</p>
                    </div>
                    {selectedAddressData ? (                       
                    <div  className="border-2 border-black p-3 rounded-lg my-2 ">
                                <p>{selectedAddressData.fullname}</p>
                                <p>{selectedAddressData.housenumber} , {selectedAddressData.roadname}</p>
                                <p>{selectedAddressData.city} , {selectedAddressData.pincode}</p>
                                <p>{selectedAddressData.state}</p>
                                <p className="font-semibold">{selectedAddressData.phonenumber}</p>
                    </div> 
                    ) : (
                        <div className="mx-3 text-red-500 font-semibold">
                            <p>Address Not Selected..!!</p>
                            <p>Please go back to Address Page and Select address</p>
                        </div>
                    )}   
                </div>
                <div className="border-2 border-black p-3 my-2 mx-3">
                    <div className="font-semibold my-2 mx-3">
                        <p className="md:text-2xl italic">Modes of Payment..</p>
                    </div>
                    <div className="mx-3">
                        <div>
                            <input type="radio" disabled className="mr-2"/>
                            <span className="mr-2">Credit/Debit Card</span>
                            <span className="text-gray-300 italic">Unavailable</span>
                        </div>
                        <div>
                            <input type="radio" disabled className="mr-2"/>
                            <span className="mr-2">UPI</span>
                            <span className="text-gray-300 italic">Unavailable</span>
                        </div>
                        <div>
                            <input type="radio" className="mr-2" checked/>
                            <span className="mr-2">Cash on delivery</span>
                        </div>
                        <div>
                            <input type="radio" disabled className="mr-2"/>
                            <span className="mr-2">ShopNow Coins</span>
                            <span className="text-gray-300 italic">Unavailable</span>
                        </div>
                    </div>
                </div>
                <div className="bg-orange-400 text-white py-3 px-5 fixed w-full bottom-0  font-semibold flex justify-between items-center">
                    {buyNowTotalPriceState > 0 ?(
                        <p>Total ₹{buyNowTotalPriceState} /-</p>
                    ):(

                        <p>Total ₹{cart} /-</p>
                    )}
                    <p className="bg-red-500 px-3 py-1 rounded-lg hover:bg-red-700 cursor-pointer" onClick={handleCheckOut}>CheckOut</p>
                </div>
                {displayRedirect && 
                    <div className="bg-gray-200 border-2  h-[200px] w-[80%] text-center fixed top-[50%] left-[10%] py-5 px-2 rounded-2xl">
                        <p className="my-7">{placeOrderLoading && <ClipLoader/>}</p>
                        <p className="font-semibold text-green-700">{redirectPageName}</p>
                    </div>
                }
            </div>
            
        </>
    )
}
export default Payment