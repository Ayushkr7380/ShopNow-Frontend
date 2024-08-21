import { useContext, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { CreateProductContext } from "../../../Context/ProductContext/CreateProductContext";
import { FaSearch } from "react-icons/fa";

function Navbar(){
    const context = useContext(CreateProductContext);
    const { cart ,noOfItems ,userData,authStateChange,cartData,fetchUser,addtocartChange,setSeachInput,searchInput ,searchInputfnc} = context;
    const navigate = useNavigate();
  
    const handleInputClick =()=>{
        console.log('Input Clicked');
        navigate('/searchpage')        
        searchInputfnc()
    }

    const handleKeyDown = (event) => {
        if (event.key === 'Enter') {
            navigate('/searchpage')        
           searchInputfnc()
        }
      };

    const handleChangeInput = (e) =>{
        setSeachInput(e.target.value)
    }
    useEffect(()=>{
        fetchUser()
        cartData()    
    },[authStateChange,addtocartChange])

   
    return(
    <>
   
    <header className="bg-white"> 
                <div className="mx-auto bg-blue-400 px-4 py-2 flex items-center justify-between">

                
                    <div className=" md:w-48 flex-shrink-0">
                    <Link to={'/'}>
                        <p className="h-8 md:h-10 font-bold md:text-3xl drop-shadow-lg text-white italic">ShopNow</p>
                    </Link>
                    </div>

                    
                    <div className="w-full max-w-xs xl:max-w-lg 2xl:max-w-2xl bg-gray-100 rounded flex items-center justify-between p-1 ml-[20px]">    
                            <input 
                                className="bg-transparent font-semibold text-sm px-3 py-2 w-full outline-none"
                                type="text"
                                placeholder="I'm searching for ..."
                                onChange={handleChangeInput}
                                value={searchInput}
                                onKeyDown={handleKeyDown} 
                            />
                                
                            <div 
                                className="text-xl hover:text-blue-600 cursor-pointer p-2" onClick={handleInputClick}>
                                <FaSearch />
                            </div>
                    </div>
                    
                    <nav className="contents">
                    <ul className="ml-4 xl:w-48 flex items-center justify-end">
                    
                        <li className=" hidden sm:flex flex-col font-bold">
                            <span className="text-xs text-white">Cart</span>
                            <span>₹{cart}</span>
                        </li>
                        
                        <li className="ml-2 lg:ml-4 relative inline-block">
                        <Link className="" to={'/addtocart'} >
                            <div className="absolute -top-1 right-0 z-10 bg-yellow-400 text-xs font-bold px-1 py-0.5 rounded-sm">{noOfItems}</div>
                            <svg className="h-9 lg:h-10 p-2 text-gray-500 svg-inline--fa fa-shopping-cart fa-w-18 fa-9x" aria-hidden="true" focusable="false" data-prefix="far" data-icon="shopping-cart" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512" ><path fill="currentColor" d="M551.991 64H144.28l-8.726-44.608C133.35 8.128 123.478 0 112 0H12C5.373 0 0 5.373 0 12v24c0 6.627 5.373 12 12 12h80.24l69.594 355.701C150.796 415.201 144 430.802 144 448c0 35.346 28.654 64 64 64s64-28.654 64-64a63.681 63.681 0 0 0-8.583-32h145.167a63.681 63.681 0 0 0-8.583 32c0 35.346 28.654 64 64 64 35.346 0 64-28.654 64-64 0-18.136-7.556-34.496-19.676-46.142l1.035-4.757c3.254-14.96-8.142-29.101-23.452-29.101H203.76l-9.39-48h312.405c11.29 0 21.054-7.869 23.452-18.902l45.216-208C578.695 78.139 567.299 64 551.991 64zM208 472c-13.234 0-24-10.766-24-24s10.766-24 24-24 24 10.766 24 24-10.766 24-24 24zm256 0c-13.234 0-24-10.766-24-24s10.766-24 24-24 24 10.766 24 24-10.766 24-24 24zm23.438-200H184.98l-31.31-160h368.548l-34.78 160z"></path></svg>
                        </Link>
                        </li>
                        <li className="ml-2 lg:ml-4 relative ">
                        
                        <Link className="flex items-center" to={ userData && userData.name ? '/account': '/auth/userlogin'}>
                        
                            <svg className="h-9 lg:h-10 p-2 text-gray-500 svg-inline--fa fa-user fa-w-14 fa-9x" aria-hidden="true" focusable="false" data-prefix="far" data-icon="user" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512" ><path fill="currentColor" d="M313.6 304c-28.7 0-42.5 16-89.6 16-47.1 0-60.8-16-89.6-16C60.2 304 0 364.2 0 438.4V464c0 26.5 21.5 48 48 48h352c26.5 0 48-21.5 48-48v-25.6c0-74.2-60.2-134.4-134.4-134.4zM400 464H48v-25.6c0-47.6 38.8-86.4 86.4-86.4 14.6 0 38.3 16 89.6 16 51.7 0 74.9-16 89.6-16 47.6 0 86.4 38.8 86.4 86.4V464zM224 288c79.5 0 144-64.5 144-144S303.5 0 224 0 80 64.5 80 144s64.5 144 144 144zm0-240c52.9 0 96 43.1 96 96s-43.1 96-96 96-96-43.1-96-96 43.1-96 96-96z"></path></svg>
                        
                            <p className="text-white cursor-pointer">{userData.name}</p>
                        </Link>
                        </li>

                        
                    </ul>
                    </nav>

                    
                    
                    
                    
                </div>
            </header>
            </>
    )
}

export default Navbar;