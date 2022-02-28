import { signInWithPopup, getAuth, createUserWithEmailAndPassword, updateProfile, signInWithEmailAndPassword, signOut } from 'firebase/auth';

import { googleAuthProvider } from '../firebase/config';
import { types } from "../types";
import { finishLoading, setError, startLoading } from './ui';
import { errors } from '../errors';



export const startLoginEmailPassword = (email, password) => {

    return (dispatch) => {

        dispatch(startLoading())

        signInWithEmailAndPassword(getAuth(), email, password)
            .then(({ user }) => {

                dispatch(login(user.uid, user.displayName))
                dispatch(finishLoading())

            })
            .catch(error => {
                console.error(error.message);
                dispatch(finishLoading());

                for (const prop of errors) {
                    prop.code === error.message && dispatch(setError(prop.msg))
                }

            })

    }
}

export const startRegisterWithEmailPasswordName = (email, password, name) => {

    return (dispatch) => {

        createUserWithEmailAndPassword(getAuth(), email, password)
            .then(async ({ user }) => {

                await updateProfile(user, {
                    displayName: name
                })

                //console.log(user);
                dispatch(login(user.uid, user.displayName))
            })
            .catch(error => console.log(error))
    }
}

export const startGoogleLogin = () => {

    return (dispatch) => {
        signInWithPopup(getAuth(), googleAuthProvider)
            .then(({ user }) => {
                dispatch(login(user.uid, user.displayName))
            })
    }
}


export const login = (uid, displayName) => ({
    type: types.login,
    payload: {
        uid,
        displayName
    }
})

export const startLogout = () => {

    return (dispatch) => {

        signOut(getAuth())
            .then(() => {
                dispatch(logout())
            })
            .catch(error => console.log(error))
    }
}

export const logout = () => ({ type: types.logout })