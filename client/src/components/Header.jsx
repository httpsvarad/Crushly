import React from 'react'
import userpng from '../assets/user.png'
import useauthStore from '../store/useAuthStore';
import { Link, useNavigate } from 'react-router-dom';

const Header = () => {

    const { user, logout } = useauthStore();
    const navigate = useNavigate();

    const handleLogout = async () => {

        try {
            await logout();
            navigate('/login');

        } catch (error) {
            console.log(error)
        }

    }

    return (
        <div className='w-full h-20 z-50 top-0 left-0 bg-[#FAF7F5] shadow-sm'>
            <div className='flex justify-between pl-5 pr-5 items-center p-[10px] max-w-screen-xl mx-auto'>
                <div className='text-[#291334] my-auto text-2xl font-bold'>
                    <h2>Crushly</h2>
                </div>
                <div className='flex gap-3  font-semibold text-xl'>




                    <div className='m-auto text-[#291334] hidden md:block'>
                        {user.name}
                    </div>
                    <div className="dropdown mt-[0.4rem] dropdown-end">
                        <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar">
                            <div className="w-16  rounded-full">
                                <img
                                    alt="User Avatar"
                                    src={user.image || userpng} />
                            </div>
                        </div>
                        <ul
                            tabIndex={0}
                            className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow">
                            <li>
                                <a href='/profile' className="justify-between">
                                    Profile
                                </a>
                            </li>
                            <li onClick={handleLogout}><a>Logout</a></li>
                        </ul>
                    </div>

                    <div className='m-auto'>
                        <a href="/" className="btn btn-primary drawer-button">
                            Home
                        </a>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Header;
