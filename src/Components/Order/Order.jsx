import { useContext, useEffect, useState } from "react"
import { CreateProductContext } from "../../Context/ProductContext/CreateProductContext"

const Order = () => {
  const context = useContext(CreateProductContext);
  const {viewOrder , orderData } = context;


  
  useEffect(()=>{
    viewOrder()
    
  },[])
  
  
  
  // console.log(orderData);
  return (
    <div>
        <div className="md:text-2xl italic p-3 m-2">
          <p>My Orders</p>
        </div>
        <div>

        { orderData && orderData.length > 0 ? ( 
          <div>
              {orderData.map((ele,idx)=>
                <div   key={idx}>
                  
                    {ele.items.map((ele,idx)=>
                      <div key={idx} className="border-2   md:mx-2 my-3  mx-[10px]  p-3 rounded flex items-center ">
                        <img className="md:h-[200px] md:w-[250px] p-3 cursor-pointer  h-[100px] w-[150px]   "   src={ele.product.ProductPhoto.secure_url} alt={''} />
                        <div className=" p-3 mx-3">
                          <p className="text-gray-500 italic">{ele.product.ProductName}</p>
                          <p className="text-gray-500 italic">{ele.product.ProductDescription}</p>
                          <p className="my-3">Quantity : {ele.quantity}</p>
                        </div>
                      </div>
                    )}
                 <hr />
                
                {/* <p className="ml-2">{ele.ProductName}</p> */}
                {/* <p className="ml-2 text-lg font-bold">₹{ele.totalprice}</p>         */}
          </div>   
              )}
          </div>
         ) : ('order is empty')}
         </div>
    </div>
  )
}

export default Order