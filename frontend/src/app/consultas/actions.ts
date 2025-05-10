import api from "@/lib/api"

// export const handleGetConsultas = () => {

//     //TODO implementar após backend pronto

// }


export async function handlePostConsulta(consulta: any) {

    //TODO implementar após backend pronto
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