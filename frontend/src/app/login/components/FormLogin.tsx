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
            <form className="base-form flex justify-center items-center flex-col w-full max-w-xs gap-1 p-5" onSubmit={handleSubmit}>
                <label htmlFor="username" className="text-left ">Usuário</label>
                <input name="username" type="text" className="bg-white border-1 border-blue rounded w-[350px] mb-15 p-1" value={loginData.username} onChange={handleChange} required />
                <label htmlFor="senha" className="text-left ">Senha</label>
                <input name="senha" type="password"  className="bg-white border-1 border-blue rounded w-[350px] mb-15 p-1" value={loginData.senha} onChange={handleChange} required />
                <button type="submit" className="btn-primary cursor-pointer py-2 w-1/2 text-[16px] rounded text-white bg-blue font-bold"> ENTRAR </button>
            </form>
        </>
    )
}
