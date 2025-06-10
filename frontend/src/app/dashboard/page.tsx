"use client"

import { useContext, useEffect, useState } from "react";
import ConsultasDentista from "./components/ConsultasDentista";
import { parseCookies } from 'nookies'
import { AuthContext } from "../contexts/AuthContext";
import { useRouter } from "next/navigation";

export default function Dashboard() {
    const [username, setUsername] = useState<string | null>(null);
    const [loading, setLoading] = useState(true);
    const router = useRouter()
    
    useEffect(()    => {
        try {
            const cookies = parseCookies();
            const userNameFromCookies = cookies.userName || null;
            
            if (userNameFromCookies) {
                setUsername(userNameFromCookies);
                console.log('Username encontrado:', userNameFromCookies);
            } else {
                console.warn('Cookie "userName" não encontrado');
            }
        } catch (error) {
            console.error('Erro ao ler cookies:', error);
            setUsername(null);
        }
    }, []);
    
    const { logoutUsuario } = useContext(AuthContext)
    const { 'auth-token': AuthToken } = parseCookies();

    function loadingAnimation() {
    return (
      <div className="flex flex-col items-center justify-center">
        <div className="h-8 mt-10 w-8 animate-spin rounded-full border-4 border-solid border-blue border-t-transparent"></div>
        <span className="text-gray-600">Carregando...</span>
      </div>
    );
  }

    useEffect(() => {
        if (username == null || username == undefined) {
            setLoading(true)
        } else {

            setLoading(false)
        }

    }, [username])

    useEffect(() => {
    if (!AuthToken) {
      logoutUsuario()
      router.push('/login')
    }
  }, []);

    return (
        <>
            <div>
                <h1 className="font-bold text-center text-blue text-3xl mt-10">Bem vindo, {username}</h1>
                <h1 className="font-bold text-center text-blue text-xl my-10">suas consultas:</h1>
                
                {loading
                ? ( loadingAnimation() )
                : (<ConsultasDentista nome={username} />)}
                
            </div>
        </>

    )
}