import Link from "next/link";
import { FormLogin } from "./components/FormLogin";


const login = () => {
    return(
        <>
            <Link href={"consultas"}>

            </Link>
            <div>
                <h1>LOGIN</h1>
                <FormLogin />
            </div>
        </>
    )
}


export default login;