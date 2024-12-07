import React, { useEffect } from 'react'
import userpng from '../assets/user.png'
import TinderCard from "react-tinder-card";
import { useMatchStore } from '../store/useMatchStore';
import SwipeFeedback from './SwipeFeedback';
import useauthStore from '../store/useAuthStore';

const SwipeCards = () => {

    const { userProfiles, swipeRight, swipeLeft, subscribeToNewMatches, unsubscribeFromNewMatches,  } = useMatchStore();

    const { authUser } = useauthStore();

    const handleSwipe = (dir, user) => {
		if (dir === "right") swipeRight(user);
		else if (dir === "left") swipeLeft(user);
	};


    // useEffect(() => {
    //     getUserProfile();
    // }, [getUserProfile])

    useEffect(() => {
		authUser && subscribeToNewMatches();

		// return () => {
		// 	unsubscribeFromNewMatches();
		// };
	}, [subscribeToNewMatches, authUser]);


    return (
        <div className='relative w-full flex items-center justify-center max-w-sm h-[28rem]'>
            
            {userProfiles.map((user) => (
                <TinderCard
                    className='absolute shadow-none'
                    key={user._id}
                    onSwipe={(dir) => handleSwipe(dir, user)}
                    swipeRequirementType='position'
                    swipeThreshold={100}
                    preventSwipe={["up", "down"]}
                >
                    <div
                        className='card bg-base-200 w-72 md:w-80 h-auto text-base-content select-none rounded-lg overflow-hidden'
                    >
                        <figure className='px-5 pt-5 h-3/4'>
                            <img
                                src={user.image || userpng}
                                alt={user.name}
                                className='rounded-full object-cover h-full pointer-events-none'
                            />
                        </figure>
                        <div className='card-body bg-base-200'>
                            <h2 className='card-title text-base-content text-2xl'>
                                {user.name}, {user.age}
                            </h2>
                            <p >{user.bio}</p>
                        </div>
                    </div>
                </TinderCard>
            ))}
        </div>
    )
}

export default SwipeCards