"use client"

import { AuthContext, SignInData } from "@/app/contexts/AuthContext";
import { useRouter } from "next/navigation";
import { parseCookies } from "nookies";
import { useContext, useEffect, useState } from "react";

import Button from "@/components/ui/Button";


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
        //     // TODO: Redirecionar para a página inicial ou outra página desejada
        //     return;
        // }

    };
    return(
         <>
            {/* <form className="base-form flex flex-col w-full max-w-xs gap-4" onSubmit={handleSubmit}>
                <input name="username" type="text" placeholder="Username" className="" value={loginData.username} onChange={handleChange} required />
                <input name="senha" type="password" placeholder="Senha" className="" value={loginData.senha} onChange={handleChange} required />
                <button type="submit" className="btn-primary py-2 text-[16px] font-bold"> Entrar </button>
            </form>
            //FIXME 2 forms? */} 
        <form onSubmit={handleSubmit} className="flex flex-col">
            <label htmlFor="username" className="block mt-[50px] mb-[10px]">Usuário</label>
            <input type="text" name="username" id="username" className="w-full p-1 bg-white rounded"/>
            <label htmlFor="password" className="block mt-[50px] mb-[10px] ">Senha</label>
            <input type="password" name="password" id="password" className="w-full p-1 bg-white rounded"/>
            <button type="submit" className="block bg-blue rounded-[8px] font-bold text-[16px] w-[210px] my-5 h-[40px] cursor-pointer uppercase text-white text-center">Entrar</button>
        </form>
        </>
    )
}
