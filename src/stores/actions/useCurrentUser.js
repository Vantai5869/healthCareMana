import { useMutation } from "@apollo/client";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { LOGIN } from "../../gql/auth.gql";
import { resetUser, selectCurrentUser, setCurrentUser } from "../user.reducer";

export default function useCurrentUser(){
    const currentUser= useSelector(selectCurrentUser)
    const dispatch= useDispatch();
    
    const [startLogin,{data,error, loading}]= useMutation(LOGIN)
    const resetAuth=()=>{
        dispatch(resetUser())
    }

    useEffect(() => {
        if(!currentUser){
            const user= localStorage.getItem('user');
            if(user)
            dispatch(setCurrentUser(JSON.parse(user)))
        }
    }, [])

    if(data){
        dispatch(setCurrentUser(data.login.user))
    }
    return {startLogin, loading,error,resetAuth, data,currentUser}
}
