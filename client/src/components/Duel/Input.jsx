import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setInput } from '../../redux/slices/editor/editorSlice';

const Input = () => {
  const dispatch = useDispatch();
  const input = useSelector((state) => state.editor.input)

  return (
    <div className="bg-gray-900 text-white p-4 mt-4 rounded-md w-full shadow-md">
      <h3 className="text-sm font-semibold mb-2 text-gray-300">Input:</h3>
      <textarea
        value={input}
        onChange={(e) => dispatch(setInput(e.target.value))}
        placeholder="Enter input for your program here..."
        rows={5}
        className="w-full bg-gray-800 p-2 rounded text-sm text-white outline-none resize-y"
      />
    </div>
  );
};

export default Input;
