import HomeProduct from "../HomeProduct/HomeProduct"
import ImageSlider from "../ImageSlider/ImageSlider"

function Home(){
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