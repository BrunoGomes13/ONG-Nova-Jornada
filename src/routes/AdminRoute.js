import { useState, useEffect } from "react";
import { Navigate } from "react-router-dom";
import { buscarMeuPerfil } from "../services/adminApi";

/* ── Protege rotas que exigem perfil de administrador.
   Valida o role DIRETO com o backend via JWT — nunca confia
   apenas no localStorage, que pode ser editado manualmente
   pelo usuário no DevTools para burlar a proteção.        ── */
const AdminRoute = ({ children }) => {
  const [status, setStatus] = useState("verificando"); // "verificando" | "autorizado" | "negado"

  useEffect(() => {
    const verificarAcesso = async () => {
      const token = localStorage.getItem("token");

      /* ── Sem token, nem precisa perguntar ao backend ── */
      if (!token) {
        setStatus("negado");
        return;
      }

      try {
        /* ── Pergunta ao backend quem é o usuário real do token ── */
        const data = await buscarMeuPerfil();

        if (data?.usuario?.role === "admin") {
          /* ── Mantém o localStorage sincronizado com o backend ── */
          localStorage.setItem("usuario", JSON.stringify(data.usuario));
          setStatus("autorizado");
        } else {
          setStatus("negado");
        }
      } catch (erro) {
        /* ── Token inválido/expirado ou erro de rede: nega o acesso ── */
        setStatus("negado");
      }
    };

    verificarAcesso();
  }, []);

  if (status === "verificando") {
    return (
      <div style={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background: "#0d0f16",
        color: "rgba(255,255,255,0.4)",
        fontFamily: "Sora, sans-serif",
        fontSize: 14,
      }}>
        Verificando acesso...
      </div>
    );
  }

  if (status === "negado") {
    return <Navigate to="/login" replace />;
  }

  return children;
};

export default AdminRoute;
