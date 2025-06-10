"use client";
import React, { useState, useRef, useEffect, useContext } from 'react';
import { FiHome, FiCalendar, FiUser, FiSettings, FiLogOut, FiMenu, FiX } from 'react-icons/fi';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { AuthContext } from '@/app/contexts/AuthContext';
import { parseCookie } from 'next/dist/compiled/@edge-runtime/cookies';
import { parseCookies } from 'nookies';

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const menuButtonRef = useRef<HTMLButtonElement>(null);
  const menuRef = useRef<HTMLDivElement>(null);
  const pathname = usePathname();
  const { logoutUsuario, IsAuthenticated } = useContext(AuthContext);
  const {'userType': userType} = parseCookies()
  const router = useRouter()

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  // Fechar menu ao clicar fora ou mudar de rota
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        menuRef.current && 
        !menuRef.current.contains(event.target as Node) &&
        menuButtonRef.current && 
        !menuButtonRef.current.contains(event.target as Node)
      ) {
        setIsMenuOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Fechar menu ao mudar de página
  useEffect(() => {
    setIsMenuOpen(false);
  }, [pathname]);

  // Itens do menu com verificação de rota ativa
  const menuItems = [
    { 
      icon: <FiHome size={20} />, 
      label: 'Dashboard', 
      href: '/dashboard',
      active: pathname === '/dashboard'
    },
    { 
      icon: <FiCalendar size={20} />, 
      label: 'Consultas', 
      href: '/listarConsultas',
      active: pathname.startsWith('/listarConsultas')
    },
    { 
      icon: <FiUser size={20} />, 
      label: 'Pacientes', 
      href: '/pacientes',
      active: pathname.startsWith('/pacientes')
    },
    { 
      icon: <FiSettings size={20} />, 
      label: 'Procedimentos', 
      href: '/procedimentos',
      active: pathname === '/procedimentos' // Alterado para comparação exata
    },
  ];

  // Não exibir header na página de login e subpáginas de procedimentos
  if (pathname === '/login' || pathname.startsWith('/procedimentos/')) {
    return null;
  }

  return (
    <header className={
      IsAuthenticated
      ? ("bg-blue-900 p-4 flex items-center justify-between text-white sticky top-0 z-[100] shadow-md ${}")
      : ("hidden")}>
      <Link href="/dashboard" className="text-xl font-bold flex items-center">
        <div className="bg-white rounded-full w-8 h-8 flex items-center justify-center mr-3">
          <span className="text-blue-900 font-bold">SO</span>
        </div>
        Sistema Odontológico
      </Link>
      
      <div className="flex items-center space-x-4">
        <button 
          ref={menuButtonRef}
          onClick={toggleMenu}
          className="rounded-full bg-white w-10 h-10 text-blue-900 flex items-center justify-center"
          aria-label="Menu"
          aria-expanded={isMenuOpen}
        >
          {isMenuOpen ? <FiX size={24} /> : <FiMenu size={24} />}
        </button>
      </div>

      {/* Menu Suspenso */}
      {isMenuOpen && (
        <div 
          ref={menuRef}
          className="absolute top-full right-4 mt-2 w-64 bg-white text-blue-900 rounded-lg shadow-xl z-50 overflow-hidden"
        >
          <div className="p-4 border-b border-gray-200">
            <p className="font-bold">Usuário</p>
            <p className="text-sm text-gray-600">Clínica</p>
          </div>
          
          <div className="py-2">
            {menuItems.map((item, index) => (

              <Link
                key={index}
                href={item.href}
                className={`
                  ${
                    userType != 'dentista' && item.label == 'Dashboard' ? ('hidden') : ('flex')
                  }
                  items-center px-6 py-3 transition-colors ${
                  item.active 
                    ? 'bg-blue-50 text-blue-800 border-l-4 border-blue-800' 
                    : 'hover:bg-blue-50'
                }`}
              >
                <span className="mr-3 text-blue-700">{item.icon}</span>
                {item.label}
              </Link>
            ))}
          </div>
          
          <div className="p-4 border-t border-gray-200">
            <button 
              onClick={() => {
                logoutUsuario();
                setIsMenuOpen(false);
                router.push('login');
              }}
              className="w-full flex items-center px-6 py-3 text-red-600 hover:bg-red-50 transition-colors"
            >
              <span className="mr-3"><FiLogOut size={20} /></span>
              Sair do Sistema
            </button>
          </div>
        </div>
      )}
    </header>
  );
}