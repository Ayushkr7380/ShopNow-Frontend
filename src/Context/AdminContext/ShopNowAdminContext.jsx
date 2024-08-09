import { useState } from "react";
import { CreateAdminContext } from "./CreateAdminContext";
import axios from 'axios';
import { useNavigate } from "react-router-dom";

function ShopNowAdminContext(props){
    const [formData,setFormData] = useState({username:'',email:'',password:''});
    const [loginFormData,setLoginFormData] = useState({username:'',password:''});
    const [addProductFormData,setAddProductFormData] = useState({
        ProductName:'',
        ProductType : '',
        ProductBrand : '',
        ProductPhoto : null,
        ProductPrice : '',
        ProductDescription : ''
    });
    const [isLoading,setIsLoading] = useState(false);
    const [registrationStatus,setRegistrationStatus] = useState('');
    const [loginStatus,setLoginStatus] = useState('');
    const [addProductStatus,setAddProductStatus] = useState('');
    const [logoutStatus,setLogoutStatus] = useState('');
    

    const navigate = useNavigate();
    

    const URL = 'http://localhost:5000';
    
    //Admin Registration on ShopNow Website

    function registerHandleSubmit(e){
        e.preventDefault();
        console.log('useState FormData',formData);
        async function registerAdmin(){
            try {
                setIsLoading(true)
                const response = await axios.post(`${URL}/auth/registration`,formData,{withCredentials: true});
                console.log(response.data);
                setIsLoading(false)
                navigate('/admin/login')
                
            } catch (error) {
                console.log(error.response.data.message);
                setIsLoading(false)
                const errorMsg = error.response.data.message;
                setRegistrationStatus(errorMsg)

            }
        }
        registerAdmin();
    }

    //Admin Login in ShopNow Website

    function loginHandleSubmit(e){
        e.preventDefault();
        async function loginAdmin(){
            try {
                setIsLoading(true)
                const response = await axios.post(`${URL}/auth/login`,loginFormData ,{withCredentials: true});
                console.log(response)
                console.log(response.data)
                setIsLoading(false)
                navigate('/admin')

            } catch (error) {
                console.log(error.response.data.message)
                setIsLoading(false)
                const errorMsg = error.response.data.message
                setLoginStatus(errorMsg)
            }
        }
        loginAdmin();
    }   

    //Admin Logout from ShopNow Website

    async function adminLogout(){
        try {
            setLoginStatus('')
            const response = await axios.post(`${URL}/auth/logout`,{},{withCredentials: true});
            console.log(response.data);
            navigate("/admin/login/");
        } catch (error) {
            console.log(error.response.data.message)
            
        }
    }

    //AddProduct to ShopNow Website

    function handleAddProductSubmit(e){
            e.preventDefault();
            // console.log(addProductFormData);
            const formData = new FormData();
            for (const key in addProductFormData) {
                formData.append(key, addProductFormData[key]);
            }
            
            async function addProduct(){
                try {
                    setIsLoading(true)
                    const response = await axios.post(`${URL}/auth/`,formData,
                        {
                            withCredentials:true,
                            headers: {
                                'Content-Type': 'multipart/form-data'
                            }
                        });
                    setIsLoading(false)
                    console.log(response.data)
                    
                    const successMsg = response.data.message;
                    setAddProductStatus(successMsg)
                } catch (error) {
                    console.log(error.response.data.message);
                    setIsLoading(false)
                    const errorMsg = error.response.data.message;
                    setAddProductStatus(errorMsg)

                }
            }
            addProduct();
    }
    return(
        <>
            <CreateAdminContext.Provider value={{ formData , setFormData , registerHandleSubmit ,loginFormData,setLoginFormData , loginHandleSubmit ,adminLogout , addProductFormData,setAddProductFormData,handleAddProductSubmit,isLoading,registrationStatus,loginStatus,addProductStatus}}>
                {props.children}
            </CreateAdminContext.Provider>
        </>
    )
}

export default ShopNowAdminContext;