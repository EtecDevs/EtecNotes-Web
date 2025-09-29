// Serviço base de WebSocket para EtecNotes
// Pronto para ser integrado em chat, notificações, etc.

class SocketService {
  constructor(url) {
    this.url = url || 'ws://localhost:5001'; // Altere para o endereço do seu backend WebSocket
    this.socket = null;
    this.listeners = [];
  }

  connect() {
    if (this.socket && this.socket.readyState === WebSocket.OPEN) return;
    this.socket = new WebSocket(this.url);
    this.socket.onopen = () => {
      console.log('[WebSocket] Conectado:', this.url);
    };
    this.socket.onmessage = (event) => {
      const data = JSON.parse(event.data);
      this.listeners.forEach((cb) => cb(data));
    };
    this.socket.onclose = () => {
      console.log('[WebSocket] Desconectado');
    };
    this.socket.onerror = (err) => {
      console.error('[WebSocket] Erro:', err);
    };
  }

  disconnect() {
    if (this.socket) {
      this.socket.close();
      this.socket = null;
    }
  }

  send(data) {
    if (this.socket && this.socket.readyState === WebSocket.OPEN) {
      this.socket.send(JSON.stringify(data));
    }
  }

  onMessage(callback) {
    this.listeners.push(callback);
  }

  removeMessageListener(callback) {
    this.listeners = this.listeners.filter((cb) => cb !== callback);
  }
}

// Instância única para uso global
const socketService = new SocketService();
export default socketService;
