import { createContext, useEffect, useState } from 'react';
import {createUserWithEmailAndPassword, FacebookAuthProvider, getAuth, GithubAuthProvider, GoogleAuthProvider, onAuthStateChanged, signInWithEmailAndPassword, signInWithPopup, signOut, updateCurrentUser, updateProfile} from 'firebase/auth'
import app from '../Firebase/firebase'
import useAxiosPublic from '../Hooks/useAxiosPublic';

export const AuthContext = createContext(null)

const AuthProvider = ({children}) => {
    const axiosPublic = useAxiosPublic()
    const auth = getAuth(app)
    const [user,setUser] = useState(null)
    const [loading,setLoading] = useState(true)
    const googleProvider = new GoogleAuthProvider()
    const facebookProvider = new FacebookAuthProvider()
    const githubProvider = new GithubAuthProvider()

    useEffect(()=>{
        
        onAuthStateChanged(auth,currentUser=>{
                if(currentUser){
                    axiosPublic.post('/jwt', {email:currentUser.email})
                    .then(res=>{
                        localStorage.setItem('access-token',res.data.token)
                        axiosPublic.get(`/userRole/${currentUser?.uid}`)
                        .then(res=>{
                            if(res.data){
                                axiosPublic.get(`/userData/${currentUser?.uid}`)
                                .then(userData=>{
                                    updateProfile(auth.currentUser,userData.data)
                                    .then(()=>{
                                        const role = res.data
                                        currentUser.role = role
                                        setUser(currentUser)
                                        setLoading(false)
                                    })
                                })
                        }
                        if(!res.data){
                            currentUser.role = 'member'
                            setUser(currentUser)
                            setLoading(false)
                            }
                        })
                        .catch(()=>{
                            setLoading(false)
                        })
                    })}
                        
                    else{
                        localStorage.removeItem('access-token')
                        setUser(null)
                        setLoading(false)
                    }
    })
    },[])

    const signup = (email,password)=>{
        setLoading(true)
        return createUserWithEmailAndPassword(auth,email,password)
    }
    const signin = (email,password)=>{
        setLoading(true)
        return signInWithEmailAndPassword(auth,email,password)
    }
    const updateUser = (data)=>{
        setLoading(true)
        return updateProfile(auth.currentUser,data)
    }
    const signout = ()=>{
        setLoading(true)
        setUser(null)
        return signOut(auth)
    }
    const googleAuth = ()=>{
        setLoading(true)
        return signInWithPopup(auth,googleProvider)
    }
    const githubAuth = ()=>{
        setLoading(true)
        return signInWithPopup(auth,githubProvider)
    }
    const facebookAuth = ()=>{
        setLoading(true)
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