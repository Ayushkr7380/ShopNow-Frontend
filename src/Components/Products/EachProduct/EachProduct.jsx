import { useParams } from "react-router-dom"

function EachProduct(){
    const {productid} = useParams()
    return(
        <>
            <div className="font-semibold text-white bg-black text-lg">{productid}</div>
        </>
    )
}

export default EachProduct