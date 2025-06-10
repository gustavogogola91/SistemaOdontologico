"use client"

import { AuthContext, SignInData } from "@/app/contexts/AuthContext";
import { useRouter } from "next/navigation";
import { parseCookies } from "nookies";
import { useContext, useEffect, useState } from "react";

import Button from "@/components/ui/Button";


export const FormLogin = () => {

     const router = useRouter();
     const { loginUsuario, logoutUsuario } = useContext(AuthContext);

    const { 'auth-token': AuthToken, 'userType' : typeToken  } = parseCookies();

    useEffect(() => {
        if (typeof window !== 'undefined') {

            if (AuthToken) {
                if (typeToken == 'dentista') {
                    router.push('/dashboard');
                } else if (typeToken == 'funcionario') {
                    router.push('/consultas');
                }
                else {
                    logoutUsuario()
                }
            }
        }
    }, [router]);



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
            if (typeToken == 'dentista') {
                router.push('/dashboard');
            } else if (typeToken == 'funcionario') {
                router.push('/consultas');
            }

        } else {
            alert("Email ou senha inválidos!");
        }

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
