
import { useAuth } from "../context/AuthContext";
import { Cabecalho } from "../components/Cabecalho";

export default function Dashboard() {
  const { user, logout } = useAuth();

  const stats = [
    { icon: "🚌", value: "12", label: "Linhas ativas", color: "from-blue-500 to-cyan-500" },
    { icon: "👥", value: "1.2k", label: "Usuários hoje", color: "from-green-500 to-emerald-500" },
    { icon: "⭐", value: "4.8", label: "Avaliação", color: "from-amber-500 to-orange-500" },
    { icon: "⏰", value: "98%", label: "Pontualidade", color: "from-purple-500 to-pink-500" }
  ];

  return (
    <>
      <Cabecalho />
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-blue-900 to-purple-900 pt-20">
        {}
        <div className="fixed inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-blue-600/20 via-transparent to-transparent"></div>
        
        <div className="relative z-10 max-w-7xl mx-auto p-6">
          {}
          <div className="glass rounded-3xl p-8 mb-8 text-center">
            <h1 className="text-5xl font-bold text-white mb-4">
              Olá, {user?.name}! 👋
            </h1>
            <p className="text-blue-200 text-xl">
              Bem-vindo ao painel de controle Mobiliza Vida
            </p>
            {user?.role === 'admin' && (
              <span className="inline-block bg-gradient-to-r from-red-500 to-pink-600 text-white px-4 py-2 rounded-full text-sm font-semibold mt-4">
                👑 Administrador
              </span>
            )}
          </div>

          {}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            {stats.map((stat, index) => (
              <div key={index} className="glass rounded-2xl p-6 group hover:scale-105 transition-transform duration-300">
                <div className="flex items-center">
                  <div className={`bg-gradient-to-r ${stat.color} p-3 rounded-xl`}>
                    <span className="text-2xl">{stat.icon}</span>
                  </div>
                  <div className="ml-4">
                    <h3 className="text-3xl font-bold text-white">{stat.value}</h3>
                    <p className="text-blue-200 text-sm">{stat.label}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {}
            <div className="glass rounded-2xl p-8">
              <h2 className="text-2xl font-bold text-white mb-6 flex items-center">
                <span className="bg-gradient-to-r from-blue-500 to-purple-600 p-2 rounded-lg mr-3">👤</span>
                Sua Conta
              </h2>
              
              <div className="space-y-4">
                <div className="flex justify-between items-center p-4 bg-white/5 rounded-xl">
                  <span className="text-blue-200">Nome:</span>
                  <span className="text-white font-semibold">{user?.name}</span>
                </div>
                
                <div className="flex justify-between items-center p-4 bg-white/5 rounded-xl">
                  <span className="text-blue-200">Email:</span>
                  <span className="text-white font-semibold">{user?.email}</span>
                </div>
                
                <div className="flex justify-between items-center p-4 bg-white/5 rounded-xl">
                  <span className="text-blue-200">Tipo:</span>
                  <span className="text-white font-semibold">
                    {user?.role === 'admin' ? 'Administrador' : 'Usuário'}
                  </span>
                </div>
              </div>
            </div>

            {}
            <div className="glass rounded-2xl p-8">
              <h2 className="text-2xl font-bold text-white mb-6 flex items-center">
                <span className="bg-gradient-to-r from-green-500 to-emerald-600 p-2 rounded-lg mr-3">⚡</span>
                Ações Rápidas
              </h2>
              
              <div className="grid grid-cols-2 gap-4">
                <button className="bg-gradient-to-r from-blue-500 to-purple-600 text-white p-4 rounded-xl hover:scale-105 transition-transform">
                  🗺️ Ver Rotas
                </button>
                <button className="bg-gradient-to-r from-green-500 to-emerald-600 text-white p-4 rounded-xl hover:scale-105 transition-transform">
                  ⭐ Avaliar
                </button>
                <button className="bg-gradient-to-r from-amber-500 to-orange-600 text-white p-4 rounded-xl hover:scale-105 transition-transform">
                  💳 Bilhetes
                </button>
                <button className="bg-gradient-to-r from-purple-500 to-pink-600 text-white p-4 rounded-xl hover:scale-105 transition-transform">
                  🚀 Status
                </button>
              </div>
            </div>
          </div>

          {}
          <div className="text-center mt-12">
            <button
              onClick={logout}
              className="bg-gradient-to-r from-red-500 to-pink-600 text-white px-8 py-4 rounded-xl font-semibold hover:scale-105 transition-transform shadow-lg hover:shadow-xl"
            >
              🚪 Sair da Conta
            </button>
          </div>
        </div>
      </div>
    </>
  );
}