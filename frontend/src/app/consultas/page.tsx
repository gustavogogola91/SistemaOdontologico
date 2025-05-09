'use client'
import Button from "@/components/ui/Button";
import { handlePostConsulta } from "./actions";

const consultas = () => {


    return (
        <div className="flex flex-col items-center">
            <h1 className="text-3xl my-28 font-bold text-blue">AGENDAR CONSULTA</h1>
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
            <div id="modal" className="hidden absolute w-[650px] h-[600px] top-[200px] left-[620px] rounded-[10px] z-10 bg-white border-[5px] border-[#043873] flex-col items-center gap-6 transition duration-300">
                <h1 className="uppercase text-[24px] font-bold text-[#043873] mt-[20px]">Agendamento</h1>
                <form className="flex flex-col items-center gap-[16px]">
                    <label htmlFor="nome">Nome do Paciente</label>
                    <input type="text" name="nome" id="nome" className="border-[1px] border-[#043873] rounded-[10px] p-[3px] w-[400px]"/>
                    <label htmlFor="responsavel">Responsável</label>
                    <input type="text" name="responsavel" id="responsavel" className="border-[1px] border-[#043873] rounded-[10px] p-[3px] w-[400px]"/>
                    <label htmlFor="data">Data e horário</label>
                    <input type="datetime-local" name="data" id="data" className="border-[1px] border-[#043873] rounded-[10px] p-[3px] w-[400px]"/>
                    <label htmlFor="procedimento">Procedimento</label>
                    <input type="text" name="procedimento" id="procedimento" className="border-[1px] border-[#043873] rounded-[10px] p-[3px] w-[400px]"/>
                    <label htmlFor="observacao">Observações</label>
                    <input type="text" name="observacao" id="observacao" className="border-[1px] border-[#043873] rounded-[10px] p-[3px] w-[400px]"/>
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