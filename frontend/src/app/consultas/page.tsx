"use client" //FIXME

import Button from "@/components/ui/Button";
import { handlePostConsulta } from "./actions";


const consultas = () => {


    return (
        <div>
            <h1 className="text-3xl font-bold text-blue">AGENDAR CONSULTA</h1>
            <div>
                <label htmlFor="BuscarFuncionario">Buscar Paciente</label>
                <input 
                id="BuscarFuncionario" 
                type="text" 
                className="border-[1px] border-blue rounded-[8px]"
                />
            </div>
            <div>
                <div>
                    <p>Guilherme Tavares</p>
                    <p>Convênio</p>
                    <p>(41) 9918-1828</p>
                    <Button
                    onClick={handlePostConsulta}
                    size="small"
                    variant="success"
                    >agendar</Button>
                </div>
            </div>
        </div>
    )
}


export default consultas;