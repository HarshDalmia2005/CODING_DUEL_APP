import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setClose } from '../../redux/slices/popupMsg/popupSlice';

const Popup = () => {
    const msg=useSelector((state)=>state.popup.msg)
    const isOpen=useSelector((state)=>state.popup.isOpen)
    const dispatch=useDispatch();
    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center backdrop-blur-sm">
            <div className="relative flex flex-col items-center">
                <div className="text-white text-xl font-mono p-6 rounded-lg shadow-lg">
                    {msg}
                </div>
                {isOpen && (
                    <button
                        className="mt-4 px-4 py-2 rounded border border-cyan-400 text-cyan-400 hover:bg-cyan-900 transition"
                        onClick={()=>dispatch(setClose())}
                    >
                        Close
                    </button>
                )}
            </div>
        </div>
    );
};

export default Popup;