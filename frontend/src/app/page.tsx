"use client"

import { HelpCircle, Shield, User } from "lucide-react";

import Link from "next/link";

export default function Home() {
  return (
    <>
      {/* Hero Section - Tela de Boas-Vindas */}
      <section className="bg-blue text-white py-20">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">Bem-vindo ao Sistema OdontoPlus</h1>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            Plataforma de gerenciamento odontológico para profissionais e clínicas
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Link
              href="/login"
              className="bg-white text-blue hover:bg-blue-50 px-6 py-3 rounded-lg font-semibold text-lg transition duration-300"
            >
              Acessar Sistema
            </Link>
            <Link
              href="/suporte"
              className="border-2 border-white text-white hover:bg-blue px-6 py-3 rounded-lg font-semibold text-lg transition duration-300"
            >
              Precisa de Ajuda?
            </Link>
          </div>
        </div>
      </section>

      {/* Features Section - Funcionalidades do Sistema */}
      <section className="py-16 bg-blue-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center text-blue mb-12">Sistema de Gestão Odontológica</h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition duration-300">
              <div className="bg-blue-100 w-14 h-14 rounded-full flex items-center justify-center mb-4">
                <User className="text-blue w-8 h-8" />
              </div>
              <h3 className="text-xl font-semibold text-blue mb-2">Acesso Seguro</h3>
              <p className="text-gray-600">
                Utilize suas credenciais fornecidas pela administração para acessar o sistema.
              </p>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition duration-300">
              <div className="bg-blue-100 w-14 h-14 rounded-full flex items-center justify-center mb-4">
                <Shield className="text-blue w-8 h-8" />
              </div>
              <h3 className="text-xl font-semibold text-blue- mb-2">Primeiro Acesso?</h3>
              <p className="text-gray-600">
                Entre em contato com o administrador do sistema para receber suas credenciais iniciais.
              </p>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition duration-300">
              <div className="bg-blue-100 w-14 h-14 rounded-full flex items-center justify-center mb-4">
                <HelpCircle className="text-blue w-8 h-8" />
              </div>
              <h3 className="text-xl font-semibold text-blue mb-2">Dúvidas?</h3>
              <p className="text-gray-600">
                Consulte nosso manual do usuário ou fale com o suporte técnico.
              </p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
