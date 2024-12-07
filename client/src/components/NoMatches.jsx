
import { HeartOff } from 'lucide-react'
import React from 'react'

const NoMatches = () => {
    return (


        <div className='m-auto'>
            <div className='flex justify-center mb-2 items-center'>
                <HeartOff size={32} />
            </div>
            <div>
                <h2 className="text-xl text-center font-semibold">No Matches Yet</h2>
                <p className="text-sm text-center mt-2">Keep swiping to find your perfect match.</p>
            </div>
        </div>


    )
}

export default NoMatches