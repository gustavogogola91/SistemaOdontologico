"use client"
import { useEffect, useState } from "react"
import { buscarConsultasDentista } from "../actions";
import { Paciente } from "@/app/pacientes/page";

interface Consulta {
        Id: number,
        Paciente: Paciente,
        DataHora: Date,
        // Procedimentos:e Procedimento,
        Obersivacoes: string,
}

export default function ConsultasDentista(props: any){
    const [consultas, setConsultas] =  useState([])
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function carregarConsultas(){
            try {
                let data: any
                data = buscarConsultasDentista(props.Id);


            } catch (error) {
                
            }



        }


    }, [])

    return(
        <div className="rounded border-1 shadow ">
            <table>
                <tr>
                    <th>Paciente</th>
                    <th>Data</th>
                    <th>Procedimentos</th>
                    <th>Observações</th>
                </tr>
                { consultas.length === 0 ? (
                    <tr>
                        <td>Nenhuma consulta cadastrada</td>
                    </tr>
                ) : (
                    consultas.map((consulta: Consulta) => (
                        <tr>
                            <td>consulta:</td>
                        </tr>
                    ))
                )}
            </table>

        </div>
    )
}
