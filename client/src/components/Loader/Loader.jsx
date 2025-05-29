import React from 'react'
import { useSelector } from 'react-redux'

const Loader = () => {
    const msg=useSelector((state)=>state.loader.msg)
    return (
        <div className="flex flex-col items-center justify-center min-h-screen  text-cyan-400">
            <div className="animate-spin rounded-full h-24 w-24 border-b-4 border-cyan-400 mb-8"></div>
            <div className="text-2xl font-mono">{msg}</div>
        </div>
    )
}

export default Loader