"use client";

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { Home, Receipt, Scan, Bell, User, Menu, X, Leaf, LogOut } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { ThemeToggle } from '@/components/theme-toggle';

const Navigation = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [userEmail, setUserEmail] = useState<string | null>(null); // Estado para el correo del usuario
  const [profileOpen, setProfileOpen] = useState(false);
  const pathname = usePathname();
  const router = useRouter();

  useEffect(() => {
    // Recuperar el correo desde localStorage
    const storedEmail = localStorage.getItem('userEmail');
    if (storedEmail) {
      setUserEmail(storedEmail);
    }
  }, []);

  const handleLogout = () => {
    // Limpiar el correo en localStorage y en el estado
    localStorage.removeItem('userEmail');
    setUserEmail(null);
    router.push('/login');
  };

  const navItems = [
    { href: '/', label: 'Inicio', icon: Home },
    { href: '/transactions', label: 'Movimientos', icon: Receipt },
    { href: '/scan', label: 'Scan', icon: Scan },
    { href: '/notifications', label: 'Notificaciones', icon: Bell },
  ];

  return (
    <nav className="glass-card border-b sticky top-0 z-50">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2">
            <span className="text-2xl font-bold text-emerald-600 flex items-center">
              <Leaf className="h-6 w-6 mr-2" />
              EcoBit Wallet
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-4">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = pathname === item.href;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`nav-item ${isActive ? 'active' : ''}`}
                >
                  <Icon size={18} />
                  <span>{item.label}</span>
                </Link>
              );
            })}

            {/* Usuario (Si está autenticado) */}
            {userEmail ? (
              <div className="relative">
                <Button
                  variant="ghost"
                  className="flex items-center space-x-2"
                  onClick={() => setProfileOpen(!profileOpen)}
                >
                  <User size={18} />
                  <span>{userEmail}</span> {/* Mostrar correo de usuario */}
                </Button>

                {/* Menú de usuario */}
                {profileOpen && (
                  <div className="absolute right-0 mt-2 w-48 bg-white shadow-lg rounded-lg">
                    <Link href="/profile" className="block px-4 py-2 text-gray-700 hover:bg-gray-100">
                      Ver Perfil
                    </Link>
                    <button
                      onClick={handleLogout}
                      className="w-full text-left px-4 py-2 text-red-600 hover:bg-gray-100 flex items-center space-x-2"
                    >
                      <LogOut size={18} />
                      <span>Cerrar Sesión</span>
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <Link href="/login" className="nav-item">
                <User size={18} />
                <span>Iniciar Sesión</span>
              </Link>
            )}

            <ThemeToggle />
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center">
            <ThemeToggle />
            <Button
              variant="ghost"
              size="icon"
              className="ml-2"
              onClick={() => setIsOpen(!isOpen)}
            >
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </Button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation */}
      {isOpen && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          className="md:hidden absolute w-full bg-background border-b"
        >
          <div className="px-2 pt-2 pb-3 space-y-1">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = pathname === item.href;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`nav-item ${isActive ? 'active' : ''}`}
                  onClick={() => setIsOpen(false)}
                >
                  <Icon size={18} />
                  <span>{item.label}</span>
                </Link>
              );
            })}

            {/* Usuario (Versión móvil) */}
            {userEmail ? (
              <div className="border-t mt-2 pt-2">
                <Link href="/profile" className="block px-4 py-2 text-gray-700 hover:bg-gray-100">
                  <User size={18} className="inline-block mr-2" />
                  {userEmail} {/* Mostrar correo en la versión móvil */}
                </Link>
                <button
                  onClick={handleLogout}
                  className="w-full text-left px-4 py-2 text-red-600 hover:bg-gray-100 flex items-center space-x-2"
                >
                  <LogOut size={18} />
                  <span>Cerrar Sesión</span>
                </button>
              </div>
            ) : (
              <Link href="/login" className="nav-item">
                <User size={18} />
                <span>Iniciar Sesión</span>
              </Link>
            )}
          </div>
        </motion.div>
      )}
    </nav>
  );
};

export default Navigation;
