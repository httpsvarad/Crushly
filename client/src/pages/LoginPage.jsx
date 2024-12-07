import { motion } from "framer-motion";
import { Mail, Lock, Eye, EyeOff, Loader } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import useauthStore from "../store/useAuthStore";

const LoginPage = () => {
    const [showPassword, setShowPassword] = useState(false);

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const { login, isLoading, error } = useauthStore();
    const navigate = useNavigate();

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    const handleSubmit = async (e) => {

        e.preventDefault();
        try {
            await login(email, password);
            navigate('/')

        } catch (error) {
            console.log(error)
        }

    }

    return (
        <div className="h-screen flex justify-center items-center">

<motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="max-w-[370px] m-7 bg-black bg-opacity-85 backdrop-filter backdrop-blur-lg rounded-2xl shadow-xl overflow-hidden"
        >
            <div className="p-8">
                <h2 className="text-3xl font-bold mb-6 text-center bg-gradient-to-r from-pink-400 to-pink-600 text-transparent bg-clip-text">
                    Welcome Back
                </h2>

                <form onSubmit={(e) => {
                    handleSubmit(e)
                }}>
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

                    <div className="relative mb-6">
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

                    <div className="flex items-center mb-6">
                        <input
                            type="checkbox"
                            id="demo"
                            className="w-4 h-4 outline-none"
                            required
                        />
                        <label
                            htmlFor="demo"
                            className="ml-2 text-sm text-white"
                        >
                            I agree to not share any personal data over the chats.
                        </label>
                    </div>

                    {error && <p className="text-red-500 mb-2 font-semibold">{error}</p>}

                    <motion.button
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        className="w-full py-3 px-4 bg-gradient-to-r from-pink-500 to-pink-600 text-white font-bold rounded-lg shadow-lg hover:from-pink-600 hover:to-pink-700 focus:outline-none transition duration-200"
                        type="submit"
                        disabled={isLoading}
                    >
                        {isLoading ? <Loader className="animate-spin mx-auto" size={24} /> : "Login"}
                    </motion.button>
                </form>
            </div>
            <div className="px-8 py-4 bg-black bg-opacity-35 flex justify-center">
                <p className="text-sm text-pink-300">
                    Don't have an account?{" "}
                    <Link to="/signup" className="text-pink-400 hover:underline">
                        Sign up
                    </Link>
                </p>
            </div>
        </motion.div>

        </div>
    );
};

export default LoginPage;
