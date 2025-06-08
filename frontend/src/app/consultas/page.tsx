"use client";
import Button from "@/components/ui/Button";
import {
  handleGetDentistas,
  handleGetPacientes,
  handleGetProcedimentos,
  handlePostConsulta,
} from "./actions";
import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { Console } from "console";

interface Paciente {
  id: number;
  nome: string;
  convenio: string;
  dataNascimento: string;
  cpf: string;
  email: string;
  telefone: string;
  endereco: string;
}

interface ProcedimentoPost {
  procedimentoId: number | undefined;
}

interface ConsultaPost {
  pacienteId: number | undefined;
  dentistaId: number | undefined;
  dataHora: string | undefined;
  listaProcedimentos: ProcedimentoPost[];
  observacoes: string | undefined;
  convenio: string | undefined;
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
  paciente: Paciente | undefined;
}

const Modal = ({ onClose, paciente }: ModalProps) => {
  const [dentistas, setDentistas] = useState<DentistaNome[]>([]);
  const [procedimentos, setProcedimentos] = useState<ProcedimentoNome[]>([]);

  const dentistaRef = useRef<HTMLSelectElement>(null);
  const dataHoraRef = useRef<HTMLInputElement>(null);
  const procedimentoRef = useRef<HTMLSelectElement>(null);
  const observacaoRef = useRef<HTMLTextAreaElement>(null);

  const postConsulta = async () => {
    console.log(dataHoraRef.current?.value);
    const dataInput: string =
      dataHoraRef.current?.value != undefined ? dataHoraRef.current?.value : "";
    const dataTratada = new Date(dataInput);
    console.log(dataTratada);
    const consulta: ConsultaPost = {
      pacienteId: paciente?.id,
      dentistaId:
        dentistaRef.current?.value != null
          ? parseInt(dentistaRef.current?.value)
          : 0,
      dataHora: dataTratada.toISOString(),
      listaProcedimentos: [
        {
          procedimentoId:
            procedimentoRef.current?.value != null
              ? parseInt(procedimentoRef.current?.value)
              : 0,
        },
      ],
      observacoes: observacaoRef.current?.value,
      convenio: paciente?.convenio,
    };
    await handlePostConsulta(consulta);
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

  return (
    <div className="absolute w-[50%] h-[80%] left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 transform rounded-[10px] z-10 bg-white border-[5px] border-[#043873] flex-col items-center gap-6 transition duration-300 text-center">
      <h1 className="uppercase text-[24px] font-bold text-[#043873] mt-[20px]">
        Agendamento
      </h1>
      <form
        className="flex flex-col items-center gap-[16px] text-center"
        onSubmit={(e) => {
          e.preventDefault();
          postConsulta();
        }}
      >
        <label htmlFor="nome">Paciente</label>
        <input
          type="text"
          name="Paciente"
          id="paciente"
          defaultValue={paciente?.nome}
          disabled
          className="border-[1px] border-[#043873] rounded-[10px] p-[3px] w-[350px]"
          required
        />
        <label htmlFor="responsavel">Dentista</label>
        <select
          name="Dentista"
          id="Dentista"
          ref={dentistaRef}
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
          ref={dataHoraRef}
          className="border-[1px] border-[#043873] rounded-[10px] p-[3px] w-[350px]"
          required
        />
        <label htmlFor="procedimento">Procedimento</label>
        <select
          name="Procedimento"
          id="procedimento"
          ref={procedimentoRef}
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
            Agendar
          </button>
        </div>
      </form>
    </div>
  );
};

const consultas = () => {
  const router = useRouter();
  const [showModal, setShowModal] = useState(false);
  const [pacientes, setPacientes] = useState<Paciente[]>([]);
  const [pacienteSelecionado, setPacienteSelecionado] = useState<Paciente>();

  useEffect(() => {
    getPacientes();
  }, []);

  const getPacientes = async () => {
    const data: Paciente[] = await handleGetPacientes();
    setPacientes(data);
  };

  const openModal = (paciente: Paciente) => {
    setPacienteSelecionado(paciente);
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setPacienteSelecionado(undefined);
  };

  return (
    <div className="flex flex-col items-center">
      <h1 className="text-3xl my-28 font-bold text-blue">AGENDAR CONSULTA</h1>
      <button
        onClick={() => router.push("/listarConsultas")}
        className="absolute top-4 right-4 z-10 bg-blue text-white font-bold py-2 px-4 rounded hover:bg-blue-700 transition duration-200"
      >
        Consultas agendadas
      </button>
      <div>
        <label className="block" htmlFor="BuscarFuncionario">
          Buscar Paciente
        </label>
        <input
          id="BuscarFuncionario"
          type="text"
          className="border-[1px] border-blue rounded-[8px]"
        />
      </div>
      <div>
        <hr className="mt-12 mb-8 h-0.5 border-t-0 bg-neutral-100 " />
        <h3 className="mx-1.5">Pacientes</h3>
        <ul>
          {pacientes.length > 0 ? (
            pacientes.map((paciente) => (
              <li
                key={paciente.id}
                className="flex w-[1000px] justify-evenly items-center divide-dashed border-2 border-blue p-1 rounded-[8px] mb-2"
              >
                <p className="w-[300px] mx-1.5 border-r  border-solid">
                  {paciente.nome}
                </p>
                <p className="w-[300px] border-r border-solid">
                  {paciente.convenio}
                </p>
                <p className="w-[200px] border-r border-solid">
                  {paciente.telefone}
                </p>
                <Button
                  variant="success"
                  size="small"
                  onClick={() => {
                    openModal(paciente);
                  }}
                >
                  Agendar
                </Button>
              </li>
            ))
          ) : (
            <li> Nenhum paciente encontrado</li>
          )}
        </ul>
      </div>
      {showModal && (
        <Modal onClose={closeModal} paciente={pacienteSelecionado} />
      )}
    </div>
  );
};

export default consultas;
