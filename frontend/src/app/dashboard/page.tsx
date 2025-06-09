import ConsultasDentista from "./components/ConsultasDentista";

export default function Dashboard() {
    
    return(
        <>
            <div>
                <h1 className="font-bold text-center text-blue text-3xl mt-10">Bem vindo!</h1>
                <h1 className="font-bold text-center text-blue text-xl my-10">suas consultas:</h1>
                <ConsultasDentista Id="IdDentista"/>
            </div>  
        </>

    )
}