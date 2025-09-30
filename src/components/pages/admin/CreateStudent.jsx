import React, { useState } from 'react';
import { ArrowLeft, Save, User, Mail, Hash, GraduationCap, Users, Key } from 'lucide-react';
import authService from '../../../services/authService';

const TURMAS = ["MDS", "MAD", "JOD", "MDI"];
const ANOS = ["1º Ano", "2º Ano", "3º Ano"];

const TURMA_CURSO_MAP = {
  MDS: "Desenvolvimento de Sistemas",
  MAD: "Administração",
  JOD: "Jogos Digitais",
  MDI: "Design de Interiores"
};

const CreateStudent = ({ onBack, onSuccess }) => {
  const [formData, setFormData] = useState({
    email: '',
    rm: '',
    nome: '',
    senha: '',
    turma: '',
    curso: ''
  });
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

  const validateForm = () => {
    const newErrors = {};

    // Email obrigatório e válido
    if (!formData.email) {
      newErrors.email = 'Email é obrigatório';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Email inválido';
    }

    // RM obrigatório
    if (!formData.rm) {
      newErrors.rm = 'RM é obrigatório';
    } else if (formData.rm.length < 3) {
      newErrors.rm = 'RM deve ter pelo menos 3 caracteres';
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
      
      // Combinar ano e cursoTurma para o campo turma
      const turmaFinal = formData.ano && formData.cursoTurma ? `${formData.ano.replace('º Ano','').trim()} ${formData.cursoTurma}` : formData.turma;
      
      // Preparar dados para envio (senha padrão se não informada)
      const studentData = {
        ...formData,
        turma: turmaFinal,
        curso: formData.cursoTurma ? TURMA_CURSO_MAP[formData.cursoTurma] || "" : "",
        senha: formData.senha || '123456'
      };

      const response = await authService.createStudent(studentData);

      if (response.success) {
        setSuccess({
          message: `Aluno ${response.aluno.nome} criado com sucesso!`,
          tempPassword: response.senhaTemporaria,
          student: response.aluno
        });
        
        // Resetar formulário
        setFormData({
          email: '',
          rm: '',
          nome: '',
          senha: '',
          turma: '',
          curso: ''
        });
        
        // Chamar callback de sucesso se fornecido
        if (onSuccess) {
          onSuccess();
        }
      }
    } catch (error) {
      console.error('Erro ao criar aluno:', error);
      setErrors({
        submit: error.message || 'Erro ao criar aluno. Tente novamente.'
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
                Criar Aluno
              </h1>
              <p className="text-gray-600 dark:text-gray-400">
                Cadastrar novo aluno no sistema
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
            <p><strong>Email:</strong> {success.student.email}</p>
            <p><strong>RM:</strong> {success.student.rm}</p>
            <p><strong>Nome:</strong> {success.student.nome}</p>
            {success.student.turma && <p><strong>Turma:</strong> {success.student.turma}</p>}
            {success.student.curso && <p><strong>Curso:</strong> {success.student.curso}</p>}
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
                placeholder="aluno@exemplo.com"
              />
              {errors.email && (
                <p className="mt-1 text-sm text-red-600">{errors.email}</p>
              )}
            </div>

            {/* RM */}
            <div>
              <label htmlFor="rm" className="flex items-center text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                <Hash className="w-4 h-4 mr-2" />
                RM *
              </label>
              <input
                type="text"
                id="rm"
                name="rm"
                value={formData.rm}
                onChange={handleChange}
                className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white ${
                  errors.rm ? 'border-red-500' : 'border-gray-300'
                }`}
                placeholder="12345"
              />
              {errors.rm && (
                <p className="mt-1 text-sm text-red-600">{errors.rm}</p>
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
                placeholder="João Silva Santos"
              />
              {errors.nome && (
                <p className="mt-1 text-sm text-red-600">{errors.nome}</p>
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

            {/* Turma */}
            <div>
              <label className="flex items-center text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                <Users className="w-4 h-4 mr-2" />
                Turma
              </label>
              <div className="flex gap-2">
                <select
                  value={formData.ano || ""}
                  onChange={e => setFormData(prev => ({ ...prev, ano: e.target.value }))}
                  className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                  required
                >
                  <option value="">Selecione o ano</option>
                  {ANOS.map(ano => (
                    <option key={ano} value={ano}>{ano}</option>
                  ))}
                </select>
                <select
                  value={formData.cursoTurma || ""}
                  onChange={e => setFormData(prev => ({ ...prev, cursoTurma: e.target.value }))}
                  className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                  required
                >
                  <option value="">Selecione o curso</option>
                  {TURMAS.map(turma => (
                    <option key={turma} value={turma}>{turma}</option>
                  ))}
                </select>
              </div>
            </div>

            {/* Curso */}
            <div className="md:col-span-2">
              <label htmlFor="curso" className="flex items-center text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                <GraduationCap className="w-4 h-4 mr-2" />
                Curso
              </label>
              <input
                type="text"
                id="curso"
                name="curso"
                value={formData.cursoTurma ? TURMA_CURSO_MAP[formData.cursoTurma] || "" : ""}
                readOnly
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white bg-gray-100 dark:bg-gray-800"
                placeholder="Curso será preenchido automaticamente"
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
              {loading ? 'Criando...' : 'Criar Aluno'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateStudent;