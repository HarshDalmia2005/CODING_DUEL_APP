import { createSlice } from '@reduxjs/toolkit';
import { LANGUAGE_STARTER_CODE } from '../../../components/Duel/constants';

const editorSlice = createSlice({
    name: 'editor',
    initialState: {
        code: LANGUAGE_STARTER_CODE["python"],
        language: 'python',
        input:'',
        output:'',
        version:'3.10.0'
    },
    reducers: {
        setCode: (state, action) => {
            state.code = action.payload;
        },
        setLanguage: (state, action) => {
            state.language = action.payload;
            state.code=LANGUAGE_STARTER_CODE[state.language]
        },
        setInput: (state,action)=>{
            state.input=action.payload
        },
        setOutput:(state,action)=>{
            state.output=action.payload
        },
        setVersion:(state,action)=>{
            state.version=action.payload
        }
    },
});

export const { setCode, setLanguage ,setInput,setOutput,setVersion} = editorSlice.actions;
export default editorSlice.reducer;
