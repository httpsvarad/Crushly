import React, { useRef, useState } from 'react'
import userpng from '../assets/user.png'
import Header from '../components/Header'
import { motion } from "framer-motion";
import { Calendar, Loader, Mail, MessageCircleQuestion, User } from 'lucide-react';
import { Link } from 'react-router-dom';
import useauthStore from '../store/useAuthStore';
import { useuserStore } from '../store/useUserStore';
import { toast } from 'react-toastify';

const ProfilePage = () => {

  const { user } = useauthStore();
  const { loading, error, updateProfile } = useuserStore();


  const [gender, setGender] = useState(user.gender || "");
  const [genderPreference, setGenderPreference] = useState(user.genderPreference || "");
  const [age, setAge] = useState(user.age || "");
  const [name, setName] = useState(user.name || "");
  const [bio, setBio] = useState(user.bio || "");
  const [image, setImage] = useState(user.image || "");

  const fileInputRef = useRef(null);

  const handleSubmit = async (e) => {
    e.preventDefault()
    await updateProfile({
      name,
      age: parseInt(age, 10),
      gender,
      bio,
      genderPreference,
      image
    })
    toast.success("Profile Updated", {
      position: "top-center"
    });
  };

  const handleImageChange = (e) => {
		const file = e.target.files[0];
		if (file) {
			const reader = new FileReader();
			reader.onloadend = () => {
				setImage(reader.result);
			};

			reader.readAsDataURL(file);
		}
	};

  return (
    <div className='h-screen bg-[#FAF7F5] overflow-auto flex flex-col'>
  {/* Header */}
  <div className='h-20 z-10 w-full  '>
    <Header />
  </div>

  {/* Content Section */}
  <div className='flex-grow flex justify-center items-center '>
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="md:max-w-[645px] w-full m-7 bg-black bg-opacity-85 backdrop-filter backdrop-blur-lg rounded-2xl shadow-xl"
    >
      <div className="p-5">
        <h2 className="text-3xl font-bold mb-6 text-center text-[#D0CAD3]">
          Profile
        </h2>
        <form
          onSubmit={(e) => {
            handleSubmit(e);
          }}
        >
          <div className="flex md:mb-3 flex-col md:flex-row gap-5">
            <div>
              <img
                src={image || userpng}
                alt="User Avatar"
                className="rounded-full w-28 h-28"
              />
            </div>
            {/* Left Column */}
            <div>
              {/* Full Name */}
              <div className="relative mb-4">
                <User className="absolute left-3 top-3 text-[#D0CAD3]" />
                <input
                  type="text"
                  placeholder="Full Name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                  className="w-full py-3 pl-10 bg-opacity-35 pr-4 bg-gray-700 text-white rounded-lg focus:outline-none"
                />
              </div>

              {/* Bio */}
              <div className="relative mb-4">
                <MessageCircleQuestion className="absolute left-3 top-3 text-[#D0CAD3]" />
                <input
                  type="text"
                  placeholder="Bio"
                  value={bio}
                  onChange={(e) => setBio(e.target.value)}
                  className="w-full py-3 pl-10 bg-opacity-35 pr-4 bg-gray-700 text-white rounded-lg focus:outline-none"
                />
              </div>

              {/* Age */}
              <div className="relative mb-0">
                <Calendar className="absolute left-3 top-3 text-[#D0CAD3]" />
                <input
                  type="number"
                  placeholder="Age"
                  required
                  value={age}
                  onChange={(e) => setAge(e.target.value)}
                  min={18}
                  max={100}
                  className="w-full py-3 pl-10 bg-opacity-35 pr-4 bg-gray-700 text-white rounded-lg focus:outline-none"
                />
              </div>
            </div>

            {/* Right Column */}
            <div>
              {/* Gender */}
              <div className="mb-4">
                <span className="text-[#D0CAD3]">Gender</span>
                <div className="flex items-center mt-2">
                  <label className="flex text-white items-center mr-4">
                    <input
                      type="radio"
                      name="gender"
                      value="male"
                      checked={gender === "male"}
                      onChange={(e) => setGender(e.target.value)}
                      className="mr-2"
                    />
                    Male
                  </label>
                  <label className="flex text-white items-center mr-4">
                    <input
                      type="radio"
                      name="gender"
                      value="female"
                      checked={gender === "female"}
                      onChange={(e) => setGender(e.target.value)}
                      className="mr-2"
                    />
                    Female
                  </label>
                </div>
              </div>

              {/* Gender Preference */}
              <div className="mb-4">
                <span className="text-[#D0CAD3]">Interested In</span>
                <div className="flex items-center mt-2">
                  <label className="flex text-white items-center mr-4">
                    <input
                      type="radio"
                      name="genderPreference"
                      value="male"
                      checked={genderPreference === "male"}
                      onChange={(e) => setGenderPreference(e.target.value)}
                      className="mr-2"
                    />
                    Male
                  </label>
                  <label className="flex text-white items-center mr-4">
                    <input
                      type="radio"
                      name="genderPreference"
                      value="female"
                      checked={genderPreference === "female"}
                      onChange={(e) => setGenderPreference(e.target.value)}
                      className="mr-2"
                    />
                    Female
                  </label>
                  <label className="flex text-white items-center">
                    <input
                      type="radio"
                      name="genderPreference"
                      value="both"
                      checked={genderPreference === "both"}
                      onChange={(e) => setGenderPreference(e.target.value)}
                      className="mr-2"
                    />
                    Both
                  </label>
                </div>
              </div>
            </div>
          </div>

          <div className="relative mb-4">
            <p className="text-[#D0CAD3] mb-2">Profile Image</p>
            <input
              type="file"
              accept="image/*"
              className="file-input file-input-primary bg-gray-700 bg-opacity-35 text-white border-none w-full"
              onChange={handleImageChange}
            />
          </div>

          {/* Error Message */}
          {error && (
            <p className="text-red-500 mb-2 font-semibold">{error}</p>
          )}

          {/* Submit Button */}
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="w-full py-3 px-4 bg-[#61bbc0] text-[#030E0F] font-semibold rounded-3xl shadow-lg focus:outline-none transition duration-200"
            type="submit"
            disabled={loading}
          >
            {loading ? (
              <Loader className="animate-spin mx-auto" size={24} />
            ) : (
              "Save Profile"
            )}
          </motion.button>
        </form>
      </div>
    </motion.div>
  </div>
</div>






  )
}

export default ProfilePage