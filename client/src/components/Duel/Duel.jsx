import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { socket } from '../socket'
import { useNavigate } from 'react-router'
import { setDisconnected } from '../../redux/slices/socket/socketSlice'
import Timer from './Timer'
import { setEnd, setStartTime } from '../../redux/slices/timer/timerSlice'
import Popup from '../PopUpMsg/Popup'
import { setClose, setOpen } from '../../redux/slices/popupMsg/popupSlice'
import { Unplug } from 'lucide-react'

const Duel = () => {
    const roomId = useSelector((state) => state.socket.roomId)
    const connected = useSelector((state) => state.socket.connected)
    const isRunning = useSelector((state) => state.timer.isRunning)
    const isOpen = useSelector((state) => state.popup.isOpen)
    const duration = useSelector((state) => state.timer.duration);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleDisconnect = () => {
        socket.emit('leaveRoom');
        dispatch(setDisconnected());
        dispatch(setEnd())
        dispatch(setClose())
        navigate('/');
    }
    useEffect(() => {
        socket.on('opponentDisconnected', () => {
            navigate('/')
            console.log('opponent disconnected')
        })
    }, [dispatch, connected])

    useEffect(() => {
        const isRunning = JSON.parse(localStorage.getItem('timer_isRunning'));
        const time = Number(localStorage.getItem('timer_time'));
        const startTimestamp = Number(localStorage.getItem('timer_startTimestamp'));
        if (connected && isRunning && time > 0 && startTimestamp) {
            dispatch(setStartTime(time));
        }
    }, [connected, dispatch]);

    return (
        <>
            {isOpen && <Popup />}
            <div className='min-h-screen bg-black'>
                <div className=''>
                    <div className='flex justify-center space-x-3'>
                        <Timer />
                        <button onClick={handleDisconnect} className='text-2xl bg-gray-900 rounded-xl px-5 font-mono text-yellow-400  space-x-5 p-3 mt-3 flex hover:cursor-pointer'>
                            <Unplug size={35} />
                            <span>Disconnect</span>
                        </button>
                    </div>
                </div>

                // code editor
            </div>

        </>

    )
}

export default Duel