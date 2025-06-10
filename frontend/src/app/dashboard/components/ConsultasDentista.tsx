"use client"
import { useEffect, useState } from "react"
import { buscarConsultasDentista } from "../actions";

interface Consulta {
    id: number,
    paciente: Paciente,
    dataHora: string,
    procedimentos: Procedimento[],
    observacoes: string,
}


interface Paciente {
    id: number,
    nome: string,
    convenio: string,
}


interface Procedimento {
    procedimento: string 
}

export default function ConsultasDentista(props: any) {
    const [consultas, setConsultas] = useState([])

    async function carregarConsultas() {
        try {
            let data: any = null;
            data = await buscarConsultasDentista(props.nome);
            const consultasConvertidas = data.map((consulta: Consulta) => ({
                ...consulta,
                dataHora: new Date(consulta.dataHora)
            }));
            setConsultas(consultasConvertidas);

        } catch (err) {
            console.log(err instanceof Error ? err.message : "Erro desconhecido");

            setConsultas([]);
        }
    }

    useEffect(() => {
        carregarConsultas();
    }, [props.nome]); 

    if (consultas == undefined || consultas == null) {
        return <h1>Nenhuma consulta cadastrada</h1>;
    }

    return (
        <div className="flex justify-center items-center">
            <table className="text-center p-5 rounded border-1 border-[#043873] shadow  w-1/2">
                <thead className="bg-[#043873] font-bold text-white text-xl">
                    <tr>
                        <th>Paciente</th>
                        <th>Data</th>
                        {/* <th>Procedimentos</th> */}
                        <th>Observações</th>

                    </tr>
                </thead>
                <tbody className="">
                    {consultas.length === 0 ? (
                        <tr>
                            <td>Nenhuma consulta cadastrada</td>
                        </tr>
                    ) : (
                        consultas.map((consulta: Consulta) => {
                            const dataHora = new Date(consulta.dataHora)
                            const dataAtual = new Date();
                            
                            // Pegar as passadas e tirar elas do render
                            // if(dataAtual.getTime() > dataHora.getTime())
                            // {
                            //     return
                            // }
                            
                            const dataFormatada = dataHora.toLocaleDateString('pt-BR');
                            const horaFormatada = dataHora.toLocaleTimeString('pt-BR', {
                                hour: '2-digit',
                                minute: '2-digit'
                            });

                            // const procedimentos = consulta.procedimentos.length === 0
                            //     ? 'N/A'
                            //     : consulta.procedimentos.map((procedimento: Procedimento) => {
                            //          let aux = procedimento.procedimento
                            //         console.log(procedimento.procedimento);
                                    
                            //          return aux
                            //     }) 
                            // FIXME está retornando NULL no back

                            return (
                                <tr key={consulta.id} className="text-[18px] even:bg-[#0438731f] odd:bg-white ">
                                    <td>{consulta.paciente.nome}</td>
                                    <td>{dataFormatada} às {horaFormatada}</td>
                                    {/* <td>{procedimentos}</td> */}
                                    <td>{consulta.observacoes}</td>
                                </tr>

                            )
                        })
                    )}

                </tbody>
            </table>

        </div>
    )
}
