import api from "@/lib/api"

export async function handleGetConsultas(){

    //TODO implementar após backend pronto
    try {
        const response = await api.get("/consulta");
        return response.data
    } catch (error: any) {
        console.error("Erro ao fazer GET:", error.response?.data || error.message);
        throw error;
      }

}