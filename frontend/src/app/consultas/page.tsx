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
                    onClick={handlePostConsulta}
                    variant="success"
                    size="small"
    
                    >agendar</Button>
                </div>
                <hr className="my-12 h-0.5 border-t-0 bg-neutral-100 " />
            </div>
        </div>
    )
}


export default consultas;