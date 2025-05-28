"use client"

import Button from "@/components/ui/Button";


export const FormLogin = () => {

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        // const loginRequestData: SignInData = {
        //     email: loginData.email,
        //     senha: loginData.senha
        // }

        // const success = await loginUsuario(loginRequestData)

        // if (success) {
        //     console.log(localStorage.getItem('AuthToken'));

        //     router.push('/Pages/AulasPage');
        // } else {
        //     alert("Email ou senha inválidos!");
        // }
    }
    return(
        <form onSubmit={handleSubmit} className="flex flex-col">
            <label htmlFor="username" className="block mt-[50px] mb-[10px]">Usuário</label>
            <input type="text" name="username" id="username" className="w-full p-1 bg-white rounded"/>
            <label htmlFor="password" className="block mt-[50px] mb-[10px] ">Senha</label>
            <input type="password" name="password" id="password" className="w-full p-1 bg-white rounded"/>
            <button type="submit" className="block bg-blue rounded-[8px] font-bold text-[16px] w-[210px] my-5 h-[40px] cursor-pointer uppercase text-white text-center">Entrar</button>
        </form>
    )
}
