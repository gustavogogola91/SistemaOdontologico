"use client";

import { useEffect, useState, ChangeEvent, useContext } from "react";
import { useRouter } from "next/navigation";
import { handleGetConsultas } from "./actions";
import { AuthContext } from "../contexts/AuthContext";
import { parseCookies } from "nookies";
import { Router } from "next/router";

interface Consulta {
  id: number;
  paciente: string;
  dentista: string;
  dataHora: string;
  procedimento: string;
  observacoes?: string;
  convenio?: string;
}

const ListarConsultas = () => {
  const [consultas, setConsultas] = useState<Consulta[]>([]);
  const [filters, setFilters] = useState({
    dentista: "",
    paciente: "",
    procedimento: "",
    dataHora: ""
  });

  const { logoutUsuario } = useContext(AuthContext);
  const { 'auth-token': AuthToken } = parseCookies();

  const router = useRouter();

  useEffect(() => {
    if (!AuthToken) {
      logoutUsuario()
      router.push('/login')
    }
  }, []);

  useEffect(() => {
    const fetchConsultas = async () => {
      const data = await handleGetConsultas();
      setConsultas(data);
    };
    fetchConsultas();
  }, []);

  const handleFilterChange = (e: ChangeEvent<HTMLInputElement>) => {
    setFilters(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const filteredConsultas = consultas.filter(c =>
    c.dentista.toLowerCase().includes(filters.dentista.toLowerCase()) &&
    c.paciente.toLowerCase().includes(filters.paciente.toLowerCase()) &&
    c.procedimento.toLowerCase().includes(filters.procedimento.toLowerCase()) &&
    (filters.dataHora ? new Date(c.dataHora).toISOString().startsWith(new Date(filters.dataHora).toISOString().slice(0,16)) : true)
  );

  return (
    <div className="p-6 bg-white">
      <h2 className="text-2xl font-bold mb-6 text-center text-blue-700">CONTROLE DE CONSULTAS</h2>

      <div className="flex flex-wrap items-end gap-4 mb-6">
        {/* Filtros */}
        {[{ id: 'dentista', label: 'Buscar Doutor(a)', type: 'text' },
          { id: 'dataHora', label: 'Data e Horário', type: 'datetime-local' },
          { id: 'paciente', label: 'Buscar Paciente', type: 'text' },
          { id: 'procedimento', label: 'Buscar Procedimento', type: 'text' }
        ].map(field => (
          <div key={field.id} className="flex-1 min-w-[200px]">
            <label htmlFor={field.id} className="block text-sm font-medium mb-1">{field.label}</label>
            <input
              id={field.id}
              name={field.id}
              value={filters[field.id as keyof typeof filters]}
              onChange={handleFilterChange}
              type={field.type}
              className="w-full border border-gray-300 rounded p-2"
            />
          </div>
        ))}

        <button
          onClick={() => router.push('/consultas')}
          className="bg-green-500 text-white font-semibold px-4 py-2 rounded hover:bg-green-600"
        >
          NOVA CONSULTA
        </button>
      </div>


      <div className="space-y-4 flex gap-4">
        {filteredConsultas.length > 0 ? (
          filteredConsultas.map(consulta => (
            <div key={consulta.id} className="border border-blue-600 rounded-lg p-4 shadow-sm w-[25vw] h-[30vh]">
              <div className="flex justify-between items-center mb-2">
                <h3 className="text-lg font-bold text-blue-700">CONSULTA</h3>
                <button className="text-sm border border-gray-400 rounded px-2 py-1 hover:bg-gray-100">
                  EDITAR
                </button>
              </div>
              <p><span className="font-semibold">Doutor(a):</span> {consulta.dentista}</p>
              <p><span className="font-semibold">Paciente:</span> {consulta.paciente}</p>
              <p><span className="font-semibold">Data:</span> {new Date(consulta.dataHora).toLocaleDateString()}</p>
              <p><span className="font-semibold">Horário:</span> {new Date(consulta.dataHora).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</p>
              <p><span className="font-semibold">Procedimento:</span> {consulta.procedimento}</p>
              {consulta.observacoes && <p><span className="font-semibold">Observação:</span> {consulta.observacoes}</p>}
              {consulta.convenio && <p><span className="font-semibold">Convênio:</span> {consulta.convenio}</p>}
            </div>
          ))
        ) : (
          <p className="text-center">Nenhuma consulta encontrada.</p>
        )}
      </div>
    </div>
  );
};

export default ListarConsultas;
