import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { Clipboard,Check } from 'lucide-react';

const ProblemCard = () => {
    const problemData = useSelector((state) => state.editor.problem);
    // Track which input/output was last copied
    const [copied, setCopied] = useState({ type: null, idx: null });

    const handleCopy = (text, type, idx) => {
        navigator.clipboard.writeText(text);
        setCopied({ type, idx });
        setTimeout(() => setCopied({ type: null, idx: null }), 1200);
    };

    return (
        <div className="max-w-7xl mx-auto bg-gray-900 shadow-lg rounded-2xl p-6 my-6 border shadow-gray-400">
            <h2 className="text-xl font-bold mb-4 text-yellow-400">Q. {problemData.title}</h2>
            <p className="whitespace-pre-line text-white mb-4 text-sm">{problemData.problem}</p>
            <div className="mb-4">
                <h3 className="font-semibold text-white mb-1">Constraints:</h3>
                <p className="text-white">{problemData.constraints}</p>
            </div>
            <div className="mb-4">
                <h3 className="font-semibold text-gray-800 mb-2">Sample Test Cases:</h3>
                {problemData.sampleInputs.map((input, index) => (
                    <div key={index} className="mb-3 bg-gray-600 p-3 rounded-lg border">
                        <div className="flex items-center mb-1">
                            <p className="text-sm text-yellow-400 font-bold mr-2">Input:</p>
                            <button
                                className="text-xs text-blue-300 hover:text-yellow-500  flex items-center"
                                onClick={() => handleCopy(input, 'input', index)}
                                title="Copy Input"
                            >
                                {copied.type === 'input' && copied.idx === index ? <Check className="text-green-400" /> : <Clipboard size={20} />}
                            </button>
                        </div>
                        <pre className="text-sm bg-gray-600 p-2 rounded text-white">{input}</pre>
                        <div className="flex items-center mt-1">
                            <p className="text-sm text-yellow-400 font-bold mr-2">Output:</p>
                            {/* <button
                                className="text-xs text-blue-300 hover:text-yellow-500 ml-2 flex items-center"
                                onClick={() => handleCopy(problemData.sampleOutputs[index], 'output', index)}
                                title="Copy Output"
                            >
                                {copied.type === 'output' && copied.idx === index ? <Check className="text-green-400" /> : <Clipboard size={20}/>}
                            </button> */}
                        </div>
                        <pre className="text-sm bg-gray-600 p-2 rounded text-white">{problemData.sampleOutputs[index]}</pre>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default ProblemCard;