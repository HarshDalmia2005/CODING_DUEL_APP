import React, { } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { setLanguage, setVersion } from '../../redux/slices/editor/editorSlice'
import { LANGUAGE_VERSIONS } from './constants'

const languages = Object.entries(LANGUAGE_VERSIONS);

const LanguageSelector = () => {
    const language = useSelector((state) => state.editor.language)
    const dispatch = useDispatch();

    const changeLanguage = (e) => {
        dispatch(setLanguage(e.target.value))
        dispatch(setVersion(LANGUAGE_VERSIONS[e.target.value]))
    }
    return (
        <div className='relative z-50 flex flex-col space-y-3'>
            <label className='text-white text-sm'>Language:</label>
            <select
                value={language}
                onChange={(e) => changeLanguage(e)}
                className='text-white text-xs w-42 bg-gray-800 rounded px-2 py-2 mb-3'
            >
                {
                    languages.map(([lang, version]) => {
                        return <option
                            key={lang}
                            value={lang}
                        >
                           {lang}
                            ({version})
                        </option>
                    })
                }
            </select>
        </div>
    )
}

export default LanguageSelector