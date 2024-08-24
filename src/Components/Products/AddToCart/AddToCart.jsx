import { useContext, useEffect, useState } from "react";
import { CreateProductContext } from "../../../Context/ProductContext/CreateProductContext";
import { Link } from "react-router-dom";
import { MdOutlineDeleteForever } from "react-icons/md";

function AddToCart(){
    const context = useContext(CreateProductContext);
    const { cartData ,cartItems,removeItemFromCart,authStateChange,handleQuanityofEachItem,cart,userData,setBuyNowData} = context;

    const [ quanityOfEachItem , setQuantityOfEachItem] = useState({});
    const [ priceofEachItem ,setPriceOfEachItem] = useState({});
    const [ openInputBox ,setOpenInputBox] = useState({});

    function noofitemsfromcart(){
        cartItems.map((ele)=>setQuantityOfEachItem((prev)=>({...prev,[ele._id]:ele.noofitems})));
        cartItems.map((ele)=>setPriceOfEachItem((prev)=>({...prev,[ele._id]:ele.totalprice})));
  
    }

    useEffect(()=>{
        cartData();
        noofitemsfromcart();
        setBuyNowData([]);
    },[authStateChange])

    const handleChange = (itemid,value,totalprice)=>{
        if(value === 'more'){
            setOpenInputBox((prev)=>({...prev,[itemid]:true}));
        }
        else{
            setOpenInputBox((prev)=>({...prev,[itemid]:false}));
            setQuantityOfEachItem((prev)=>({...prev,[itemid]:value}));

            const total = Number(value)*Number(totalprice);

            setPriceOfEachItem((prev)=>({...prev,[itemid]:total}));
            
            handleQuanityofEachItem(itemid,value,total);
        }
    }

    const handleCustomSubmit = (e,itemid,totalprice)=>{
        e.preventDefault();
        const quantity = quanityOfEachItem[itemid];
        if(Number(quantity) === 0 || Number(quantity) >200){
            setOpenInputBox((prev)=>({...prev,[itemid]:false}));
            setQuantityOfEachItem((prev)=>({...prev,[itemid]:'1'}));
            setPriceOfEachItem((prev)=>({...prev,[itemid]:totalprice}))
            handleQuanityofEachItem(itemid,'1',totalprice);
        }
        else{
            setOpenInputBox((prev)=>({...prev,[itemid]:false}));

            const total = Number(quantity)*Number(totalprice);

            setPriceOfEachItem((prev)=>({...prev,[itemid]:total}))
            handleQuanityofEachItem(itemid,quantity,total);
           
        }

    }

    const handleInputChange = (e,itemid)=>{
        const { value } = e.target;
        setQuantityOfEachItem((prev)=>({...prev,[itemid]:value}));

    }
    return(
        <>
            <div className="py-4 px-2">
                <p className="font-semibold md:text-3xl md:px-10 italic">Hello! {userData.name}</p>
            </div>
            <hr />
            {cartItems.length > 0 ? (

            <>
            <div className="md:flex">
                <div className="md:w-1/2">
                    {cartItems && cartItems.map((ele,idx)=>
                    
                    <div key={idx}>
                        <div className="border-2 border-gray-400 flex m-2  justify-between rounded-md ">
                            <div className="m-3">
                                <img src={ele.products.ProductPhoto.secure_url} alt={ele.products.ProductName} className="md:h-[200px] w-[200px]  p-3"/>
                            </div>
                            <div className="m-3 p-3 flex flex-col justify-center">
                                <p>{ele.products.ProductName}</p>
                                <p>{ele.products.ProductDescription}</p>
                                
                                <p>Quantity :  <select className="border-2 border-black" onChange={(e)=>handleChange(ele._id,e.target.value,ele.products.ProductPrice)} value={quanityOfEachItem[ele._id]}>
                                        <option value="1">1</option>
                                        <option value="2">2</option>
                                        <option value="3">3</option>
                                        {quanityOfEachItem[ele._id] > 3 && <option value={quanityOfEachItem[ele._id]}>{quanityOfEachItem[ele._id]}</option>}
                                        <option value="more">more...</option>
                                    </select> 
                                    {openInputBox[ele._id] && (
                                        <form className="border-2 my-1 border-black p-1 rounded-md bg-gray-300"  onSubmit={(e)=>handleCustomSubmit(e,ele._id,ele.products.ProductPrice)} >
                                            <input type="text" 
                                                onChange={(e)=>handleInputChange(e,ele._id)}
                                                placeholder="Enter Quantity"
                                                min="1"
                                                max="200"
                                                className="p-1 outline-none bg-gray-300 md:w-[84%] w-[80px]"
                                            />
                                            <button type="submit" className=" px-2 py-1 font-semibold bg-orange-700 text-white rounded-lg">ok</button>  
                                        </form>
                                    ) }
                                </p>
                                <p className="font-semibold">₹{priceofEachItem[ele._id] ? (
                                    priceofEachItem[ele._id]
                                ) : (
                                    ele.totalprice
                                )}</p>

                            </div>
                            <div className="m-3 text-2xl h-[30px] flex items-center cursor-pointer text-red-600">
                                <MdOutlineDeleteForever onClick={()=>removeItemFromCart(ele._id)}/>
                            </div>
                        </div>
                    </div>
                    )}
                </div>
                <div className="md:w-[1px] hidden md:block border-[1px] border-black"></div>
                <div className=" md:w-1/2 h-full md:sticky md:top-1  md:px-5 py-3  mx-2">
                    <div className="border-2 border-gray-300   m-2 rounded-md">

                        <table className="my-3 mx-auto">
                            <thead >
                                <tr className="">
                                    <th className="md:px-4 md:text-md text-sm px-1">S.No.</th>
                                    <th className="md:px-4 md:text-md text-sm px-1">ProductName</th>
                                    <th className="md:px-4 md:text-md text-sm px-1">ProductQuantity</th>
                                    <th className="md:px-4 md:text-md text-sm px-1">ProductPrice</th>
                                
                                </tr>
                            </thead>
                            <tbody>
                                

                            {cartItems && cartItems.map((ele,idx)=> 
                                <tr key={idx}>
                                    <td className="md:px-4 text-center ">{idx + 1}.</td>
                                    <td className="md:px-4 text-center font-serif">{ele.products.ProductName}</td>
                                    <td className="md:px-4 text-center">{ele.noofitems}</td>
                                    <td className="md:px-4 text-center ">₹{ele.totalprice}</td>
                                </tr>
                            )}
                        </tbody>
                        </table>
                    </div>
                    <div className="bg-orange-400 text-white md:px-3 px-2 py-1 m-2 md:py-2 md:rounded-xl font-semibold flex justify-between items-center rounded-md">
                        <p className="">Total ₹{cart}</p>
                        <Link to={'/address'}  className="bg-red-800 md:px-3 md:py-2 rounded-lg hover:bg-red-900 px-2 py-1">Proceed</Link>
                    </div>
                </div>
                
            </div>
            
            </>
            ) : (
                <div className="italic text-gray-500 text-center">
                    <p>You cart is empty!!</p>
                </div>
            ) }
        </>
    )
}

export default AddToCart;