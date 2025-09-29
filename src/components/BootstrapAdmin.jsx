import { useState } from 'react';
import { useAuth } from '../hooks/useAuth';

const BootstrapAdmin = () => {
  const { user, firebaseUser } = useAuth();
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');

  const handleBootstrap = async () => {
    setLoading(true);
    setError('');
    try {
      if (!firebaseUser) {
        setError('Usuário do Firebase não encontrado. Faça login novamente.');
        setLoading(false);
        return;
      }
      const token = await firebaseUser.getIdToken();
      const response = await fetch('http://localhost:5001/api/bootstrap-admin', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          uid: user.uid,
          email: user.email,
          secretKey: 'etecnotes-bootstrap-2025'
        })
      });
      const data = await response.json();
      if (data.success) {
        setSuccess(true);
        setTimeout(() => {
          window.location.href = '/admin/dashboard';
        }, 2000);
      } else {
        setError(data.message || 'Erro desconhecido');
      }
    } catch (err) {
      setError('Erro no bootstrap: ' + err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bootstrap-container">
      <h2>Configuração Inicial do Sistema</h2>
      <p>Este é o primeiro acesso ao EtecNotes. Você será o administrador principal.</p>
      {success ? (
        <div className="success-message">
          <h3>✅ Administrador criado com sucesso!</h3>
          <p>Redirecionando para o painel administrativo...</p>
        </div>
      ) : (
        <>
          {error && <div className="error-message">{error}</div>}
          <button 
            onClick={handleBootstrap} 
            disabled={loading}
            className="bootstrap-button"
          >
            {loading ? 'Configurando...' : 'Tornar-se Administrador Principal'}
          </button>
        </>
      )}
    </div>
  );
};

export default BootstrapAdmin;
