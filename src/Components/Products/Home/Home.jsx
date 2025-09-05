import { useContext, useEffect, useState } from "react"
import HomeProduct from "../HomeProduct/HomeProduct"
import ImageSlider from "../ImageSlider/ImageSlider"
import { CreateProductContext } from "../../../Context/ProductContext/CreateProductContext";
import Footer from "../../Footer/Footer";
import axios from "axios";
import ClipLoader from "react-spinners/ClipLoader"; // spinner

function Home() {
    const URL = import.meta.env.VITE_BackendURL;
    const context = useContext(CreateProductContext);

    const { setBuyNowData } = context;
    const [data, setData] = useState({});
    const [loading, setLoading] = useState(true); // loader state
    
    async function fetchData() {
        try {
            setLoading(true);
            const response = await axios.get(`${URL}/products/home`);
            setData(response.data.results);
        } catch (error) {
            console.log(error.message);
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        fetchData();
        setBuyNowData([]);
    }, []);

    return (
        <>                  
            <ImageSlider/> 
            
            {loading ? (
                <div className="flex justify-center items-center h-[300px]">
                    <ClipLoader color="#2563eb" size={30} />
                </div>
            ) : (
                Object.keys(data).map((type, idx) => (
                    <HomeProduct 
                        key={idx} 
                        type={type} 
                        title={type} 
                        data={data[type] || []} 
                    />
                ))
            )}
            
            <Footer/> 
        </>
    )
}

export default Home;
