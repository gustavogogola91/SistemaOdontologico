import Link from "next/link";
import { FormLogin } from "./components/FormLogin";
import { ArrowLeft } from "lucide-react";


const login = () => {
    return(
        <>
            <Link href="/" className="block left-0 m-10">
                <ArrowLeft color="#1D1B20" />
            </Link>
            <div className="flex justify-center items-center ">
                <div className="flex flex-col  text-blue rounded shadow-xl w-[550px] h-[600px] mt-[50px] justify-center items-center bg-blue-alpha">
                    <h1 className="font-bold text-xl color-blue m-5">LOGIN</h1>
                    <FormLogin/>
                </div>
            </div>
        </>
    )
}


export default login;