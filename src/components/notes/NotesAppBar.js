import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { addNewNote, saveNote, uploadFile } from '../../actions/notes'

export const NotesAppBar = () => {

    const dispatch = useDispatch();
    const { active } = useSelector(state => state.notes)

    const handleSave = () => {
        dispatch(saveNote(active))
        dispatch(addNewNote(active))

    }

    const handleFileChange = ({target}) => {
        const file = target.files[0];

        file && dispatch(uploadFile(file))
    }


    return (
        <div className="notes__appbar">
            <span>9 de febrero 2022</span>

                <input
                    type="file"
                    hidden
                    onChange={handleFileChange}
                    id="fileSelector"
                    name="file"
                />
            <div>
                <label
                    className='btn'
                    htmlFor='fileSelector'
                >
                    Subir imagen
                </label>
                <button
                    className="btn"
                    onClick={handleSave}
                >
                    Guardar
                </button>
            </div>
        </div>
    )
}
