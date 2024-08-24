import { useContext, useEffect, useState } from "react"
import { CreateProductContext } from "../../Context/ProductContext/CreateProductContext";
import ClipLoader from "react-spinners/ClipLoader";
const Profile = () => {
  const context = useContext(CreateProductContext);
  const { userData ,editProfile,setEditProfile ,editProfileChange ,loadingEditProfile,editProfileStatus,setEditProfileStatus} = context;
  console.log("userData",userData);
  
  const onChangeEditProfile = (e)=>{
    const {name ,value} = e.target;
    setEditProfile({
      ...editProfile,
      [name]:value
    })
  }

  const submitEditProfile = (e) =>{
    e.preventDefault();
    editProfileChange();
  }
  useEffect(()=>{
    setEditProfile({name:userData.name,phone:userData.phone,email:userData.email});
    setEditProfileStatus('');
  },[])
  console.log(editProfile)
  return (
    <>
        <div className="italic m-2 text-xl font-bold p-2 text-gray-400 ">
          <p>Edit Profile</p>
        </div>
        <hr />
        <div className=" m-2 italic">
            <form className=" m-2 p-2 " onSubmit={submitEditProfile}>
              <div className="flex gap-3">
                <div>
                    <p>Name</p>
                    <input
                        type="text"
                        className="border-2  border-gray-400 rounded-md w-[100%] md:px-2 py-1 px-1 cursor-pointer "
                        onChange={onChangeEditProfile}
                        name='name'
                        value={editProfile.name}
                        />
                </div>
                <div>
                    <p>Phone</p>
                    <input
                        type="text"
                        className="border-2  border-gray-400 rounded-md w-[100%] md:px-2 py-1 px-1 cursor-pointer "
                        onChange={onChangeEditProfile}
                        name='phone'
                        value={editProfile.phone}
                        />
                </div>
              </div>
              <div className="">
                  <p>Email</p>
                  <input
                      type="text"
                      className="border-2  border-gray-400 rounded-md md:w-[30%] md:px-2 py-1 px-1 cursor-pointer "
                      onChange={onChangeEditProfile}
                      name='email'
                      value={editProfile.email}
                  />
              </div>
              {editProfileStatus && <p className="text-center m-3 text-green-600 font-semibold">{editProfileStatus}</p> }
              {loadingEditProfile && <p className="text-center m-3"><ClipLoader/></p> }
              <button className="bg-orange-400 text-white font-semibold px-2 py-1 my-2 text-center rounded-md hover:bg-orange-600 cursor-pointer italic w-[100%]" type="submit">
                Save Edit
              </button>
            </form>
        </div>
    </>
  )
}

export default Profile