import React, { useEffect, useState } from 'react'
import userpng from '../assets/user.png'
import { useNavigate } from 'react-router-dom';
import useauthStore from '../store/useAuthStore';
import NoMatches from '../components/NoMatches';
import HomeLoader from '../components/HomeLoader';
import { useMatchStore } from '../store/useMatchStore';
import HomeCards from '../components/HomeCards';

const HomePage = () => {

  const { matches, loadingMatches, getMyMatches } = useMatchStore();

  // const loading = false;
  // const matches = [{_id:"1", name:"Varad"}];

  const { user, logout } = useauthStore();
  const navigate = useNavigate();

  const [theme, setTheme] = useState(false)

  useEffect(() => {

    getMyMatches();

  }, [getMyMatches])


  const handleTheme = () => {
    setTheme(!theme)
  }


  const handleLogout = async () => {

    try {
      await logout();
      navigate('/login');

    } catch (error) {
      console.log(error)
    }

  }


  return (
    <div data-theme={!theme ? "cupcake" : "dark"} className='h-screen flex'>
      <div className='z-10'>
        <div className="drawer lg:drawer-open">
          <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />
          <div className="drawer-content flex flex-col items-center justify-center">
            {/* Page content here */}

          </div>
          <div className="drawer-side">
            <label htmlFor="my-drawer-2" aria-label="close sidebar" className="drawer-overlay"></label>

            <ul className="menu bg-base-200  text-base-content min-h-full w-72 p-4">
              {/* Sidebar content here */}

              <li className='text-xl mt-[0.7rem] mb-5 font-semibold' >Matches</li>

              {loadingMatches ? <HomeLoader /> : matches.length === 0 ? <NoMatches /> : (
                matches.map(match => (
                  <li key={match._id}>
                    <a href={`/chat/${match._id}`}>
                      <div className='text-lg items-center font-medium flex gap-3'>
                        <img className='rounded-full w-10' src={match.image || userpng} alt="" />
                        {match.name}

                      </div>
                    </a>
                  </li>
                ))
              )}

              {/* <li ><a>Sidebar Item 1</a></li>
              <li ><a>Sidebar Item 1</a></li> */}
            </ul>
          </div>
        </div>
      </div>
      <div className='w-full overflow-hidden'>


        <div className='w-full h-20  top-0 left-0 bg-base-100 shadow-sm'>
          <div className='flex justify-between pl-5 pr-5 items-center p-[10px] max-w-screen-xl mx-auto'>
            <div className='text-base-content my-auto text-2xl font-bold'>
              <h2>Crushly</h2>
            </div>
            <div className='flex gap-3  font-semibold text-xl'>

              {/* <div className='m-auto'>
              <button className="btn btn-primary"><Sun size={16} /></button>
              </div> */}

              <div className='m-auto'>
                <label htmlFor="my-drawer-2" className="btn btn-primary drawer-button lg:hidden">
                  Matches
                </label>
              </div>


              <div className='m-auto text-base-content hidden md:block'>
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
                  <li onClick={handleTheme}><a>Theme</a></li>
                  <li onClick={handleLogout}><a>Logout</a></li>
                </ul>
              </div>
            </div>
          </div>
        </div>



        {/* <Header /> */}
        <HomeCards />


      </div>
    </div>
  )
}

export default HomePage