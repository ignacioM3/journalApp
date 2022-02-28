import { addDoc, collection, deleteDoc, doc, getDocs, updateDoc } from 'firebase/firestore';
import Swal from 'sweetalert2';
import { db } from '../firebase/config';
import { types } from '../types';


export const activeNote = (id, note) => ({
    
    type: types.noteActive,
    payload : {
        id,
        ...note
    }
})


export const startNewNotes = () => {

    return async (dispatch, getState) => {
        try {
        const { uid } = getState().auth;

        const newNote = {
            title: '',
            body: '',
            date: new Date().getTime()
        }

      
            const doc = await addDoc(collection(db, `${uid}/journal/notes`), newNote)
            //console.log(doc.id);
            dispatch(activeNote(doc.id,newNote))
        } catch (error) {
            console.error(error)
        }
      
    }
}

export const addNewNote = (note) => ({
    type :  types.noteAddNew,
    payload : note

})

export const loadNotes = () => {

    return async (dispatch,getState) => {

        try {
            const {uid} = getState().auth;
            const notes = [];

            let query = await getDocs(collection(db,`${uid}/journal/notes`))
            
            query.forEach(doc => {
                //console.log(doc.data());
                notes.push({
                    id : doc.id,
                    ...doc.data()
                })
            })

            dispatch(setNotes(notes))

        } catch (error) {
            console.error(error);
        }
    }
}

export const setNotes = (notes) => ({
    type : types.notesLoad,
    payload : notes
})

export const saveNote = (note) => {

    return async (dispatch, getState) => {

        const {uid} = getState().auth;
        
        const noteToFirestore = {...note};
        delete noteToFirestore.id;
        //console.log(noteToFirestore);

        try {

            await updateDoc(doc(db, `${uid}/journal/notes`,note.id ),noteToFirestore)
            //console.log('nota actualizada??')

            dispatch(updateNotes(note.id, note));

        } catch (error) {
            console.error(error);
        }

    }
}

export const updateNotes = (id, note) => ({
    type: types.noteUpdate,
    payload : {
        id,
        note
    }
})

export const startDeleteNote = (id) => {

    return async (dispatch, getState) => {

        const {uid} = getState().auth;

        try {

            await deleteDoc(doc(db, `${uid}/journal/notes`,id))
           //console.log('nota eliminada??')
           dispatch(deleteNote(id))
            
        } catch (error) {
            console.error(error)
        }
    }
}

export const deleteNote = (id) => ({
    type :  types.noteDelete,
    payload : id
})

export const uploadFile = (file) => {

    return async (dispatch, getState) => {

        const {active} = getState().notes;
        const cloudURL = 'https://api.cloudinary.com/v1_1/ignacio359/upload';

        const formData = new FormData();

        formData.append('upload_preset','react-journal');
        formData.append('file', file);

        Swal.fire({
            title : 'Subiendo imagen...',
            text : 'Por favor espere',
            allowOutsideClick : false,
            didOpen : () => {
                Swal.showLoading()
            }
        })

        try {
            
            const response = await fetch(cloudURL,{
                method : 'POST',
                body : formData
            });

            const result = await response.json();

            active.url = result.secure_url;

            dispatch(saveNote(active));

            Swal.close();

        } catch (error) {
            console.error(error);
        }

    }

}