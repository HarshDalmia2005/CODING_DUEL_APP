import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { socket } from '../socket';
// import { setDuelResult } from '../../redux/slices/duel/duelSlice';
import { setError, setOutput } from '../../redux/slices/editor/editorSlice';
import { setLoadingFalse, setLoadingTrue } from '../../redux/slices/loader/loaderSlice';

const Execution = () => {
    const dispatch = useDispatch();
    const { language, code, input, version } = useSelector((state) => state.editor)
    const roomId = useSelector((state) => state.socket.roomId)
    const userId = socket.id

    const handleSubmit = () => {
        
        socket.emit('submitCode', {
            room: roomId,
            userId: userId,
            code: code,
            language: language,
            version: version,
            stdin: input || ""
        });
    }

    const handleRun = () => {
        dispatch(setLoadingTrue("Compiling code..."));
        socket.emit('runCode', {
            room: roomId,
            userId: userId,
            code: code,
            language: language,
            version: version,
            stdin: input || ""
        });
    }

    useEffect(() => {
        socket.on('codeOuput', (result) => {
            // dispatch(setDuelResult(result));
            dispatch(setLoadingFalse());
            dispatch(setOutput(result.output))
            dispatch(setError(result.error))
            console.log(result.error)
            // console.log(result)
            console.log(result.output)
        });
        return () => socket.off('codeOutput');
    }, [dispatch]);

    return (
        <div className='space-x-5'>
            <button
                className='text-white shadow shadow-amber-50 p-3 rounded-xl text-md hover:bg-gray-800 hover:cursor-pointer'
                onClick={handleRun}
            >
                Run Code
            </button>
            <button
                className='text-white shadow shadow-amber-50 p-3 rounded-xl text-md hover:bg-gray-800 hover:cursor-pointer'
                onClick={handleSubmit}
            >
                Submit Code
            </button>

        </div>
    )
}

export default Execution