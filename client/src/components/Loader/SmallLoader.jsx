import React from 'react'
import { useSelector } from 'react-redux'

const SmallLoader = () => {
    const msg=useSelector((state)=>state.loader.msg)
    return (
        <div className="flex flex-col items-center justify-center h-full  text-cyan-400">
            <div className="animate-spin rounded-full h-10 w-10 border-b-4 border-cyan-400 mb-8"></div>
            <div className="text-md font-mono">{msg}</div>
        </div>
    )
}

export default SmallLoader