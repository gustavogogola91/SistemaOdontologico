

import { NextPage } from 'next';
import Head from 'next/head';
import Link from 'next/link';
import { Mail, Phone, MessageSquare, AlertCircle, Home } from 'lucide-react';

const SuportePage: NextPage = () => {
  return (
    <div className="min-h-screen bg-blue-50">
      <Head>
        <title>Suporte - Sistema Odontológico</title>
        <meta name="description" content="Página de suporte do sistema odontológico" />
      </Head>

      {/* Header */}
      <header className="bg-blue text-white py-6 shadow-md">
        <div className="container mx-auto px-4 flex justify-between items-center">
          <h1 className="text-2xl font-bold">Suporte Técnico</h1>
          <Link href="/" className="flex items-center gap-2 hover:text-blue-200 transition">
            <Home size={20} />
            Voltar ao Início
          </Link>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto">
          <div className="bg-white rounded-lg shadow-md overflow-hidden mb-8">
            <div className="bg-blue p-4 text-white">
              <h2 className="text-xl font-semibold">Precisa de ajuda?</h2>
            </div>
            <div className="p-6">
              <p className="text-gray-700 mb-6">
                Utilize os canais abaixo para entrar em contato com nossa equipe de suporte técnico.
                Estamos disponíveis para ajudar com qualquer problema ou dúvida relacionada ao sistema.
              </p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Email Support */}
                <div className="border border-blue-100 rounded-lg p-4 hover:shadow-md transition">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="bg-blue-100 p-2 rounded-full">
                      <Mail className="text-blue" size={20} />
                    </div>
                    <h3 className="font-semibold text-blue-800">Suporte por Email</h3>
                  </div>
                  <p className="text-gray-600 mb-3">Envie suas dúvidas para nosso time especializado</p>
                  <a 
                    href="mailto:suporte@odontosistema.com.br" 
                    className="text-blue hover:underline font-medium"
                  >
                    suporte@odontosistema.com.br
                  </a>
                </div>

                {/* Phone Support */}
                <div className="border border-blue-100 rounded-lg p-4 hover:shadow-md transition">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="bg-blue-100 p-2 rounded-full">
                      <Phone className="text-blue" size={20} />
                    </div>
                    <h3 className="font-semibold text-blue">Suporte Telefônico</h3>
                  </div>
                  <p className="text-gray-600 mb-3">Disponível em horário comercial</p>
                  <a 
                    href="tel:+551112345678" 
                    className="text-blue hover:underline font-medium"
                  >
                    (11) 1234-5678
                  </a>
                </div>

                {/* Emergency */}
                <div className="border border-blue-100 rounded-lg p-4 hover:shadow-md transition">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="bg-blue-100 p-2 rounded-full">
                      <AlertCircle className="text-blue" size={20} />
                    </div>
                    <h3 className="font-semibold text-blue">Emergência Técnica</h3>
                  </div>
                  <p className="text-gray-600 mb-3">Problemas críticos no sistema</p>
                  <a 
                    href="tel:+5511987654321" 
                    className="text-blue hover:underline font-medium"
                  >
                    (11) 98765-4321 (24h)
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* FAQ Section */}
          <div className="bg-white rounded-lg shadow-md overflow-hidden">
            <div className="bg-blue p-4 text-white">
              <h2 className="text-xl font-semibold">Perguntas Frequentes</h2>
            </div>
            <div className="p-6">
              <div className="space-y-4">
                {faqs.map((faq, index) => (
                  <div key={index} className="border-b border-blue-100 pb-4 last:border-0">
                    <h3 className="font-medium text-blue mb-2">{faq.question}</h3>
                    <p className="text-gray-600">{faq.answer}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

// FAQ Data
const faqs = [
  {
    question: "O sistema está lento, o que fazer?",
    answer: "Verifique sua conexão com a internet. Se o problema persistir, entre em contato com o suporte técnico."
  },
  {
    question: "Como atualizar meus dados cadastrais ou recuperar senha?",
    answer: "Para a atualização de dados cadastrais e recuperação de senha, entre em contato com o administrador do sistema da sua clínica."
  },
  {
    question: "Não consigo acessar um módulo específico",
    answer: "Verifique se seu usuário possui permissão para acessar este módulo. Caso precise, solicite ao administrador."
  }
];

export default SuportePage;