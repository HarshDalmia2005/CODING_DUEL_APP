import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { socket } from './socket'
import { useNavigate } from 'react-router'
import { setDisconnected } from '../redux/slices/socket/socketSlice'

const Duel = () => {
    const roomId = useSelector((state) => state.socket.roomId)
    const connected=useSelector((state)=>state.socket.connected)
    const dispatch=useDispatch();
    const navigate = useNavigate();

    const handleDisconnect=()=>{
        socket.emit('leaveRoom');
        dispatch(setDisconnected());
        navigate('/');
    }
    useEffect(() => {
        socket.on('opponentDisconnected', () => {
            navigate('/')
            console.log('opponent disconnected')
        })
    }, [dispatch,connected])

    return (
        <>
            <div>Duel room with ${roomId}</div>
            <button onClick={handleDisconnect}>Disconnect</button>
        </>

    )
}

export default Duel