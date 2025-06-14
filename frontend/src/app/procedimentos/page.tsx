'use client'
import React, { useContext, useEffect, useState } from 'react';
import Header from '@/components/ui/Header';
import { criarProcedimento, buscarDentistas } from './actions';
import { useRouter } from 'next/navigation';
import { AuthContext } from '../contexts/AuthContext';
import { parseCookies } from 'nookies';

interface Dentista {
  id: number;
  nome: string;
}

export default function CriarProcedimento() {
  const { logoutUsuario } = useContext(AuthContext);
  const { 'auth-token': AuthToken } = parseCookies();

  const router = useRouter();

  useEffect(() => {
    if (!AuthToken) {
      logoutUsuario()
      router.push('/login')
    }
  }, []);


  const [procedimento, setProcedimento] = useState('');
  const [responsavel, setResponsavel] = useState('');
  const [pagamento, setPagamento] = useState(''); 
  const [observacoes, setObservacoes] = useState('');
  const [dentistas, setDentistas] = useState<Dentista[]>([]);

  useEffect(() => {
    const fetchDentistas = async () => {
      const data = await buscarDentistas();
      setDentistas(data);
    }
    fetchDentistas();
  }, []);

  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, []);

  const formatBRL = (value: string) => {
    const cleanValue = value.replace(/\D/g, '');
    const numberValue = parseInt(cleanValue || '0', 10);
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL',
    }).format(numberValue / 100);
  };

  const handlePagamentoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const input = e.target.value;
    setPagamento(formatBRL(input));
  };

  const handleSubmit = async () => {
    try {
      const valorNumerico = Number(pagamento.replace(/\D/g, '')) / 100;

      await criarProcedimento({
        nome: procedimento,
        observacoes,
        valor: valorNumerico,
        dentistaId: parseInt(responsavel),
      });

      setObservacoes('');
      setPagamento('');
      setProcedimento('');
      setResponsavel('');
      
      alert('Procedimento criado com sucesso!');
    } catch (error) {
      alert('Erro ao criar procedimento');
    }
  };

  const handleCancel = () => {
    router.push('/consultas'); 
  };

  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-5xl mx-auto mt-10 px-4">
        <h1 className="text-center text-xl font-bold text-blue-900 mb-6">CRIAR PROCEDIMENTO</h1>

        {/* Formulário */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block font-semibold">Procedimento</label>
            <input
              type="text"
              className="w-full border rounded p-2"
              value={procedimento}
              onChange={(e) => setProcedimento(e.target.value)}
            />
          </div>

          <div>
            <label className="block font-semibold">Responsável</label>
            <select
              className="w-full border rounded p-2"
              value={responsavel}
              onChange={(e) => setResponsavel(e.target.value)}
            >
              <option value="">Selecione um responsável</option>
              {dentistas.map((dent) => (
                <option key={dent.id} value={dent.id}>{dent.nome}</option>
              ))}
            </select>
          </div>
        </div>

        {/* Observações */}
        <div className="mt-4">
          <label className="block font-semibold">Observações</label>
          <textarea
            className="w-full border rounded p-2"
            rows={3}
            value={observacoes}
            onChange={(e) => setObservacoes(e.target.value)}
            placeholder="Observações..."
          />
        </div>

        {/* Valor */}
        <div className="mt-4">
          <label className="block font-semibold">Valor</label>
          <input
            type="text"
            className="w-38 border rounded p-2"
            value={pagamento}
            onChange={handlePagamentoChange}
            placeholder="R$ 0,00"
          />
        </div>

        {/* Botões */}
        <div className="mt-6 flex justify-between">
          <button
            onClick={handleCancel}
            className="bg-red-600 text-white px-6 py-2 rounded hover:bg-red-700"
          >
            CANCELAR
          </button>
          <button
            onClick={handleSubmit}
            className="bg-green-600 text-white px-6 py-2 rounded hover:bg-green-700"
          >
            ENVIAR
          </button>
        </div>
      </div>
    </div>
  );
}
