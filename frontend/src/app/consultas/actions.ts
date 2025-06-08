import api from "@/lib/api"

export async function handlePostConsulta(consulta: any) {

    console.log(consulta)
    try {
        const response = await api.post("/consulta", consulta, {
            headers: {
              "Content-Type": "application/json",
            }})
        return response.data;
    } catch (error: any) {
        console.error("Erro ao fazer POST:", error.response?.data || error.message);
        throw error;
      }

}

export async function handleGetPacientes(){

    try {
        const response = await api.get("/paciente");
        return response.data
    } catch (error: any) {
        console.error("Erro ao fazer GET:", error.response?.data || error.message);
        throw error;
      }

}

export async function handleGetProcedimentos(){

    try {
        const response = await api.get("/procedimento/nome");
        return response.data
    } catch (error: any) {
        console.error("Erro ao fazer GET:", error.response?.data || error.message);
        throw error;
      }

}

export async function handleGetDentistas(){

    try {
        const response = await api.get("/dentista/nome");
        return response.data
    } catch (error: any) {
        console.error("Erro ao fazer GET:", error.response?.data || error.message);
        throw error;
      }

}