"use client"

import { useEffect, useState } from "react";
import ConsultasDentista from "./components/ConsultasDentista";
import { parseCookies } from 'nookies'

export default function Dashboard() {
    const [username, setUsername] = useState<string | null>(null);

    useEffect(() => {
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

    return (
        <>
            <div>
                <h1 className="font-bold text-center text-blue text-3xl mt-10">Bem vindo, {username}</h1>
                <h1 className="font-bold text-center text-blue text-xl my-10">suas consultas:</h1>
                <ConsultasDentista Id="IdDentista" />
            </div>
        </>

    )
}