import { useContext, useEffect } from "react"
import HomeProduct from "../HomeProduct/HomeProduct"
import ImageSlider from "../ImageSlider/ImageSlider"
import { CreateProductContext } from "../../../Context/ProductContext/CreateProductContext";
import Footer from "../../Footer/Footer";

function Home(){
    const context = useContext(CreateProductContext);
    const { setBuyNowData } = context;
    useEffect(()=>{
        setBuyNowData([]);
    },[])
    return(
        <>                  
            <ImageSlider/>                          
            <HomeProduct type='menstshirts' title="T-shirts for mens"/>                
            <HomeProduct type='menshoe' title="shoes for mens"/>                
            <HomeProduct type='mensshirts' title="shirts for mens"/>                
            <HomeProduct type='mensjeans' title="jeans for mens"/>                
            <HomeProduct type='mensjacket' title="jackets for mens"/>  
            <HomeProduct type='womensshoes' title="shoes for womens"/>                
            <HomeProduct type='womensshirts' title="shirts for womens"/>                
            <HomeProduct type='womenstshirts' title="T-shirts for womens"/>                
            <HomeProduct type='womensjeans' title="jeans for womens"/>                
            <HomeProduct type='womensjacket' title="jackets for womens"/>               
            <HomeProduct type='kidsjeans' title="jeans for kid"/>    
            <HomeProduct type='kidsjacket' title="jackets for kid"/>    
            <HomeProduct type='kidsshirt' title="shirts for kid"/>                
            <HomeProduct type='laptop' title="laptops"/>    
            <HomeProduct type='watch' title="watches"/>   
            <Footer/> 
        </>
    )
}
export default Home