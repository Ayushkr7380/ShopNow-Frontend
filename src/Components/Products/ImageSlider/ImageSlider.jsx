import { Link } from "react-router-dom";
import { FaAngleLeft ,FaAngleRight} from "react-icons/fa";
import { useState } from "react";
function ImageSlider() {
    const images = [
        {
            name:'mens',
            url: 'https://cdn.pixabay.com/photo/2017/09/13/09/21/hockey-2744912_960_720.jpg'
        },
        {
            name:'women',
            url: 'https://cdn.pixabay.com/photo/2012/02/29/15/52/track-19217_1280.jpg'
        },
        {
            name:'kids',
            url: 'https://cdn.pixabay.com/photo/2017/06/21/08/00/pictogram-2426409_1280.jpg'
        },
        // {
        //     name:'phone',
        //     url: 'https://cdn.pixabay.com/photo/2017/08/15/13/21/sun-2643866_1280.jpg'
        // },
        // {
        //     name:'laptop',
        //     url: 'https://cdn.pixabay.com/photo/2017/06/14/07/05/siberian-2401287_1280.jpg'
        // },
    ];

    const [ currentIndex ,setCurrentIndex] = useState(0);

    const prevSlide = ()=>{
        const isFirstSlide = currentIndex === 0;
        const newSlide = isFirstSlide ? images.length - 1 : currentIndex - 1 
        setCurrentIndex(newSlide);
    }

    const nextSlide = ()=>{
        const isLastSlide = currentIndex === images.length - 1;
        const newSlide = isLastSlide ? 0 : currentIndex + 1 
        setCurrentIndex(newSlide);
    }

    return (
        <>
            <div className="max-w-[1400px] h-[350px] w-full m-auto relative">
                <Link to={`${images[currentIndex].name}`}>
                <div 
                    style={{ backgroundImage: `url(${images[currentIndex].url})` }} 
                    className="w-full h-full bg-center bg-cover duration-500 cursor-pointer"
                ></div>
                </Link>
            </div>
            <div className="text-3xl absolute top-[225px] left-[10px]  bg-white p-1 cursor-pointer rounded-lg">
                <FaAngleLeft onClick={prevSlide}/>
            </div>
            <div className="text-3xl absolute top-[225px] right-[10px] bg-white p-1 cursor-pointer rounded-lg">
                <FaAngleRight onClick={nextSlide}/>
            </div>
        </>
    );
}

export default ImageSlider;
