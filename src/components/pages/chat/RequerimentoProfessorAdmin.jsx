import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  X, 
  FileText, 
  User, 
  Calendar, 
  Clock, 
  Save, 
  Send, 
  AlertCircle,
  CheckCircle,
  Building,
  GraduationCap,
  ArrowLeft
} from 'lucide-react';

const RequerimentoProfessorAdmin = ({ onClose, userRole, userName }) => {
  const [formData, setFormData] = useState({
    nomeCompleto: '',
    rg: '',
    matricula: '',
    tipoRequerimento: '',
    justificativaFalta: false,
    periodoInicio: '',
    periodoFim: '',
    informacoesAdicionais: '',
    observacoes: ''
  });

  const [currentStep, setCurrentStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  // Gerar protocolo único
  const generateProtocol = () => {
    const date = new Date();
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    const random = Math.floor(Math.random() * 1000).toString().padStart(3, '0');
    return `REQ-${year}${month}${day}-${random}`;
  };

  const handleInputChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleSubmit = async () => {
    setIsSubmitting(true);
    
    // Simular envio
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    const protocol = generateProtocol();
    
    // Aqui você salvaria no banco de dados
    console.log('Requerimento Professor/Admin enviado:', {
      ...formData,
      protocol,
      userRole,
      userName,
      dataEnvio: new Date()
    });
    
    setIsSubmitting(false);
    setShowSuccess(true);
    
    // Fechar após 3 segundos
    setTimeout(() => {
      onClose();
    }, 3000);
  };

  const isFormValid = () => {
    return formData.nomeCompleto.trim() && 
           formData.rg.trim() && 
           formData.matricula.trim() && 
           formData.tipoRequerimento.trim() && 
           formData.informacoesAdicionais.trim();
  };

  if (showSuccess) {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xl"
      >
        <motion.div
          initial={{ scale: 0.9, opacity: 0, y: 20 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          className="w-full max-w-md bg-white/95 dark:bg-gray-900/95 backdrop-blur-2xl rounded-3xl shadow-2xl border border-white/20 dark:border-gray-700/50 p-8 text-center"
        >
          <div className="w-20 h-20 bg-gradient-to-br from-green-500 to-emerald-500 rounded-3xl flex items-center justify-center mx-auto mb-6 shadow-lg shadow-green-500/25">
            <CheckCircle size={40} className="text-white" />
          </div>
          <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-3">
            Requerimento Enviado!
          </h3>
          <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
            Seu requerimento foi enviado com sucesso e será processado pela administração.
          </p>
        </motion.div>
      </motion.div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xl"
      onClick={() => onClose()}
    >
      <motion.div
        initial={{ scale: 0.9, opacity: 0, y: 20 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        exit={{ scale: 0.9, opacity: 0, y: 20 }}
        className="w-full max-w-4xl h-[90vh] bg-white/95 dark:bg-gray-900/95 backdrop-blur-2xl rounded-3xl shadow-2xl border border-white/20 dark:border-gray-700/50 overflow-hidden flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="p-8 bg-gradient-to-br from-[#8C43FF]/10 via-[#6B32C3]/10 to-cyan-500/10 border-b border-gray-200/50 dark:border-gray-700/50">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 bg-gradient-to-br from-[#8C43FF] to-[#6B32C3] rounded-3xl flex items-center justify-center shadow-lg shadow-purple-500/25">
                <FileText size={28} className="text-white" />
              </div>
              <div>
                <h2 className="text-3xl font-bold bg-gradient-to-r from-[#8C43FF] to-[#6B32C3] bg-clip-text text-transparent">
                  Requerimento Geral
                </h2>
                <p className="text-gray-600 dark:text-gray-400 mt-1">
                  {userRole === 'admin' ? 'Administrativo' : 'Professor'} - ETEC de Peruíbe
                </p>
              </div>
            </div>
            <button
              onClick={onClose}
              className="p-3 hover:bg-gray-100/50 dark:hover:bg-gray-700/50 rounded-2xl transition-all duration-300 hover:scale-110"
            >
              <X size={24} className="text-gray-600 dark:text-gray-400" />
            </button>
          </div>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-8 scrollbar-thin scrollbar-thumb-[#8C43FF] scrollbar-track-gray-200 dark:scrollbar-track-gray-800">
          <div className="space-y-6">
            {/* Dados Pessoais */}
            <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-xl rounded-3xl p-6 border border-gray-200/50 dark:border-gray-700/50">
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-6">
                Dados do Requerente
              </h3>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="md:col-span-2">
                  <label className="block text-sm font-bold text-gray-700 dark:text-gray-300 mb-3">
                    Nome Completo *
                  </label>
                  <input
                    type="text"
                    value={formData.nomeCompleto}
                    onChange={(e) => handleInputChange('nomeCompleto', e.target.value)}
                    className="w-full px-4 py-4 bg-white/50 dark:bg-gray-700/50 border border-gray-200/50 dark:border-gray-600/50 rounded-2xl text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:ring-2 focus:ring-[#8C43FF] focus:border-transparent backdrop-blur-xl transition-all duration-300"
                    placeholder="Digite seu nome completo"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-bold text-gray-700 dark:text-gray-300 mb-3">
                    RG *
                  </label>
                  <input
                    type="text"
                    value={formData.rg}
                    onChange={(e) => handleInputChange('rg', e.target.value)}
                    className="w-full px-4 py-4 bg-white/50 dark:bg-gray-700/50 border border-gray-200/50 dark:border-gray-600/50 rounded-2xl text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:ring-2 focus:ring-[#8C43FF] focus:border-transparent backdrop-blur-xl transition-all duration-300"
                    placeholder="00.000.000-0"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
                <div>
                  <label className="block text-sm font-bold text-gray-700 dark:text-gray-300 mb-3">
                    Matrícula *
                  </label>
                  <input
                    type="text"
                    value={formData.matricula}
                    onChange={(e) => handleInputChange('matricula', e.target.value)}
                    className="w-full px-4 py-4 bg-white/50 dark:bg-gray-700/50 border border-gray-200/50 dark:border-gray-600/50 rounded-2xl text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:ring-2 focus:ring-[#8C43FF] focus:border-transparent backdrop-blur-xl transition-all duration-300"
                    placeholder="Digite sua matrícula"
                  />
                </div>
              </div>
            </div>

            {/* Tipo de Requerimento */}
            <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-xl rounded-3xl p-6 border border-gray-200/50 dark:border-gray-700/50">
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-6">
                Tipo de Requerimento
              </h3>
              
              <div className="space-y-4">
                <div className="flex items-center gap-4">
                  <input
                    type="radio"
                    id="declaracao"
                    name="tipoRequerimento"
                    value="declaracao"
                    checked={formData.tipoRequerimento === 'declaracao'}
                    onChange={(e) => handleInputChange('tipoRequerimento', e.target.value)}
                    className="w-5 h-5 text-[#8C43FF] focus:ring-[#8C43FF] focus:ring-2"
                  />
                  <label htmlFor="declaracao" className="text-gray-900 dark:text-white font-medium">
                    Declaração
                  </label>
                </div>
                
                <div className="flex items-center gap-4">
                  <input
                    type="radio"
                    id="atestado"
                    name="tipoRequerimento"
                    value="atestado"
                    checked={formData.tipoRequerimento === 'atestado'}
                    onChange={(e) => handleInputChange('tipoRequerimento', e.target.value)}
                    className="w-5 h-5 text-[#8C43FF] focus:ring-[#8C43FF] focus:ring-2"
                  />
                  <label htmlFor="atestado" className="text-gray-900 dark:text-white font-medium">
                    Atestado
                  </label>
                </div>
                
                <div className="flex items-center gap-4">
                  <input
                    type="radio"
                    id="outros"
                    name="tipoRequerimento"
                    value="outros"
                    checked={formData.tipoRequerimento === 'outros'}
                    onChange={(e) => handleInputChange('tipoRequerimento', e.target.value)}
                    className="w-5 h-5 text-[#8C43FF] focus:ring-[#8C43FF] focus:ring-2"
                  />
                  <label htmlFor="outros" className="text-gray-900 dark:text-white font-medium">
                    Outros (Especificar)
                  </label>
                </div>
                
                <div className="flex items-center gap-4">
                  <input
                    type="checkbox"
                    id="justificativaFalta"
                    checked={formData.justificativaFalta}
                    onChange={(e) => handleInputChange('justificativaFalta', e.target.checked)}
                    className="w-5 h-5 text-[#8C43FF] focus:ring-[#8C43FF] focus:ring-2 rounded"
                  />
                  <label htmlFor="justificativaFalta" className="text-gray-900 dark:text-white font-medium">
                    Justificativa de Falta
                  </label>
                </div>
              </div>

              {formData.justificativaFalta && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-6"
                >
                  <div>
                    <label className="block text-sm font-bold text-gray-700 dark:text-gray-300 mb-3">
                      Período - Início
                    </label>
                    <input
                      type="date"
                      value={formData.periodoInicio}
                      onChange={(e) => handleInputChange('periodoInicio', e.target.value)}
                      className="w-full px-4 py-4 bg-white/50 dark:bg-gray-700/50 border border-gray-200/50 dark:border-gray-600/50 rounded-2xl text-gray-900 dark:text-white focus:ring-2 focus:ring-[#8C43FF] focus:border-transparent backdrop-blur-xl transition-all duration-300"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-bold text-gray-700 dark:text-gray-300 mb-3">
                      Período - Fim
                    </label>
                    <input
                      type="date"
                      value={formData.periodoFim}
                      onChange={(e) => handleInputChange('periodoFim', e.target.value)}
                      className="w-full px-4 py-4 bg-white/50 dark:bg-gray-700/50 border border-gray-200/50 dark:border-gray-600/50 rounded-2xl text-gray-900 dark:text-white focus:ring-2 focus:ring-[#8C43FF] focus:border-transparent backdrop-blur-xl transition-all duration-300"
                    />
                  </div>
                </motion.div>
              )}
            </div>

            {/* Informações Adicionais */}
            <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-xl rounded-3xl p-6 border border-gray-200/50 dark:border-gray-700/50">
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-6">
                Informações Adicionais *
              </h3>
              
              <textarea
                value={formData.informacoesAdicionais}
                onChange={(e) => handleInputChange('informacoesAdicionais', e.target.value)}
                className="w-full px-4 py-4 bg-white/50 dark:bg-gray-700/50 border border-gray-200/50 dark:border-gray-600/50 rounded-2xl text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:ring-2 focus:ring-[#8C43FF] focus:border-transparent backdrop-blur-xl transition-all duration-300 resize-none"
                rows={6}
                placeholder="Descreva detalhadamente sua solicitação..."
              />
            </div>

            {/* Observações */}
            <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-xl rounded-3xl p-6 border border-gray-200/50 dark:border-gray-700/50">
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-6">
                Observações da Direção
              </h3>
              
              <textarea
                value={formData.observacoes}
                onChange={(e) => handleInputChange('observacoes', e.target.value)}
                className="w-full px-4 py-4 bg-white/50 dark:bg-gray-700/50 border border-gray-200/50 dark:border-gray-600/50 rounded-2xl text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:ring-2 focus:ring-[#8C43FF] focus:border-transparent backdrop-blur-xl transition-all duration-300 resize-none"
                rows={4}
                placeholder="Campo reservado para observações da direção..."
              />
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="p-8 bg-gradient-to-r from-gray-50/50 to-white/50 dark:from-gray-800/50 dark:to-gray-700/50 border-t border-gray-200/50 dark:border-gray-700/50 backdrop-blur-xl">
          <div className="flex justify-between items-center">
            <button
              onClick={onClose}
              className="flex items-center gap-2 px-6 py-3 text-gray-600 dark:text-gray-400 hover:bg-gray-100/50 dark:hover:bg-gray-700/50 rounded-2xl transition-all duration-300 font-medium"
            >
              <ArrowLeft size={16} />
              Cancelar
            </button>
            
            <div className="flex gap-4">
              <button
                className="flex items-center gap-2 px-6 py-3 bg-white/50 dark:bg-gray-700/50 text-gray-700 dark:text-gray-300 hover:bg-gray-100/50 dark:hover:bg-gray-600/50 rounded-2xl transition-all duration-300 font-medium backdrop-blur-xl"
              >
                <Save size={16} />
                Salvar Rascunho
              </button>
              
              <button
                onClick={handleSubmit}
                disabled={!isFormValid() || isSubmitting}
                className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-[#8C43FF] to-[#6B32C3] text-white rounded-2xl hover:from-[#7A3BE6] hover:to-[#5927A3] disabled:from-gray-400 disabled:to-gray-500 disabled:cursor-not-allowed transition-all duration-300 font-medium shadow-lg shadow-purple-500/25 hover:shadow-xl hover:shadow-purple-500/30"
              >
                {isSubmitting ? (
                  <>
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    Enviando...
                  </>
                ) : (
                  <>
                    <Send size={16} />
                    Enviar Requerimento
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default RequerimentoProfessorAdmin;