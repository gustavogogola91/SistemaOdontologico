"use client";
import api from "@/lib/api";
import React, { use, useEffect, useState } from "react";

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
        {pacientes.length === 0 ? (
            <p className="text-gray-500">Nenhum paciente encontrado.</p>
        ) : (
        pacientes.map((paciente: any) => (
            <div
                key={paciente.id}
                className="flex w-[1000px] justify-evenly items-center divide-dashed border-2 border-blue p-1 rounded-[8px] my-2"
            >
                <p className="w-[300px] mx-1.5 border-r border-solid">{paciente.nome}</p>
                <p className="w-[300px] border-r border-solid">{paciente.convenio || "Convênio"}</p>
                <p className="w-[200px] border-r border-solid">{paciente.telefone || "(41) 9918-1828"}</p>
                <button className="bg-blue rounded-[8px] font-bold text-[24px] cursor-pointer uppercase text-white text-center w-[150px] h-[35px]">
                    Editar
                </button>
            </div>
        ))
    )}
        
        </>
    );
}

function AdicionarPacientes() {
    const [showModal, setShowModal] = useState(false);
    const [novoPaciente, setNovoPaciente] = useState({
        nome: "",
        senha: "",
        convenio: "",
        cpf: "",
        email: "",
        telefone: "",
        endereco: ""
    });

    const postPacientes = (novoPaciente: { nome: string; senha: string, convenio: string, cpf: string, email: string, telefone: string, endereco: string }) => {
        try {
            fetch(`${apiUrl}`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({...novoPaciente, dataNascimento: new Date()}),
            }).then(() => {
                setShowModal(false);
                setNovoPaciente({ nome: "", senha: "", convenio: "", cpf: "", email: "", telefone: "", endereco: "" });
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
        postPacientes(novoPaciente);
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
                            className="border border-blue rounded p-2" required 
                            value={novoPaciente.nome} onChange={handleChange} 
                        />
                        <input name="senha" placeholder="Senha" 
                            className="border border-blue rounded p-2" required
                            value={novoPaciente.senha} onChange={handleChange} 
                        />
                        <input name="convenio" placeholder="Convênio" 
                            className="border border-blue rounded p-2" required
                            value={novoPaciente.convenio} onChange={handleChange} 
                        />
                        <input name="cpf" placeholder="CPF" 
                            className="border border-blue rounded p-2" required
                            value={novoPaciente.cpf} onChange={handleChange} 
                        />
                        <input name="email" placeholder="Email" 
                            className="border border-blue rounded p-2" required
                            value={novoPaciente.email} onChange={handleChange} 
                        />
                        <input name="telefone" placeholder="Telefone" 
                            className="border border-blue rounded p-2" required
                            value={novoPaciente.telefone} onChange={handleChange} 
                        />
                        <input name="endereco" placeholder="Endereco" 
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
