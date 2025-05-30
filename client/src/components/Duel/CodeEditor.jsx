import React, { useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { setCode } from '../../redux/slices/editor/editorSlice';
import Editor from '@monaco-editor/react';
import LanguageSelector from './LanguageSelector';

const CodeEditor = () => {
    const editorRef = useRef(null);
    const code = useSelector((state) => state.editor.code)
    const language = useSelector((state) => state.editor.language)
    const dispatch = useDispatch();
    console.log(code)
    const handleEditorDidMount = (editor) => {
        editorRef.current = editor
        editor.focus();
    }
    return (
        <div className=''>
            <LanguageSelector />
            <Editor
                height="70vh"
                width={"50vw"}
                language={language}
                defaultValue="// some comment"
                onMount={handleEditorDidMount}
                theme="vs-dark"
                value={code}
                onChange={(value) => dispatch(setCode(value))}
                options={{
                    fontSize: 10, // Change this to desired font size
                    minimap: { enabled: false },
                    padding:{
                        top:20,
                        bottom:20
                    }
                }}
            />
        </div>
    )
}

export default CodeEditor