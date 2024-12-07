import { motion } from "framer-motion";
import { Mail, Lock, User, Calendar, Eye, EyeOff, Loader } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import useauthStore from "../store/useAuthStore";

const SignUpPage = () => {
    const [showPassword, setShowPassword] = useState(false);
    const [gender, setGender] = useState("");
    const [genderPreference, setGenderPreference] = useState("");
    const [age, setAge] = useState("");
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();

    const { signup, isLoading, error } = useauthStore();

    const togglePasswordVisibility = () => {
        setShowPassword((prev) => !prev);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            await signup({
                name,
                age: parseInt(age, 10),
                email,
                genderPreference,
                gender,
                password,
            });
            navigate("/");
        } catch (error) {
            console.error("Sign up failed:", error);
        }
    };

    return (
        <div className="flex h-screen overflow-auto justify-center items-center">

<motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="md:max-w-[500px] w-full m-7 bg-black bg-opacity-85 backdrop-filter backdrop-blur-lg rounded-2xl shadow-xl overflow-hidden"
        >
            <div className="p-8">
                <h2 className="text-3xl font-bold mb-6 text-center bg-gradient-to-r from-pink-400 to-pink-600 text-transparent bg-clip-text">
                    Join Crushly
                </h2>

                <form onSubmit={handleSubmit}>
                    <div className="flex md:mb-3 flex-col md:flex-row gap-5">
                        {/* Left Column */}
                        <div>
                            {/* Full Name */}
                            <div className="relative mb-4">
                                <User className="absolute left-3 top-3 text-pink-400" />
                                <input
                                    type="text"
                                    placeholder="Full Name"
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                    required
                                    className="w-full py-3 pl-10 bg-opacity-35 pr-4 bg-gray-700 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500"
                                />
                            </div>

                            {/* Email */}
                            <div className="relative mb-4">
                                <Mail className="absolute left-3 top-3 text-pink-400" />
                                <input
                                    type="email"
                                    placeholder="Email Address"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    required
                                    className="w-full py-3 pl-10 bg-opacity-35 pr-4 bg-gray-700 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500"
                                />
                            </div>

                            {/* Password */}
                            <div className="relative mb-4">
                                <Lock className="absolute left-3 top-3 text-pink-400" />
                                <input
                                    type={showPassword ? "text" : "password"}
                                    placeholder="Password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    required
                                    className="w-full py-3 pl-10 bg-opacity-35 pr-4 bg-gray-700 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500"
                                />
                                {showPassword ? (
                                    <Eye
                                        className="absolute cursor-pointer right-3 top-3 text-pink-400"
                                        onClick={togglePasswordVisibility}
                                    />
                                ) : (
                                    <EyeOff
                                        className="absolute cursor-pointer right-3 top-3 text-pink-400"
                                        onClick={togglePasswordVisibility}
                                    />
                                )}
                            </div>

                            {/* Age */}
                            <div className="relative md:mb-5 mb-0">
                                <Calendar className="absolute left-3 top-3 text-pink-400" />
                                <input
                                    type="number"
                                    placeholder="Age"
                                    required
                                    value={age}
                                    onChange={(e) => setAge(e.target.value)}
                                    min={18}
                                    max={100}
                                    className="w-full py-3 pl-10 bg-opacity-35 pr-4 bg-gray-700 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500"
                                />
                            </div>
                        </div>

                        {/* Right Column */}
                        <div>
                            {/* Gender */}
                            <div className="mb-4">
                                <span className="text-pink-400">Gender</span>
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
                            <div className="mb-6">
                                <span className="text-pink-400">Interested In</span>
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

                    {/* Error Message */}
                    {error && <p className="text-red-500 mb-2 font-semibold">{error}</p>}

                    {/* Submit Button */}
                    <motion.button
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        className="w-full py-3 px-4 bg-gradient-to-r from-pink-500 to-pink-600 text-white font-bold rounded-lg shadow-lg hover:from-pink-600 hover:to-pink-700 focus:outline-none transition duration-200"
                        type="submit"
                        disabled={isLoading}
                    >
                        {isLoading ? <Loader className="animate-spin mx-auto" size={24} /> : "Sign Up"}
                    </motion.button>
                </form>
            </div>
            <div className="px-8 py-4 bg-black bg-opacity-35 flex justify-center">
                <p className="text-sm text-pink-300">
                    Already have an account?{" "}
                    <Link to="/login" className="text-pink-400 hover:underline">
                        Login
                    </Link>
                </p>
            </div>
        </motion.div>

        </div>
    );
};

export default SignUpPage;
