import React, { useState, useRef } from 'react';
import { ArrowLeft, Upload, Download, FileText, AlertCircle, CheckCircle, X } from 'lucide-react';
import authService from '../../../services/authService';

const ImportUsers = ({ onBack, onSuccess }) => {
  const [file, setFile] = useState(null);
  const [preview, setPreview] = useState(null);
  const [loading, setLoading] = useState(false);
  const [results, setResults] = useState(null);
  const [error, setError] = useState('');
  const [step, setStep] = useState('upload'); // upload, preview, importing, results
  const fileInputRef = useRef();

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile) {
      setFile(selectedFile);
      setError('');
      parseFile(selectedFile);
    }
  };

  const parseFile = async (selectedFile) => {
    try {
      const text = await selectedFile.text();
      let data;

      if (selectedFile.name.endsWith('.json')) {
        data = JSON.parse(text);
      } else if (selectedFile.name.endsWith('.csv')) {
        data = parseCSV(text);
      } else {
        throw new Error('Formato de arquivo não suportado. Use CSV ou JSON.');
      }

      validateAndSetPreview(data);
    } catch (err) {
      setError('Erro ao processar arquivo: ' + err.message);
      setFile(null);
    }
  };

  const parseCSV = (csvText) => {
    const lines = csvText.trim().split('\n');
    const headers = lines[0].split(',').map(h => h.trim().replace(/"/g, ''));
    
    const alunos = [];
    const professores = [];

    for (let i = 1; i < lines.length; i++) {
      const values = lines[i].split(',').map(v => v.trim().replace(/"/g, ''));
      const obj = {};
      
      headers.forEach((header, index) => {
        obj[header] = values[index] || '';
      });

      // Determinar se é aluno ou professor baseado na presença do campo RM
      if (obj.rm || obj.RM) {
        obj.rm = obj.rm || obj.RM;
        alunos.push(obj);
      } else {
        // Se tem disciplinas, é professor
        if (obj.disciplinas) {
          obj.disciplinas = obj.disciplinas.split(';').filter(d => d.trim());
        }
        professores.push(obj);
      }
    }

    return { alunos, professores };
  };

  const validateAndSetPreview = (data) => {
    const errors = [];
    
    // Validar estrutura
    if (!data.alunos && !data.professores) {
      errors.push('Arquivo deve conter pelo menos "alunos" ou "professores"');
    }

    // Validar alunos
    if (data.alunos) {
      data.alunos.forEach((aluno, index) => {
        if (!aluno.email) errors.push(`Aluno ${index + 1}: email obrigatório`);
        if (!aluno.rm) errors.push(`Aluno ${index + 1}: RM obrigatório`);
        if (!aluno.nome) errors.push(`Aluno ${index + 1}: nome obrigatório`);
      });
    }

    // Validar professores
    if (data.professores) {
      data.professores.forEach((professor, index) => {
        if (!professor.email) errors.push(`Professor ${index + 1}: email obrigatório`);
        if (!professor.nome) errors.push(`Professor ${index + 1}: nome obrigatório`);
      });
    }

    if (errors.length > 0) {
      setError('Erros encontrados no arquivo:\\n' + errors.join('\\n'));
      return;
    }

    setPreview(data);
    setStep('preview');
  };

  const handleImport = async () => {
    if (!preview) return;

    try {
      setLoading(true);
      setStep('importing');
      
      const response = await authService.importUsers(preview);
      
      if (response.success) {
        setResults(response.results);
        setStep('results');
        
        if (onSuccess) {
          onSuccess();
        }
      }
    } catch (error) {
      console.error('Erro ao importar usuários:', error);
      setError('Erro ao importar usuários: ' + error.message);
      setStep('preview');
    } finally {
      setLoading(false);
    }
  };

  const downloadTemplate = () => {
    const csvTemplate = `tipo,email,nome,rm,turma,curso,disciplinas,departamento,senha
aluno,aluno1@exemplo.com,João Silva,12001,1A,Informática,,"",123456
aluno,aluno2@exemplo.com,Maria Santos,12002,1A,Informática,,"",123456
professor,prof1@exemplo.com,Carlos Oliveira,,,,Matemática;Física,Exatas,123456`;

    const jsonTemplate = {
      alunos: [
        {
          email: "aluno1@exemplo.com",
          nome: "João Silva",
          rm: "12001",
          turma: "1A",
          curso: "Informática",
          senha: "123456"
        },
        {
          email: "aluno2@exemplo.com",
          nome: "Maria Santos",
          rm: "12002",
          turma: "1A",
          curso: "Informática",
          senha: "123456"
        }
      ],
      professores: [
        {
          email: "prof1@exemplo.com",
          nome: "Carlos Oliveira",
          disciplinas: ["Matemática", "Física"],
          departamento: "Exatas",
          senha: "123456"
        }
      ]
    };

    // Download CSV
    const csvBlob = new Blob([csvTemplate], { type: 'text/csv' });
    const csvUrl = URL.createObjectURL(csvBlob);
    const csvLink = document.createElement('a');
    csvLink.href = csvUrl;
    csvLink.download = 'template_usuarios.csv';
    csvLink.click();

    // Download JSON
    const jsonBlob = new Blob([JSON.stringify(jsonTemplate, null, 2)], { type: 'application/json' });
    const jsonUrl = URL.createObjectURL(jsonBlob);
    const jsonLink = document.createElement('a');
    jsonLink.href = jsonUrl;
    jsonLink.download = 'template_usuarios.json';
    jsonLink.click();
  };

  const resetImport = () => {
    setFile(null);
    setPreview(null);
    setResults(null);
    setError('');
    setStep('upload');
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const renderUploadStep = () => (
    <div className="text-center py-12">
      <Upload className="w-16 h-16 mx-auto text-gray-400 mb-4" />
      <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
        Importar Usuários em Lote
      </h3>
      <p className="text-gray-600 dark:text-gray-400 mb-6">
        Faça upload de um arquivo CSV ou JSON com os dados dos usuários
      </p>
      
      <div className="space-y-4">
        <button
          onClick={() => fileInputRef.current?.click()}
          className="inline-flex items-center px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
        >
          <Upload className="w-5 h-5 mr-2" />
          Escolher Arquivo
        </button>
        
        <div className="text-sm text-gray-500 dark:text-gray-400">
          Suporte para arquivos .csv e .json
        </div>

        <button
          onClick={downloadTemplate}
          className="inline-flex items-center px-4 py-2 text-blue-600 dark:text-blue-400 hover:text-blue-800"
        >
          <Download className="w-4 h-4 mr-2" />
          Baixar Template
        </button>
      </div>

      <input
        ref={fileInputRef}
        type="file"
        onChange={handleFileChange}
        accept=".csv,.json"
        className="hidden"
      />
    </div>
  );

  const renderPreviewStep = () => (
    <div className="space-y-6">
      <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-4">
        <div className="flex items-center">
          <FileText className="w-5 h-5 text-blue-600 dark:text-blue-400 mr-2" />
          <span className="font-medium text-blue-800 dark:text-blue-200">
            Arquivo: {file?.name}
          </span>
        </div>
      </div>

      {preview?.alunos && preview.alunos.length > 0 && (
        <div>
          <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-3">
            Alunos ({preview.alunos.length})
          </h3>
          <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-600 rounded-lg overflow-hidden">
            <div className="max-h-60 overflow-y-auto">
              <table className="w-full text-sm">
                <thead className="bg-gray-100 dark:bg-gray-700">
                  <tr>
                    <th className="px-4 py-2 text-left">Email</th>
                    <th className="px-4 py-2 text-left">Nome</th>
                    <th className="px-4 py-2 text-left">RM</th>
                    <th className="px-4 py-2 text-left">Turma</th>
                    <th className="px-4 py-2 text-left">Curso</th>
                  </tr>
                </thead>
                <tbody>
                  {preview.alunos.map((aluno, index) => (
                    <tr key={index} className="border-t border-gray-200 dark:border-gray-600">
                      <td className="px-4 py-2">{aluno.email}</td>
                      <td className="px-4 py-2">{aluno.nome}</td>
                      <td className="px-4 py-2">{aluno.rm}</td>
                      <td className="px-4 py-2">{aluno.turma || '-'}</td>
                      <td className="px-4 py-2">{aluno.curso || '-'}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {preview?.professores && preview.professores.length > 0 && (
        <div>
          <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-3">
            Professores ({preview.professores.length})
          </h3>
          <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-600 rounded-lg overflow-hidden">
            <div className="max-h-60 overflow-y-auto">
              <table className="w-full text-sm">
                <thead className="bg-gray-100 dark:bg-gray-700">
                  <tr>
                    <th className="px-4 py-2 text-left">Email</th>
                    <th className="px-4 py-2 text-left">Nome</th>
                    <th className="px-4 py-2 text-left">Disciplinas</th>
                    <th className="px-4 py-2 text-left">Departamento</th>
                  </tr>
                </thead>
                <tbody>
                  {preview.professores.map((professor, index) => (
                    <tr key={index} className="border-t border-gray-200 dark:border-gray-600">
                      <td className="px-4 py-2">{professor.email}</td>
                      <td className="px-4 py-2">{professor.nome}</td>
                      <td className="px-4 py-2">{Array.isArray(professor.disciplinas) ? professor.disciplinas.join(', ') : professor.disciplinas || '-'}</td>
                      <td className="px-4 py-2">{professor.departamento || '-'}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      <div className="flex justify-end space-x-4">
        <button
          onClick={resetImport}
          className="px-6 py-2 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700"
        >
          Voltar
        </button>
        <button
          onClick={handleImport}
          className="px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700"
        >
          Importar Usuários
        </button>
      </div>
    </div>
  );

  const renderImportingStep = () => (
    <div className="text-center py-12">
      <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-blue-600 mx-auto mb-4"></div>
      <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
        Importando Usuários...
      </h3>
      <p className="text-gray-600 dark:text-gray-400">
        Aguarde enquanto processamos os dados
      </p>
    </div>
  );

  const renderResultsStep = () => (
    <div className="space-y-6">
      <div className="bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg p-4">
        <div className="flex items-center">
          <CheckCircle className="w-5 h-5 text-green-600 dark:text-green-400 mr-2" />
          <span className="font-medium text-green-800 dark:text-green-200">
            Importação Concluída!
          </span>
        </div>
      </div>

      {results?.alunos && (
        <div>
          <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-3">
            Resultados - Alunos
          </h3>
          
          {results.alunos.success.length > 0 && (
            <div className="mb-4">
              <h4 className="text-green-600 dark:text-green-400 font-medium mb-2">
                ✅ Sucessos ({results.alunos.success.length})
              </h4>
              <div className="bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg p-4 max-h-48 overflow-y-auto">
                {results.alunos.success.map((aluno, index) => (
                  <div key={index} className="text-sm text-green-800 dark:text-green-200 mb-1">
                    {aluno.nome} ({aluno.email}) - RM: {aluno.rm} - Senha: {aluno.senhaTemporaria}
                  </div>
                ))}
              </div>
            </div>
          )}

          {results.alunos.errors.length > 0 && (
            <div className="mb-4">
              <h4 className="text-red-600 dark:text-red-400 font-medium mb-2">
                ❌ Erros ({results.alunos.errors.length})
              </h4>
              <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg p-4 max-h-48 overflow-y-auto">
                {results.alunos.errors.map((error, index) => (
                  <div key={index} className="text-sm text-red-800 dark:text-red-200 mb-1">
                    {error.email}: {error.error}
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      )}

      {results?.professores && (
        <div>
          <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-3">
            Resultados - Professores
          </h3>
          
          {results.professores.success.length > 0 && (
            <div className="mb-4">
              <h4 className="text-green-600 dark:text-green-400 font-medium mb-2">
                ✅ Sucessos ({results.professores.success.length})
              </h4>
              <div className="bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg p-4 max-h-48 overflow-y-auto">
                {results.professores.success.map((professor, index) => (
                  <div key={index} className="text-sm text-green-800 dark:text-green-200 mb-1">
                    {professor.nome} ({professor.email}) - Senha: {professor.senhaTemporaria}
                  </div>
                ))}
              </div>
            </div>
          )}

          {results.professores.errors.length > 0 && (
            <div className="mb-4">
              <h4 className="text-red-600 dark:text-red-400 font-medium mb-2">
                ❌ Erros ({results.professores.errors.length})
              </h4>
              <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg p-4 max-h-48 overflow-y-auto">
                {results.professores.errors.map((error, index) => (
                  <div key={index} className="text-sm text-red-800 dark:text-red-200 mb-1">
                    {error.email}: {error.error}
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      )}

      <div className="flex justify-end space-x-4">
        <button
          onClick={resetImport}
          className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
        >
          Nova Importação
        </button>
        <button
          onClick={onBack}
          className="px-6 py-2 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700"
        >
          Voltar ao Dashboard
        </button>
      </div>
    </div>
  );

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
                Importar Usuários
              </h1>
              <p className="text-gray-600 dark:text-gray-400">
                {step === 'upload' && 'Faça upload de um arquivo com os dados dos usuários'}
                {step === 'preview' && 'Revise os dados antes de importar'}
                {step === 'importing' && 'Processando importação...'}
                {step === 'results' && 'Importação finalizada'}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Error */}
      {error && (
        <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg p-4">
          <div className="flex items-start">
            <AlertCircle className="w-5 h-5 text-red-600 dark:text-red-400 mr-2 mt-0.5" />
            <div>
              <h3 className="text-red-800 dark:text-red-200 font-semibold">Erro</h3>
              <p className="text-red-700 dark:text-red-300 whitespace-pre-line">{error}</p>
            </div>
          </div>
        </div>
      )}

      {/* Content */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
        {step === 'upload' && renderUploadStep()}
        {step === 'preview' && renderPreviewStep()}
        {step === 'importing' && renderImportingStep()}
        {step === 'results' && renderResultsStep()}
      </div>
    </div>
  );
};

export default ImportUsers;