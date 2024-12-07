import React, { useEffect } from 'react'
import { useMatchStore } from '../store/useMatchStore'
import HomeLoader from './HomeLoader';
import SwipeCards from './SwipeCards';
import SwipeFeedback from './SwipeFeedback';



const HomeCards = () => {

    const { userProfiles, loadingUsers, getUserProfile } = useMatchStore();



    useEffect(() => {
        getUserProfile();
    }, [getUserProfile])

    // console.log('user profiles:', userProfiles)

    // useEffect(() => {
    // 	user && subscribeToNewMatches();

    // 	// return () => {
    // 	// 	unsubscribeFromNewMatches();
    // 	// };
    // }, [subscribeToNewMatches, user]);



    return (
        <div className="flex items-center justify-center" style={{ minHeight: "calc(100vh - 80px)" }}>
            <SwipeFeedback />

            
            {loadingUsers ? <HomeLoader /> : userProfiles.length === 0 ? "No Profiles Found" : <SwipeCards />}

            

        </div>
    )
}

export default HomeCards