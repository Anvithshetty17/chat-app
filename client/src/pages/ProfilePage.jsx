import React, {useState} from 'react'
import { useNavigate } from 'react-router-dom'
import assets from '../assets/assets';
import { useContext } from 'react';
import { AuthContext } from '../../context/AuthContext';

const ProfilePage = () => {

  const {authUser, updateProfile} = useContext(AuthContext)

  const [selectedImage, setSelectedImage] = useState(null)
  const navigate = useNavigate();
  const [name, setName] = useState(authUser.fullName);
  const [bio, setBio] = useState(authUser.bio);

  const handleSubmit = async(e)=>{
    e.preventDefault();
    if(!selectedImage){
      await updateProfile({fullName : name, bio})
      navigate('/')
      return;
    }

    const reader = new FileReader(); // read the fiels like image 
    reader.readAsDataURL(selectedImage); // read the image as data URL (convert img => base64)

    reader.onload = async() =>{
      const base64Image = reader.result; // base64 encoded image
      await updateProfile({
        fullName: name,
        bio,
        profilePic: base64Image
      })
      navigate('/');
    }

  }

  return (
    <div className='min-h-screen bg-cover bg-no-repeat flex items-center justify-center'>
      <div className="w-5/6 max-w-2xl backdrop-blur-2xl text-gray-300 border-2 border-gray-600 flex items-center justify-between max-sm:flex-col-reverse rounded-lg">

        <form onSubmit={handleSubmit}className='flex flex-col gap-5 p-10 flex-1'>

          <h3 className='text-lg'>Profile Details</h3>
          
          <input onChange={(e)=>{setName(e.target.value)}} value={name}
          type="text" required placeholder='Your name' className='p-2 border border-gray-500 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500'/>

          <textarea onChange={(e)=>{setBio(e.target.value)}} value={bio} placeholder='Write profile bio' required className='p-2 border border-gray-500 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500'></textarea>

          <button type='submit' className='py-3 bg-gradient-to-r from-blue-700 to-blue-40 text-white rounded-full cursor-pointer'>Save</button>
        </form>

        <img src={authUser.profilePic ? authUser.profilePic : assets.logo_icon}  className={`max-w-44 aspect-square rounded-full mx-10 max-sm:mt-10 ${selectedImage && 'rounded-full'}`}  alt="" />

      </div>
    </div>
  )
}

export default ProfilePage
