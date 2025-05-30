import React from 'react'
import { useSelector } from 'react-redux'

const Output = () => {
    const output=useSelector((state)=>state.editor.output)
    return (
        <div className="bg-gray-900 text-white p-4 mt-4 rounded-md w-full h-[50vh] overflow-auto shadow-md">
            <h3 className="text-sm font-semibold mb-2 text-gray-300">Output:</h3>
            <pre className="whitespace-pre-wrap break-words text-sm">
                {output }
            </pre>
        </div>
    )
}

export default Output