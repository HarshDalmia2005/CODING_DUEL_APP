import { createSlice } from '@reduxjs/toolkit';
import { LANGUAGE_STARTER_CODE } from '../../../components/Duel/constants';

const editorSlice = createSlice({
    name: 'editor',
    initialState: {
        code: LANGUAGE_STARTER_CODE["cpp"],
        language: 'cpp',
        problem: null,
        input: '',
        output: '',
        error: '',
        version: '10.2.0',
        compiling: false
    },
    reducers: {
        setCode: (state, action) => {
            state.code = action.payload;
        },
        setLanguage: (state, action) => {
            state.language = action.payload;
            state.code = LANGUAGE_STARTER_CODE[state.language]
        },
        setInput: (state, action) => {
            state.input = action.payload
        },
        setOutput: (state, action) => {
            state.output = action.payload
        },
        setVersion: (state, action) => {
            state.version = action.payload
        },
        setError: (state, action) => {
            state.error = action.payload
        },
        setCompiling: (state, action) => {
            state.compiling = action.payload
        },
        setProblem: (state, action) => {
            state.problem = action.payload
        }
    },
});

export const { setCode, setLanguage, setInput, setOutput, setVersion, setError, setCompiling, setProblem } = editorSlice.actions;
export default editorSlice.reducer;
