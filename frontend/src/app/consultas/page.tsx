

const consultas = () => {

    return (
        <div>
            <h1 className="text-3xl font-bold text-blue">CONTROLE DE FUNCIONÁRIOS</h1>
            <div>
                <label htmlFor="BuscarFuncionario">Buscar Funcionário</label>
                <input 
                id="BuscarFuncionario" 
                type="text" 
                className="border-[1px] border-blue rounded-[8px]"
                />
                <button>CADASTRAR</button>
            </div>
        </div>
    )
}


export default consultas;