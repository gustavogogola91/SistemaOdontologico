'use client'
import Button from "@/components/ui/Button";
import { handlePostConsulta } from "./actions";
import { useRouter } from 'next/navigation';
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../contexts/AuthContext";
import { parseCookies } from "nookies";

const consultas = () => {

    const { logoutUsuario } = useContext(AuthContext);
    const { 'auth-token': AuthToken } = parseCookies();

    const router = useRouter();

    useEffect(() => {
        if (!AuthToken) {
            logoutUsuario()
            router.push('/login')
        }
    }, []);

    const [consulta, setConsulta] = useState({
        Paciente: "",
        Dentista: "",
        DataHora: new Date,
        Procedimento: "",
        Observacoes: ""
    }) 

    const handleChange = (e: any) => {
        const {name, value} = e.target;
        console.log(value)
        setConsulta((prevConsulta: any) => ({
            ...prevConsulta,
            [name]: value,
        }))
    }

    return (
        <div className="flex flex-col items-center">
            <h1 className="text-3xl my-28 font-bold text-blue">AGENDAR CONSULTA</h1>
            {/* <button
                onClick={() => router.push('/listarConsultas')}
                className="absolute top-4 right-4 z-10 bg-blue text-white font-bold py-2 px-4 rounded hover:bg-blue-700 transition duration-200"
                >
                    Consultas agendadas
                </button> */}
            <div>
                <label 
                className="block"
                htmlFor="BuscarFuncionario">Buscar Paciente</label>
                <input 
                id="BuscarFuncionario" 
                type="text" 
                className="border-[1px] border-blue rounded-[8px]"
                />
            </div>
            <div>
                <hr className="mt-12 mb-8 h-0.5 border-t-0 bg-neutral-100 " />
                <h3 className="mx-1.5">Pacientes</h3>
                <div
                className="flex w-[1000px] justify-evenly items-center divide-dashed border-2 border-blue p-1 rounded-[8px]"
                >

                    <p className="w-[300px] mx-1.5 border-r  border-solid">Guilherme Tavares</p>
                    <p className="w-[300px] border-r border-solid">Convênio</p>
                    <p className="w-[200px] border-r border-solid">(41) 9918-1828</p>
                    <Button
                    
                    variant="success"
                    size="small"

                    onClick={() =>{
                            var modal = document.getElementById("modal");
                            modal?.classList.remove("hidden")
                            modal?.classList.add("flex")
                        }}
    
                    >Agendar</Button>
                </div>
                <hr className="my-12 h-0.5 border-t-0 bg-neutral-100 " />
            </div>
            <div id="modal" className="hidden absolute w-[60vw] h-[80vh] top-[10vh] left-[20vw] rounded-[10px] z-10 bg-white border-[5px] border-[#043873] flex-col items-center gap-6 transition duration-300">
                <h1 className="uppercase text-[24px] font-bold text-[#043873] mt-[20px]">Agendamento</h1>
                <form className="flex flex-col items-center gap-[16px]" action={() => {
                    handlePostConsulta(consulta)
                    var modal = document.getElementById("modal");
                    modal?.classList.add("hidden")
                    modal?.classList.remove("flex")
                }}>
                    <label htmlFor="nome">Nome do Paciente</label>
                    <input type="text" name="Paciente" id="paciente" className="border-[1px] border-[#043873] rounded-[10px] p-[3px] w-[350px]" required onChange={handleChange}/>
                    <label htmlFor="responsavel">Responsável</label>
                    <input type="text" name="Dentista" id="Dentista" className="border-[1px] border-[#043873] rounded-[10px] p-[3px] w-[350px]" required onChange={handleChange}/>
                    <label htmlFor="data">Data e horário</label>
                    <input type="datetime-local" name="DataHora" id="data" className="border-[1px] border-[#043873] rounded-[10px] p-[3px] w-[350px]" required onChange={handleChange}/>
                    <label htmlFor="procedimento">Procedimento</label>
                    <input type="text" name="Procedimento" id="procedimento" className="border-[1px] border-[#043873] rounded-[10px] p-[3px] w-[350px]" required onChange={handleChange}/>
                    <label htmlFor="observacao">Observações</label>
                    <input type="text" name="Observacoes" id="observacoes" className="border-[1px] border-[#043873] rounded-[10px] p-[3px] w-[350px]" required onChange={handleChange}/>
                    <div className="flex flex-row gap-9 items-center">
                        <button type="reset" className="font-bold text-white bg-[#C00F0C]  p-[5px] rounded-[5px] uppercase mt-[10px]" onClick={() =>{
                            var modal = document.getElementById("modal");
                            modal?.classList.add("hidden")
                            modal?.classList.remove("flex")
                        }}>Cancelar</button>
                        <button type="submit" className="font-bold text-white bg-[#009951]  p-[5px] rounded-[5px] uppercase mt-[10px]">Agendar</button>
                    </div>
                </form>
            </div>
        </div>
    )
}


export default consultas;