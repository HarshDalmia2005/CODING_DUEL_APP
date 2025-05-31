import React from 'react'
import { useSelector } from 'react-redux'
import Loader from '../Loader/Loader'
import SmallLoader from '../Loader/SmallLoader'

const Output = () => {
    const { output, error } = useSelector((state) => state.editor)
    const isLoading = useSelector((state) => state.loader.isLoading)
    return (
        <div className={`bg-gray-900 ${error != '' ? "text-red-500" : "text-green-500"} p-4 mt-4 rounded-md max-w-[44vw] h-[50vh] overflow-auto shadow-md`}>
            <h3 className="text-sm font-semibold mb-2 text-gray-300">Output:</h3>
            {
                isLoading ? <SmallLoader /> : <pre className="whitespace-pre-wrap break-words text-xs">
                    {
                        output != '' ? output : error
                    }
                </pre>
            }
        </div>
    )
}

export default Output