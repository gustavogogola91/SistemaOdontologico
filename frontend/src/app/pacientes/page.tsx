"use client";

import { useRouter } from "next/navigation";
import React, { useEffect, useRef, useState } from "react";

var apiUrl = "http://localhost:5143/paciente";

export default function Pacientes() {
    return(
        <>
        <div className="flex flex-col items-center">
            <h1 className="text-3xl my-28 font-bold text-blue">PACIENTES</h1>
            <div className="flex items-center gap-2">
                <label className="block" htmlFor="BuscarFuncionario">Buscar Paciente</label>
                <input id="BuscarFuncionario" type="text" className="border-[1px] border-blue rounded-[8px] h-8"/>
                <AdicionarPacientes />
            </div>
            <div>
                <hr className="mt-12 mb-8 h-0.5 border-t-0 bg-neutral-100 " />
                <h3 className="mx-1.5">Pacientes</h3>
                <ListaPacientes />
                <hr className="my-12 h-0.5 border-t-0 bg-neutral-100 " />
            </div>
        </div>
        </>
    );
}

function ListaPacientes() {
    const [pacientes, setPacientes] = useState([]);

    const buscarPacientes = () => {
        fetch(`${apiUrl}`)
        .then((response) => response.json())
        .then((data) => { setPacientes(data); })
        .catch((error) => console.error('Error ao buscar pacientes:', error));
    };

    useEffect(() => {
        buscarPacientes();  
    }, []);

    return(
        <>
        <table className="w-[80vw] table-fixed">
            <thead>
                <tr>
                    <th className="w-[20vw]">Nome</th>
                    <th className="w-[20vw]">Convênio</th>
                    <th className="w-[20vw]">Telefone</th>
                    <th className="w-[20vw]">Ações</th>
                </tr>
            </thead>
            <tbody>
                {pacientes.length === 0 ? (
                <tr className="text-gray-500 text-[24px]"><td>Nenhum paciente encontrado.</td></tr>
                ) : (
                pacientes.map((paciente: any) => (
                    <tr 
                        key={paciente.id}
                        className="flex w-[80vw] justify-evenly items-center divide-dashed border-2 border-blue p-1 rounded-[8px] my-2 text-center"
                    >
                        <td className="w-[20vw] mx-1.5 border-r border-solid">{paciente.nome}</td>
                        <td className="w-[20vw] border-r border-solid">{paciente.convenio || "Convênio"}</td>
                        <td className="w-[20vw] border-r border-solid">{paciente.telefone || "(41) 9918-1828"}</td>
                        <td className="w-[20vw] flex flex-row justify-evenly">
                            <EditarPacientes pacienteOriginal={paciente}/>
                            <DeletarPacientes id={paciente.id}/>
                        </td>
                    </tr>
                ))
            )}
            </tbody>
        </table>
        
        
        </>
    );
}

function AdicionarPacientes() {

    const router  = useRouter();

    const [showModal, setShowModal] = useState(false);
    const [novoPaciente, setNovoPaciente] = useState({
        nome: "",
        convenio: "",
        dataNascimento: "",
        cpf: "",
        email: "",
        telefone: "",
        endereco: ""
    });

    const postPacientes = async () => {
        try {
            await fetch(`${apiUrl}`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(novoPaciente),
            }).then(() => {
                setShowModal(false);
                setNovoPaciente({ nome: "", convenio: "", dataNascimento: "", cpf: "", email: "", telefone: "", endereco: "" });
            
            }).finally(() => {
                window.location.reload();
            });
            console.log("Paciente adicionado com sucesso:", novoPaciente);
        }
        catch (error) {
            console.error("Erro ao adicionar paciente:", error);
        }
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setNovoPaciente({...novoPaciente, [name]: value });
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        postPacientes();
    };

    return(
        <>
        <button
            className="bg-blue text-white text-2xl font-bold rounded-[8px] w-10 h-8 flex items-center justify-center cursor-pointer"
            title="Adicionar novo paciente"
            onClick={() => setShowModal(true)}
        >+</button>
        { showModal && (
            <div className="fixed inset-0 flex items-center justify-center z-50" style={{ background: "rgba(0,0,0,0.3)" }}>
                <div className="bg-white p-8 rounded-lg flex flex-col gap-4 min-w-[350px]">
                    <h2 className="text-xl font-bold text-blue mb-2">Novo Paciente</h2>
                    <form onSubmit={handleSubmit} className="flex flex-col gap-2">
                        <input name="nome" placeholder="Nome" 
                            className="border border-blue rounded p-2" required maxLength={30}
                            value={novoPaciente.nome} onChange={handleChange} 
                        />
                        
                        <input name="cpf" placeholder="CPF" 
                            className="border border-blue rounded p-2" required maxLength={14}
                            value={novoPaciente.cpf} onChange={handleChange} 
                        />
                        <input type="date" name="dataNascimento" placeholder="Data de nascimento" 
                            className="border border-blue rounded p-2" required 
                            value={novoPaciente.dataNascimento} onChange={handleChange}
                            />

                        <input name="email" placeholder="Email" type="email"
                            className="border border-blue rounded p-2" required maxLength={50}
                            value={novoPaciente.email} onChange={handleChange} 
                        />
                        <input name="telefone" placeholder="Telefone" 
                            className="border border-blue rounded p-2" required maxLength={15}
                            value={novoPaciente.telefone} onChange={handleChange} 
                        />
                        <input name="convenio" placeholder="Convênio" maxLength={20}
                            className="border border-blue rounded p-2" required
                            value={novoPaciente.convenio} onChange={handleChange} 
                        />
                        <input name="endereco" placeholder="Endereco" maxLength={50}
                            className="border border-blue rounded p-2" required
                            value={novoPaciente.endereco} onChange={handleChange} 
                        />
                        <div className="flex gap-4 mt-2">
                            <button 
                                type="button" 
                                className="bg-red-500 text-white px-4 py-2 rounded cursor-pointer" 
                                onClick={() => setShowModal(false)}>Cancelar</button>
                            <button 
                                type="submit" 
                                className="bg-blue text-white px-4 py-2 rounded cursor-pointer"
                            >Salvar</button>
                        </div>
                    </form>
                </div>
            </div>
        )}
        </>
    );
}

function EditarPacientes({ pacienteOriginal }: {pacienteOriginal:any}) {
    const [showModal, setShowModal] = useState(false);
    const [paciente, setPaciente] = useState({
        nome: pacienteOriginal.nome,
        convenio: pacienteOriginal.convenio,
        cpf: pacienteOriginal.cpf,
        email: pacienteOriginal.email,
        telefone: pacienteOriginal.telefone,
        endereco: pacienteOriginal.endereco
    });

    

    const putPacientes = (paciente: { nome: string, convenio: string, cpf: string, email: string, telefone: string, endereco: string }) => {
        try {
            fetch(`${apiUrl}/${pacienteOriginal.id}`, {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(paciente),
            }).then(() => {
                setShowModal(false);
                setPaciente({ nome: "", convenio: "", cpf: "", email: "", telefone: "", endereco: "" });
                window.location.reload()
            });
            console.log("Paciente atualizado com sucesso:", paciente);

        }
        catch (error) {
            console.error("Erro ao atualizar paciente:", error);
        }
    }

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setPaciente({...paciente, [name]: value });
    };
    
    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        putPacientes(paciente);
    };

    return (
        <>
        <button className="bg-blue rounded-[8px] font-bold text-[24px] cursor-pointer uppercase text-white text-center w-[150px] h-[35px]"
        title="Adicionar novo paciente"
        onClick={() => setShowModal(true)}
        >Editar</button>
        { showModal && (
            <div className="fixed inset-0 flex items-center justify-center z-50" style={{ background: "rgba(0,0,0,0.3)" }}>
                <div className="bg-white p-8 rounded-lg flex flex-col gap-4 min-w-[350px]">
                    <h2 className="text-xl font-bold text-blue mb-2">Editar Paciente</h2>
                    <form onSubmit={handleSubmit} className="flex flex-col gap-2">
                        <input name="nome" placeholder="Nome" 
                            className="border border-blue rounded p-2" required  maxLength={30}
                            value={paciente.nome} onChange={handleChange} 
                        />
                        
                        <input name="cpf" placeholder="CPF" 
                            className="border border-blue rounded p-2" required maxLength={14}
                            value={paciente.cpf} onChange={handleChange} 
                        />
                        <input name="email" placeholder="Email" type="email"
                            className="border border-blue rounded p-2" required maxLength={50}
                            value={paciente.email} onChange={handleChange} 
                        />
                        <input name="telefone" placeholder="Telefone" 
                            className="border border-blue rounded p-2" required maxLength={15}
                            value={paciente.telefone} onChange={handleChange} 
                        />
                        <input name="convenio" placeholder="Convênio" 
                            className="border border-blue rounded p-2" required maxLength={20}
                            value={paciente.convenio} onChange={handleChange} 
                        />
                        <input name="endereco" placeholder="Endereco" 
                            className="border border-blue rounded p-2" required maxLength={50}
                            value={paciente.endereco} onChange={handleChange} 
                        />
                        <div className="flex gap-4 mt-2">
                            <button 
                                type="button" 
                                className="bg-red-500 text-white px-4 py-2 rounded cursor-pointer"
                                onClick={() => setShowModal(false)}>Cancelar</button>
                            <button 
                                type="submit"
                                className="bg-blue text-white px-4 py-2 rounded cursor-pointer"
                            >Salvar</button>
                        </div>
                    </form>
                </div>
            </div>
        )}
        </>
    );
}

function DeletarPacientes({ id }: {id:number}) {
    const idPaciente = id;
    const [pacientes, setPacientes] = useState([]);
    const deletarPaciente = (id: number) => {
        fetch(`${apiUrl}/${id}`, {
            method: 'DELETE',
        })
        .then(() => {
            setPacientes(pacientes.filter((p: any) => p.id !== id));
        })
        .finally(() => {
            window.location.reload();
        })
        .catch((error) => console.error('Erro ao deletar paciente:', error));
    };
    
    return (
        <>
        <button
            className="ml-2 bg-transparent hover:bg-red-100 rounded p-1"
            title="Deletar paciente"
            onClick={() => deletarPaciente(idPaciente)}
        ><img src="/trashIcon.png" alt="Deletar" className="w-6 h-6" /></button>
</>
    )
}