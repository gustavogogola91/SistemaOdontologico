"use client";

import { useEffect, useState, useRef, useMemo } from "react";
import { useRouter } from "next/navigation";
import {
  handleGetConsultas,
  handleGetDentistas,
  handleGetProcedimentos,
  handlePutConsulta,
} from "./actions";

interface Dentista {
  id: number;
  nome: string;
}

interface Paciente {
  id: number;
  nome: string;
}

interface ListaProcedimento {
  id: number;
  procedimento: Procedimento;
}

interface Procedimento {
  id: number;
  nome: string;
}

interface Consulta {
  id: number;
  paciente: Paciente;
  dentista: Dentista;
  dataHora: string;
  procedimentos: ListaProcedimento[];
  observacoes?: string;
  convenio?: string;
}
interface ConsultaPut {
  dentistaId: number;
  dataHora: string;
  observacoes?: string;
  convenio?: string;
}

interface DentistaNome {
  id: number;
  nome: string;
}

interface ProcedimentoNome {
  id: number;
  nome: string;
}

interface ModalProps {
  onClose: Function;
  consulta: Consulta | undefined;
}

const Modal = ({ onClose, consulta }: ModalProps) => {
  if (consulta == undefined) {
    return;
  }

  const [dentistas, setDentistas] = useState<DentistaNome[]>([]);
  const [procedimentos, setProcedimentos] = useState<ProcedimentoNome[]>([]);

  const [sucessMessage, setSucessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const [selectedDentistaId, setSelectedDentistaId] = useState(0);
  const [selectedProcedimentoId, setSelectedProcedimentoId] = useState(0);
  const [dataHora, setDataHora] = useState("");
  const observacaoRef = useRef<HTMLTextAreaElement>(null);

  const putConsulta = async () => {
    const dataTratada = new Date(dataHora);
    const consultaPut: ConsultaPut = {
      dentistaId: selectedDentistaId,
      dataHora: dataTratada.toISOString(),
      observacoes: observacaoRef.current?.value,
      convenio: consulta.convenio,
    };

    console.log(consultaPut);

    const status = await handlePutConsulta(consultaPut, consulta.id);
    if (status == 200) {
      setSucessMessage("Consulta alterada com sucesso");
      await new Promise((resolve) => setTimeout(resolve, 2000));
    } else {
      setErrorMessage("Erro ao alterar consulta, tente novamente");
      await new Promise((resolve) => setTimeout(resolve, 2000));
    }

    window.location.reload();
  };

  const fetchDentista = async () => {
    const data: DentistaNome[] = await handleGetDentistas();
    setDentistas(data);
  };

  const fetchProcedimento = async () => {
    const data: ProcedimentoNome[] = await handleGetProcedimentos();
    setProcedimentos(data);
  };

  useEffect(() => {
    fetchDentista();
    fetchProcedimento();
  }, []);

  useEffect(() => {
    if (consulta?.dentista?.id) {
      setSelectedDentistaId(consulta.dentista.id);
    }
  }, [consulta]);

  useEffect(() => {
    if (consulta?.procedimentos[0].procedimento.id) {
      setSelectedProcedimentoId(consulta.procedimentos[0].procedimento.id);
    }
  }, [consulta]);

  useEffect(() => {
    if (consulta?.dataHora) {
      const dataFormatada = consulta.dataHora.slice(0, 16);
      setDataHora(dataFormatada);
    }
  }, [consulta]);

  if (consulta == undefined) {
    return;
  }

  return (
    <div
      className="fixed inset-0 flex items-center justify-center z-50"
      style={{ background: "rgba(0,0,0,0.3)" }}
    >
      <div className="absolute w-[50%] h-[80%] left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 transform rounded-[10px] z-10 bg-white border-[5px] border-[#043873] flex-col items-center gap-6 transition duration-300 text-center">
        <h1 className="uppercase text-[24px] font-bold text-[#043873] mt-[20px]">
          Alterar agendamento
        </h1>
        <form
          className="flex flex-col items-center gap-[16px] text-center"
          onSubmit={(e) => {
            e.preventDefault();
            putConsulta();
          }}
        >
          <label htmlFor="nome">Paciente</label>
          <input
            type="text"
            name="Paciente"
            id="paciente"
            defaultValue={consulta?.paciente.nome}
            disabled
            className="border-[1px] border-[#043873] rounded-[10px] p-[3px] w-[350px]"
            required
          />
          <label htmlFor="responsavel">Dentista</label>
          <select
            name="Dentista"
            id="Dentista"
            value={selectedDentistaId}
            onChange={(e) => setSelectedDentistaId(parseInt(e.target.value))}
            className="border-[1px] border-[#043873] rounded-[10px] p-[3px] w-[350px]"
            required
          >
            <option value="0">Selecione um dentista</option>
            {dentistas.map((dentista) => (
              <option value={dentista.id} key={dentista.id}>
                {dentista.nome}
              </option>
            ))}
          </select>
          <label htmlFor="data">Data e horário</label>
          <input
            type="datetime-local"
            name="DataHora"
            id="data"
            value={dataHora}
            onChange={(e) => setDataHora(e.target.value)}
            className="border-[1px] border-[#043873] rounded-[10px] p-[3px] w-[350px]"
            required
          />
          <label htmlFor="procedimento">Procedimento</label>
          <select
            name="Procedimento"
            id="procedimento"
            value={selectedProcedimentoId}
            onChange={(e) =>
              setSelectedProcedimentoId(parseInt(e.target.value))
            }
            className="border-[1px] border-[#043873] rounded-[10px] p-[3px] w-[350px]"
            required
          >
            <option value="0">Selecione um Procedimento</option>
            {procedimentos.map((procedimento) => (
              <option value={procedimento.id} key={procedimento.id}>
                {procedimento.nome}
              </option>
            ))}
          </select>
          <label htmlFor="observacao">Observações</label>
          <textarea
            name="Observacoes"
            id="observacoes"
            ref={observacaoRef}
            defaultValue={consulta?.observacoes}
            className="border-[1px] border-[#043873] rounded-[10px] p-[3px] w-[350px]"
            required
          />
          <div className="flex flex-row gap-9 items-center">
            <button
              type="reset"
              className="font-bold text-white bg-[#C00F0C]  p-[5px] rounded-[5px] uppercase mt-[10px] cursor-pointer"
              onClick={() => {
                onClose();
              }}
            >
              Cancelar
            </button>
            <button
              type="submit"
              className="font-bold text-white bg-[#009951]  p-[5px] rounded-[5px] uppercase mt-[10px] cursor-pointer"
            >
              Alterar
            </button>
          </div>
        </form>
        <p
          id="mesage"
          className="font-bold uppercase text-green-800 bg-green-500 mt-4 w-[60%] m-auto"
        >
          {sucessMessage}
        </p>
        <p
          id="mesage"
          className="font-bold uppercase text-red-800 bg-red-500 mt-4 w-[60%] m-auto"
        >
          {errorMessage}
        </p>
      </div>
    </div>
  );
};

const ListarConsultas = () => {
  const router = useRouter();
  const [consultas, setConsultas] = useState<Consulta[]>([]);
  const [showModal, setShowModal] = useState(false);
  const [consultaSelecionada, setConsultaSelecionada] = useState<Consulta>();
  const [filtro, setFiltro] = useState({
    dentista: "",
    paciente: "",
    data: "",
    futuro: true,
  });

  useEffect(() => {
    const fetchConsultas = async () => {
      const data = await handleGetConsultas();
      setConsultas(data);
    };
    fetchConsultas();
  }, []);

  const closeModal = () => {
    setShowModal(false);
    setConsultaSelecionada(undefined);
  };

  const openModal = (consulta: Consulta) => {
    setConsultaSelecionada(consulta);
    setShowModal(true);
  };

  const onFilterChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    setFiltro({ ...filtro, [name]: value });
  };

  const agora = new Date();

  const consultasFiltradas = useMemo(() => {
    return consultas
      .filter((consulta) => {
        const filtroDentista = consulta.dentista.nome
          .toLowerCase()
          .includes(filtro.dentista.toLowerCase());

        const filtroPaciente = consulta.paciente.nome
          .toLowerCase()
          .includes(filtro.paciente.toLowerCase());

        const filtroData =
          !filtro.data || consulta.dataHora.startsWith(filtro.data);

        if (filtro.futuro) {
          const filtroFuturo = new Date(consulta.dataHora) >= agora;

          return filtroDentista && filtroPaciente && filtroData && filtroFuturo;
        }
        return filtroDentista && filtroPaciente && filtroData;
      })

      .sort((a, b) => {
        const dataHoraA = new Date(a.dataHora).getTime();
        const dataHoraB = new Date(b.dataHora).getTime();
        return dataHoraA - dataHoraB;
      });
  }, [consultas, filtro]);

  return (
    <div className="p-6 bg-white">
      <h2 className="text-2xl font-bold mb-6 text-center text-blue-700">
        CONTROLE DE CONSULTAS
      </h2>

      <button
        onClick={() => router.push("/consultas")}
        className="bg-green-500 text-white font-semibold px-4 py-2 rounded hover:bg-green-600 absolute top-4 right-20"
      >
        NOVA CONSULTA
      </button>

      <div className="flex flex-col ml-6">
        <div className="flex flex-wrap gap-4 mb-1 flex-row items-center">
          <p className="text-xl font-bold mb-6 text-blue-700 mt-4">Filtrar </p>
          <input
            type="text"
            name="dentista" 
            onChange={onFilterChange}
            value={filtro.dentista}
            className="border-[1px] border-[#043873] rounded-[5px] p-[3px] w-[350px] ml-4"
            placeholder="Dentista"
          />
          <input
            type="text"
            name="paciente"
            onChange={onFilterChange}
            value={filtro.paciente}
            className="border-[1px] border-[#043873] rounded-[5px] p-[3px] w-[350px]"
            placeholder="Paciente"
          />
          <input
            type="date"
            name="data"
            onChange={onFilterChange}
            value={filtro.data}
            className="border-[1px] border-[#043873] rounded-[5px] p-[3px] w-[350px]"
          />
          <button
            onClick={() =>
              setFiltro({
                dentista: "",
                paciente: "",
                data: "",
                futuro: true,
              })
            }
            className="bg-green-500 text-white font-semibold px-4 py-2 rounded hover:bg-green-600"
          >
            Limpar filtros
          </button>
        </div>
        <div className="flex gap-2">
          <label htmlFor="futuro" className="ml-3 font-medium text-[#043873]">
            Mostrar apenas consultas futuras
          </label>
          <input
            type="checkbox"
            name="futuro"
            id="futuro"
            checked={filtro.futuro}
            onChange={() => {
              setFiltro({ ...filtro, futuro: !filtro.futuro });
            }}
          />
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 p-4">
        {consultasFiltradas.length > 0 ? (
          consultasFiltradas.map((consulta) => (
            <div
              key={consulta.id}
              className="border border-blue-600 rounded-lg p-4 shadow-sm "
            >
              <div className="flex justify-between items-center mb-2">
                <h3 className="text-lg font-bold text-blue-700">CONSULTA</h3>
                <button
                  className="text-sm border border-gray-400 rounded px-2 py-1 hover:bg-gray-100"
                  onClick={() => {
                    openModal(consulta);
                  }}
                >
                  EDITAR
                </button>
              </div>
              <p>
                <span className="font-semibold">Doutor(a):</span>{" "}
                {consulta.dentista.nome}
              </p>
              <p>
                <span className="font-semibold">Paciente:</span>{" "}
                {consulta.paciente.nome}
              </p>
              <p>
                <span className="font-semibold">Data:</span>{" "}
                {new Date(consulta.dataHora).toLocaleDateString()}
              </p>
              <p>
                <span className="font-semibold">Horário:</span>{" "}
                {new Date(consulta.dataHora).toLocaleTimeString([], {
                  hour: "2-digit",
                  minute: "2-digit",
                })}
              </p>
              <p>
                <span className="font-semibold">Procedimento:</span>{" "}
                {consulta.procedimentos[0].procedimento.nome}
              </p>
              {consulta.observacoes && (
                <p>
                  <span className="font-semibold">Observação:</span>{" "}
                  {consulta.observacoes}
                </p>
              )}
              {consulta.convenio && (
                <p>
                  <span className="font-semibold">Convênio:</span>{" "}
                  {consulta.convenio}
                </p>
              )}
            </div>
          ))
        ) : (
          <p className="text-center">Nenhuma consulta encontrada.</p>
        )}
      </div>
      {showModal && (
        <Modal consulta={consultaSelecionada} onClose={closeModal} />
      )}
    </div>
  );
};

export default ListarConsultas;
