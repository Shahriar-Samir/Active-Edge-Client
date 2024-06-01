import { createContext, useEffect, useState } from 'react';
import {createUserWithEmailAndPassword, FacebookAuthProvider, getAuth, GithubAuthProvider, GoogleAuthProvider, onAuthStateChanged, signInWithEmailAndPassword, signInWithPopup, signOut, updateCurrentUser, updateProfile} from 'firebase/auth'
import app from '../Firebase/firebase'

export const AuthContext = createContext(null)

const AuthProvider = ({children}) => {
    const auth = getAuth(app)
    const [user,setUser] = useState(null)
    const [loading,setLoading] = useState(true)
    const googleProvider = new GoogleAuthProvider()
    const facebookProvider = new FacebookAuthProvider()
    const githubProvider = new GithubAuthProvider()

    useEffect(()=>{
        
        onAuthStateChanged(auth,currentUser=>{
                setUser(currentUser)
                setLoading(false)
        })
    },[])

    const signup = (email,password)=>{
        return createUserWithEmailAndPassword(auth,email,password)
    }
    const signin = (email,password)=>{
        return signInWithEmailAndPassword(auth,email,password)
    }
    const updateUser = (data)=>{
        return updateProfile(auth.currentUser,data)
    }
    const signout = ()=>{
        return signOut(auth)
    }
    const googleAuth = ()=>{
        return signInWithPopup(auth,googleProvider)
    }
    const githubAuth = ()=>{
        return signInWithPopup(auth,githubProvider)
    }
    const facebookAuth = ()=>{
        return signInWithPopup(auth,facebookProvider)
    }

    const userAuth = {signup,signin,signout,googleAuth, facebookAuth, githubAuth,loading,user,setLoading,updateUser}
    return (
        <AuthContext.Provider value={userAuth}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthProvider;