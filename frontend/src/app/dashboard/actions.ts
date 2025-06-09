const ApiUrlConsultas = "http://localhost:5143/consulta";


//APIs Consultas
export async function buscarConsultasDentista(id: number) {
  const response = await fetch(`${ApiUrlConsultas}`);
  if (!response.ok) throw new Error("Erro ao carregar consultas");
  return response.json();
}