"use client" //FIXME

import Button from "@/components/ui/Button";
import { handlePostConsulta } from "./actions";


const consultas = () => {


    return (
        <div>
            <h1 className="text-3xl font-bold text-blue">AGENDAR CONSULTA</h1>
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
                <div
                className="flex justify-evenly items-center divide-dashed border-2 border-blue p-1 rounded-[8px]"
                >
                    <p className="border-r  border-solid">Guilherme Tavares</p>
                    <p className="border-r border-solid">Convênio</p>
                    <p className="border-r border-solid">(41) 9918-1828</p>
                    <Button
                    onClick={handlePostConsulta}
                    variant="success"
                    size="small"
                    >agendar</Button>
                </div>
            </div>
        </div>
    )
}


export default consultas;