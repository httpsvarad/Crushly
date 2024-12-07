import { Loader } from 'lucide-react'
import React from 'react'

const HomeLoader = () => {
    return (


        <div className='m-auto'>
            <div className='flex justify-center mb-2 items-center'>
                <Loader className="animate-spin mx-auto" size={32} />
            </div>
            <div>
                <h2 className="text-xl text-center font-semibold">Loading</h2>
            </div>
        </div>
    )
}

export default HomeLoader