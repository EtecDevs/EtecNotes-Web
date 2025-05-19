function ContentArea() {
  return (
    <div className="flex flex-col md:flex-row gap-8 mb-10">
      {/* Left Card */}
      <div className="w-full md:w-[45%] h-[320px] bg-[#8C43FF] rounded-3xl p-6">
        <h2 className="text-white text-xl font-semibold">Semana Tecnológica</h2>
      </div>

      {/* Right Text */}
      <div className="w-full md:w-[50%]">
        <p className="text-[#3A3B45] text-lg leading-relaxed">
          O Jornal Etec é um periódico voltado para a divulgação de notícias, eventos e atividades da Etec (Escola
          Técnica Estadual). Seu objetivo é manter alunos, professores e a comunidade escolar atualizados sobre o que
          acontece dentro da instituição, além de abordar temas relevantes para o ambiente educacional. O jornal traz
          reportagens, entrevistas, e informações sobre cursos, projetos, eventos e conquistas dos estudantes e
          professores da Etec, promovendo a integração e o engajamento entre todos os envolvidos na escola.
        </p>
      </div>
    </div>
  )
}

export default ContentArea
