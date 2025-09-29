import React, { useState } from 'react';
import { ArrowLeft, Save, User, Mail, Key, BookOpen, Building } from 'lucide-react';
import { apiService } from '../../../services/apiService';

const CreateTeacher = ({ onBack, onSuccess }) => {
  const [formData, setFormData] = useState({
    email: '',
    nome: '',
    senha: '',
    disciplinas: [],
    departamento: ''
  });
  const [disciplinaInput, setDisciplinaInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});
  const [success, setSuccess] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    // Limpar erro específico quando usuário começa a digitar
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const addDisciplina = () => {
    if (disciplinaInput.trim() && !formData.disciplinas.includes(disciplinaInput.trim())) {
      setFormData(prev => ({
        ...prev,
        disciplinas: [...prev.disciplinas, disciplinaInput.trim()]
      }));
      setDisciplinaInput('');
    }
  };

  const removeDisciplina = (index) => {
    setFormData(prev => ({
      ...prev,
      disciplinas: prev.disciplinas.filter((_, i) => i !== index)
    }));
  };

  const handleDisciplinaKeyPress = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      addDisciplina();
    }
  };

  const validateForm = () => {
    const newErrors = {};

    // Email obrigatório e válido
    if (!formData.email) {
      newErrors.email = 'Email é obrigatório';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Email inválido';
    }

    // Nome obrigatório
    if (!formData.nome) {
      newErrors.nome = 'Nome completo é obrigatório';
    } else if (formData.nome.length < 2) {
      newErrors.nome = 'Nome deve ter pelo menos 2 caracteres';
    }

    // Senha opcional, mas se informada deve ter pelo menos 6 caracteres
    if (formData.senha && formData.senha.length < 6) {
      newErrors.senha = 'Senha deve ter pelo menos 6 caracteres';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    try {
      setLoading(true);
      setSuccess(null);
      
      // Preparar dados para envio (senha padrão se não informada)
      const teacherData = {
        ...formData,
        senha: formData.senha || '123456'
      };

      const response = await apiService.createTeacher(teacherData);

      if (response.success) {
        setSuccess({
          message: `Professor ${response.professor.nome} criado com sucesso!`,
          tempPassword: response.senhaTemporaria,
          teacher: response.professor
        });
        
        // Resetar formulário
        setFormData({
          email: '',
          nome: '',
          senha: '',
          disciplinas: [],
          departamento: ''
        });
        
        // Chamar callback de sucesso se fornecido
        if (onSuccess) {
          onSuccess();
        }
      }
    } catch (error) {
      console.error('Erro ao criar professor:', error);
      setErrors({
        submit: error.message || 'Erro ao criar professor. Tente novamente.'
      });
    } finally {
      setLoading(false);
    }
  };

  const generateRandomPassword = () => {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let password = '';
    for (let i = 0; i < 8; i++) {
      password += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    setFormData(prev => ({ ...prev, senha: password }));
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <button
              onClick={onBack}
              className="mr-4 p-2 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
            >
              <ArrowLeft className="w-5 h-5" />
            </button>
            <div>
              <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
                Criar Professor
              </h1>
              <p className="text-gray-600 dark:text-gray-400">
                Cadastrar novo professor no sistema
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Success Message */}
      {success && (
        <div className="bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg p-4">
          <h3 className="text-green-800 dark:text-green-200 font-semibold mb-2">
            ✅ {success.message}
          </h3>
          <div className="text-sm text-green-700 dark:text-green-300 space-y-1">
            <p><strong>Email:</strong> {success.teacher.email}</p>
            <p><strong>Nome:</strong> {success.teacher.nome}</p>
            {success.teacher.disciplinas && success.teacher.disciplinas.length > 0 && (
              <p><strong>Disciplinas:</strong> {success.teacher.disciplinas.join(', ')}</p>
            )}
            {success.teacher.departamento && (
              <p><strong>Departamento:</strong> {success.teacher.departamento}</p>
            )}
            <p><strong>Senha temporária:</strong> <code className="bg-green-100 dark:bg-green-800 px-2 py-1 rounded">{success.tempPassword}</code></p>
          </div>
        </div>
      )}

      {/* Form */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Email */}
            <div>
              <label htmlFor="email" className="flex items-center text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                <Mail className="w-4 h-4 mr-2" />
                Email *
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white ${
                  errors.email ? 'border-red-500' : 'border-gray-300'
                }`}
                placeholder="professor@exemplo.com"
              />
              {errors.email && (
                <p className="mt-1 text-sm text-red-600">{errors.email}</p>
              )}
            </div>

            {/* Senha */}
            <div>
              <label htmlFor="senha" className="flex items-center text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                <Key className="w-4 h-4 mr-2" />
                Senha (opcional)
              </label>
              <div className="flex">
                <input
                  type="text"
                  id="senha"
                  name="senha"
                  value={formData.senha}
                  onChange={handleChange}
                  className={`flex-1 px-3 py-2 border rounded-l-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white ${
                    errors.senha ? 'border-red-500' : 'border-gray-300'
                  }`}
                  placeholder="Deixe em branco para usar 123456"
                />
                <button
                  type="button"
                  onClick={generateRandomPassword}
                  className="px-3 py-2 bg-gray-100 dark:bg-gray-600 border border-l-0 border-gray-300 dark:border-gray-600 rounded-r-lg hover:bg-gray-200 dark:hover:bg-gray-500 text-sm"
                >
                  Gerar
                </button>
              </div>
              {errors.senha && (
                <p className="mt-1 text-sm text-red-600">{errors.senha}</p>
              )}
            </div>

            {/* Nome Completo */}
            <div className="md:col-span-2">
              <label htmlFor="nome" className="flex items-center text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                <User className="w-4 h-4 mr-2" />
                Nome Completo *
              </label>
              <input
                type="text"
                id="nome"
                name="nome"
                value={formData.nome}
                onChange={handleChange}
                className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white ${
                  errors.nome ? 'border-red-500' : 'border-gray-300'
                }`}
                placeholder="Maria Silva Santos"
              />
              {errors.nome && (
                <p className="mt-1 text-sm text-red-600">{errors.nome}</p>
              )}
            </div>

            {/* Disciplinas */}
            <div className="md:col-span-2">
              <label className="flex items-center text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                <BookOpen className="w-4 h-4 mr-2" />
                Disciplinas
              </label>
              <div className="flex mb-2">
                <input
                  type="text"
                  value={disciplinaInput}
                  onChange={(e) => setDisciplinaInput(e.target.value)}
                  onKeyPress={handleDisciplinaKeyPress}
                  className="flex-1 px-3 py-2 border border-gray-300 rounded-l-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                  placeholder="Digite uma disciplina e pressione Enter"
                />
                <button
                  type="button"
                  onClick={addDisciplina}
                  className="px-4 py-2 bg-blue-600 text-white rounded-r-lg hover:bg-blue-700"
                >
                  Adicionar
                </button>
              </div>
              {formData.disciplinas.length > 0 && (
                <div className="flex flex-wrap gap-2">
                  {formData.disciplinas.map((disciplina, index) => (
                    <span
                      key={index}
                      className="inline-flex items-center px-3 py-1 bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 rounded-full text-sm"
                    >
                      {disciplina}
                      <button
                        type="button"
                        onClick={() => removeDisciplina(index)}
                        className="ml-2 text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-200"
                      >
                        ×
                      </button>
                    </span>
                  ))}
                </div>
              )}
            </div>

            {/* Departamento */}
            <div className="md:col-span-2">
              <label htmlFor="departamento" className="flex items-center text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                <Building className="w-4 h-4 mr-2" />
                Departamento
              </label>
              <input
                type="text"
                id="departamento"
                name="departamento"
                value={formData.departamento}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                placeholder="Exatas, Humanas, Técnico, etc."
              />
            </div>
          </div>

          {/* Submit Error */}
          {errors.submit && (
            <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg p-4">
              <p className="text-red-800 dark:text-red-200">{errors.submit}</p>
            </div>
          )}

          {/* Submit Button */}
          <div className="flex justify-end space-x-4">
            <button
              type="button"
              onClick={onBack}
              className="px-6 py-2 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700"
            >
              Cancelar
            </button>
            <button
              type="submit"
              disabled={loading}
              className="flex items-center px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? (
                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
              ) : (
                <Save className="w-4 h-4 mr-2" />
              )}
              {loading ? 'Criando...' : 'Criar Professor'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateTeacher;