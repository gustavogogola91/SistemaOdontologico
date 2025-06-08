using AutoMapper;
using backend.DTO;
using backend.Models;
using SistemaOdontologico.Models;

namespace backend.config
{
    public class Profiles : Profile
    {
        public Profiles()
        {
            CreateMap<Consulta, ConsultaDTO>();
            CreateMap<ConsultaPostDTO, Consulta>();

            CreateMap<Dentista, DentistaDTO>();
            CreateMap<Dentista, DentistaNomeDTO>();
            CreateMap<DentistaPostDTO, Dentista>();

            CreateMap<Paciente, PacienteDTO>();
            CreateMap<PacientePostDTO, Paciente>();

            CreateMap<Procedimento, ProcedimentoDTO>();
            CreateMap<Procedimento, ProcedimentoNomeDTO>();
            CreateMap<Procedimento, ProcedimentoResumidoDTO>();
            CreateMap<ProcedimentoPostDTO, Procedimento>();

            CreateMap<ProcedimentoConsulta, ProcedimentoConsultaDTO>();
            CreateMap<ProcedimentoPostDTO, Procedimento>();

            CreateMap<Funcionario, FuncionarioDTO>();
            CreateMap<FuncionarioPostDTO, Funcionario>();
        }
    }
}