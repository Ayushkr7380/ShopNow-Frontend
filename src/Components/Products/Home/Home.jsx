import { useContext, useEffect } from "react"
import HomeProduct from "../HomeProduct/HomeProduct"
import ImageSlider from "../ImageSlider/ImageSlider"
import { CreateProductContext } from "../../../Context/ProductContext/CreateProductContext";

function Home(){
    const context = useContext(CreateProductContext);
    const { setBuyNowData } = context;
    useEffect(()=>{
        setBuyNowData([]);
    },[])
    return(
        <>                  
            <ImageSlider/> 
            <HomeProduct type='kidsjeans' title="jeans for kid"/>    
            <HomeProduct type='laptop' title="laptops"/>    
            <HomeProduct type='kidsjacket' title="jackets for kid"/>    
            <HomeProduct type='watch' title="watches"/>    
            <HomeProduct type='kidsshirt' title="shirts for kid"/>                
        </>
    )
}
export default Home