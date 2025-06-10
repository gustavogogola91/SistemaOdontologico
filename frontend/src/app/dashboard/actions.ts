import { parseCookies } from "nookies";
const ApiUrlConsultas = "https://sistemaodontologico.onrender.com/consulta";

const {'auth-token': AuthToken} = parseCookies();

//APIs Consultas
export async function buscarConsultasDentista(username: string) {
  const response = await fetch(`${ApiUrlConsultas}/dentista/${username}`, {
    headers: {
      'Authorization': `Bearer ${AuthToken}`
    }
  });
  
  if (!response.ok) throw new Error("Erro ao carregar consultas");
  return response.json();
}
