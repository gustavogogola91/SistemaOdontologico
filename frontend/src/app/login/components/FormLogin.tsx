"use client"


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
        <form onSubmit={handleSubmit}>
            <label htmlFor="username" className="block">Usuário</label>
            <input type="text" name="username" id="username" />
            <label htmlFor="password" className="block">Senha</label>
            <input type="password" name="password" id="password" />
            <button type="submit">Entrar</button>
        </form>
    )
}
