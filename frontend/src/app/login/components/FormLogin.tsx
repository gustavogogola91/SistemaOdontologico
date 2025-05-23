"use client"

import { AuthContext, SignInData } from "@/app/contexts/AuthContext";
import { useRouter } from "next/navigation";
import { parseCookies } from "nookies";
import { useContext, useEffect, useState } from "react";


export const FormLogin = () => {

     const router = useRouter();

    const { 'auth-token': AuthToken } = parseCookies();

    // useEffect(() => {
    //     if (typeof window !== 'undefined') {

    //         if (AuthToken) {
    //             router.push('/Pages/AulasPage');
    //         }
    //     }
    // }, [router]);


    const { loginUsuario } = useContext(AuthContext);

    const [loginData, setLoginData] = useState({
        username: "",
        senha: ""
    });


    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setLoginData({ ...loginData, [name]: value });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        const loginRequestData: SignInData = {
            username: loginData.username,
            senha: loginData.senha
        }

        const success = await loginUsuario(loginRequestData)

        if (success) {
            console.log(localStorage.getItem('AuthToken'));

            // router.push('/Pages/AulasPage');
        } else {
            alert("Email ou senha inválidos!");
        }

        // var usuario = await loginUsuario(loginData.email, loginData.senha);
        // if (usuario !== null) {
        //     alert("Parabens, você lembrou seu login (aqui n temos opção de recuperação, Guarde bem)!");
        //     // Redirecionar para a página inicial ou outra página desejada
        //     return;
        // }

    };
    return(
         <>
            <form className="base-form flex flex-col w-full max-w-xs gap-4" onSubmit={handleSubmit}>
                <input name="username" type="text" placeholder="Username" className="" value={loginData.username} onChange={handleChange} required />
                <input name="senha" type="password" placeholder="Senha" className="" value={loginData.senha} onChange={handleChange} required />
                <button type="submit" className="btn-primary py-2 text-[16px] font-bold"> Entrar </button>
            </form>
        </>
    )
}
