import { useAuth } from '../hooks/useAuth';
import { useState } from 'react';

const BootstrapPage = ({ onBootstrapComplete }) => {
  const { user, firebaseUser } = useAuth();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);

  const handleBootstrap = async () => {
    setLoading(true);
    setError('');
    try {
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
        onBootstrapComplete && onBootstrapComplete();
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
    <div>
      <h2>Configuração Inicial do Sistema</h2>
      <p>Você será o administrador principal.</p>
      {success ? (
        <div>✅ Administrador criado com sucesso!</div>
      ) : (
        <>
          {error && <div style={{ color: 'red' }}>{error}</div>}
          <button onClick={handleBootstrap} disabled={loading}>
            {loading ? 'Configurando...' : 'Tornar-se Administrador Principal'}
          </button>
        </>
      )}
    </div>
  );
};

export default BootstrapPage;
