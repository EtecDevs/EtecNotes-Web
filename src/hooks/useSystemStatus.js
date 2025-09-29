import { useState, useEffect } from 'react';

export const useSystemStatus = () => {
  const [checkingSystem, setCheckingSystem] = useState(true);
  const [systemNeedsBootstrap, setSystemNeedsBootstrap] = useState(false);

  useEffect(() => {
    checkSystemStatus();
  }, []);

  const checkSystemStatus = async () => {
    try {
      setCheckingSystem(true);
      const response = await fetch('http://localhost:5001/api/check-admin');
      const data = await response.json();
      setSystemNeedsBootstrap(data.needsBootstrap || false);
    } catch (error) {
      console.error('Erro ao verificar status do sistema:', error);
      setSystemNeedsBootstrap(false);
    } finally {
      setCheckingSystem(false);
    }
  };

  return { 
    checkingSystem, 
    systemNeedsBootstrap, 
    checkSystemStatus 
  };
};
