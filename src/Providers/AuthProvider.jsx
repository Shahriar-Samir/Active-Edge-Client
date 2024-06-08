import { createContext, useEffect, useState } from 'react';
import {createUserWithEmailAndPassword, FacebookAuthProvider, getAuth, GithubAuthProvider, GoogleAuthProvider, onAuthStateChanged, signInWithEmailAndPassword, signInWithPopup, signOut, updateCurrentUser, updateProfile} from 'firebase/auth'
import app from '../Firebase/firebase'
import axios from 'axios';
import useAxiosSecure from '../Hooks/useAxiosSecure';

export const AuthContext = createContext(null)

const AuthProvider = ({children}) => {
    const axiosSecure = useAxiosSecure()
    const auth = getAuth(app)
    const [user,setUser] = useState(null)
    const [loading,setLoading] = useState(true)
    const googleProvider = new GoogleAuthProvider()
    const facebookProvider = new FacebookAuthProvider()
    const githubProvider = new GithubAuthProvider()

    useEffect(()=>{
        
        onAuthStateChanged(auth,currentUser=>{
                if(currentUser){
                    axiosSecure.get(`/user/${currentUser?.uid}`)
                    .then(res=>{
                        const role = res.data.role
                        currentUser.role = role
                        console.log(currentUser)
                        setUser(currentUser)
                        setLoading(false)
                        axiosSecure.post('/jwt', {email:currentUser.email})
                        .then(res=>{
                            if(res.data){
                                console.log(res.data)
                                localStorage.setItem('access-token',res.data.token)
                            }
                        })
                        .catch(err=> console.log(err))
                        })
                        }
                else{
                    localStorage.removeItem('access-token')
                    setLoading(false)
                }
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
        setUser(null)
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