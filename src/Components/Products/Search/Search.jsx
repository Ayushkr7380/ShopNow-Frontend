import React, { useContext } from 'react';
import { CreateProductContext } from '../../../Context/ProductContext/CreateProductContext';
import { Link } from 'react-router-dom';
import ClipLoader from "react-spinners/ClipLoader";

const Search = () => {
  const context = useContext(CreateProductContext);
  const { searchData, searchInputStatus, loadingSearchInput } = context;

  return (
    <>
      {loadingSearchInput ? ( 
        <div className='text-center my-[35vh]'>
          <ClipLoader />
        </div>
      ) : (
        <>
          {searchInputStatus ? (
            <div className="text-center mt-10">
              <p className="text-lg font-semibold italic text-gray-500">{searchInputStatus}</p>
            </div>
          ) : (
            <div className='flex justify-center flex-wrap m-2'>
              {searchData.map((ele, idx) => (
                <Link key={idx} to={`/products/${ele._id}`}>
                  <div className="border-2 border-black md:mx-2 mt-3 md:w-[300px] mx-[3px] rounded-md p-3 hover:bg-gray-100">
                    <img className="md:w-[300px] p-3" src={ele.ProductPhoto.secure_url} alt={ele.ProductName} />
                    <hr />
                    <p className="ml-2 md:text-lg text-[15px]">{ele.ProductName}</p>
                    <p className="ml-2 md:text-lg md:font-bold ">₹{ele.ProductPrice}</p>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </>
      )}
    </>
  );
};

export default Search;
