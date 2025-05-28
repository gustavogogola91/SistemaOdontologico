"use client"

import { createContext, ReactNode, useEffect, useState } from "react";
import { destroyCookie, parseCookies, setCookie } from "nookies";
import { jwtDecode } from "jwt-decode";


const apiUrl = "http://localhost:5143"

type AuthContextType = {
    IsAuthenticated: boolean,
    loginUsuario: (data: SignInData) => Promise<boolean>
    logoutUsuario: () => Promise<void>
}

export type SignInData = {
    username: string,
    senha: string
}

export const AuthContext = createContext({} as AuthContextType)

export function AuthProvider({ children }: { children: ReactNode }) {
    const [IsAuthenticated, setIsAuthenticated] = useState(false);

    useEffect(() => {
        const { 'auth-token': token } = parseCookies();
        if (token) {
            setIsAuthenticated(true);
        }
    }, []);

    async function loginUsuarioRequest(SignInRequestData: SignInData) {

        try {
            const response = await fetch(`${apiUrl}/login`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(SignInRequestData),
            });

            if (!response.ok) {
                console.log("Erro ao autenticar usuário!");
                return null;
            }

            const data = await response.json();
            // sessionStorage.setItem("usuarioId", data.id);
            // sessionStorage.setItem("usuarioNome", data.nome);
            // console.log("Usuário autenticado:", data.id, data.nome);
            console.log(response.json); //tirar apos debug

            return data;
        } catch (error) {
            console.error("Erro:", error);
            return null;
        }
    }

    async function loginUsuario({ username, senha }: SignInData) {
        // const [user, setUser] = useState<User | null>(null)

        const { token = null } = (await loginUsuarioRequest({ username, senha })) || {};

        if (token) {
            setCookie(undefined, 'auth-token', token, {
                maxAge: 60 * 60 * 1, //1 hora para expirar
            })
            const decodedToken = jwtDecode(token);
            console.log("Token: ", token);
            console.log("Token decoded: ", decodedToken);
            
            // localStorage.setItem('AuthToken', token);
            setIsAuthenticated(true);
            return true;
        }

        return false;
        //TODO: salvar nome usuario
        // setUser(username);
    }

    async function logoutUsuario() {
        destroyCookie(null, 'auth-token');
        setIsAuthenticated(false);
    }

    return (
        <AuthContext.Provider value={{ IsAuthenticated, loginUsuario, logoutUsuario }}>
            {children}
        </AuthContext.Provider>
    )

}