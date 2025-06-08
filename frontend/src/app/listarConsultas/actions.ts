import api from "@/lib/api";

export async function handleGetConsultas() {
  try {
    const response = await api.get("/consulta");
    return response.data;
  } catch (error: any) {
    console.error("Erro ao fazer GET:", error.response?.data || error.message);
    throw error;
  }
}

export async function handleGetProcedimentos() {
  try {
    const response = await api.get("/procedimento/nome");
    return response.data;
  } catch (error: any) {
    console.error("Erro ao fazer GET:", error.response?.data || error.message);
    throw error;
  }
}

export async function handleGetDentistas() {
  try {
    const response = await api.get("/dentista/nome");
    return response.data;
  } catch (error: any) {
    console.error("Erro ao fazer GET:", error.response?.data || error.message);
    throw error;
  }
}

export async function handlePutConsulta(consulta: any, id: number) {
  try {
    const response = await api.put("/consulta/" + id, consulta, {
      headers: {"content-type": "application/json"}
    } );
    return response.status;
  } catch (error: any) {
    console.error("Erro ao fazer PUT:", error.response?.data || error.message);
    throw error;
  }
}
