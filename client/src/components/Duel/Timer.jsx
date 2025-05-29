import React, { useEffect, useRef, useState } from 'react';
import { Clock } from 'lucide-react'
import { useDispatch, useSelector } from 'react-redux';
import { setEnd, updateTime } from '../../redux/slices/timer/timerSlice';
import { setOpen } from '../../redux/slices/popupMsg/popupSlice';

const Timer = () => {
    const dispatch = useDispatch();
    const time = useSelector((state) => state.timer.time)
    const isRunning = useSelector((state) => state.timer.isRunning)
    const isOpen = useSelector((state) => state.popup.isOpen)
    const startTimestamp = localStorage.getItem('timer_startTimestamp')
    const duration = useSelector((state) => state.timer.duration);

    const prevTime = useRef(time)

    useEffect(() => {
        if (!isRunning || !startTimestamp) return;
        const interval = setInterval(() => {
            const elapsed = Math.floor((Date.now() - Number(startTimestamp)) / 1000);
            const newTime = Math.max(0, duration - elapsed);
            dispatch(updateTime(newTime));
            if (newTime <= 0 && prevTime.current > 0) {
                dispatch(setEnd());
                dispatch(setOpen(`Time's Up !!`));
            }
        }, 1000);
        return () => clearInterval(interval);
    }, [isRunning, startTimestamp, duration, dispatch]);

    useEffect(() => {
        prevTime.current = time;
    }, [time]);


    return (
        <div className="text-2xl bg-gray-900 rounded-xl px-5 font-mono text-yellow-400 flex items-center justify-center space-x-5 p-3 mt-3">
            <Clock size={35} />
            <span>{time}s</span>
        </div>
    );
};

export default Timer;