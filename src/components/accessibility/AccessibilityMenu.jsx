"use client"

import React, { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  HelpCircle,
  Type,
  Eye,
  Volume2,
  Palette,
  Hand,
  Plus,
  Minus,
  Check,
  X
} from 'lucide-react'

const AccessibilityMenu = () => {
  const [isOpen, setIsOpen] = useState(false)
  const menuRef = useRef(null)
  const [notification, setNotification] = useState('')
  
  // Estados de acessibilidade
  const [settings, setSettings] = useState({
    libras: false,
    colorBlindMode: 'none', // none, protanopia, deuteranopia, tritanopia, achromatopsia
    contrastMode: 'none', // none, high, ultra
    fontSize: 100, // porcentagem
    screenReader: true // sempre ativo para ARIA
  })

  // Função para mostrar notificação de atalho
  const showNotification = (message) => {
    setNotification(message)
    setTimeout(() => setNotification(''), 2000)
  }

  // Carregar configurações do localStorage
  useEffect(() => {
    const savedSettings = localStorage.getItem('etecnotes-accessibility')
    if (savedSettings) {
      try {
        setSettings(JSON.parse(savedSettings))
      } catch (error) {
        console.error('Erro ao carregar configurações de acessibilidade:', error)
      }
    }
  }, [])

  // Salvar configurações no localStorage e aplicar mudanças
  useEffect(() => {
    localStorage.setItem('etecnotes-accessibility', JSON.stringify(settings))
    applyAccessibilitySettings(settings)
  }, [settings])

  // Aplicar configurações de acessibilidade
  const applyAccessibilitySettings = (settings) => {
    const root = document.documentElement
    const body = document.body

    // Aplicar tamanho da fonte
    root.style.fontSize = `${settings.fontSize}%`

    // Remover classes de contraste anteriores
    root.classList.remove('high-contrast', 'ultra-contrast')
    
    // Aplicar modo de contraste
    if (settings.contrastMode === 'high') {
      console.log('🎨 Ativando alto contraste (suave)')
      root.classList.add('high-contrast')
    } else if (settings.contrastMode === 'ultra') {
      console.log('🎨 Ativando ultra contraste (forte)')
      
      // Adicionar classe
      root.classList.add('ultra-contrast')
      
      // Forçar estilos inline para ultra contraste
      root.style.backgroundColor = '#000000'
      root.style.color = '#FFFFFF'
      body.style.backgroundColor = '#000000'
      body.style.color = '#FFFFFF'
      
      // Aplicar em todos os elementos principais
      setTimeout(() => {
        const elements = document.querySelectorAll('div, section, header, main, footer, nav, article, aside')
        elements.forEach(el => {
          el.style.backgroundColor = '#000000'
          el.style.color = '#FFFFFF'
        })
        
        console.log('✅ Ultra contraste aplicado!')
      }, 100)
    } else {
      console.log('🎨 Desativando contraste')
      
      // Remover estilos inline
      root.style.backgroundColor = ''
      root.style.color = ''
      body.style.backgroundColor = ''
      body.style.color = ''
      
      // Remover de todos os elementos
      setTimeout(() => {
        const elements = document.querySelectorAll('div, section, header, main, footer, nav, article, aside')
        elements.forEach(el => {
          el.style.backgroundColor = ''
          el.style.color = ''
        })
      }, 100)
    }

    // Aplicar filtro de daltonismo
    root.setAttribute('data-color-blind-mode', settings.colorBlindMode)

    // Aplicar filtro CSS para daltonismo
    applyColorBlindFilter(settings.colorBlindMode)

    // Integrar Hand Talk (API de Libras)
    if (settings.libras) {
      loadHandTalk()
    } else {
      removeHandTalk()
    }
  }

  // Aplicar filtro de daltonismo via CSS
  const applyColorBlindFilter = (mode) => {
    const filters = {
      none: '',
      protanopia: 'url(#protanopia-filter)',
      deuteranopia: 'url(#deuteranopia-filter)',
      tritanopia: 'url(#tritanopia-filter)',
      achromatopsia: 'grayscale(100%)'
    }

    document.body.style.filter = mode === 'achromatopsia' ? filters[mode] : ''
    
    // Para outros modos, usamos filtros SVG (mais precisos)
    if (mode !== 'none' && mode !== 'achromatopsia') {
      ensureColorBlindFilters()
      document.body.style.filter = filters[mode]
    }
  }

  // Criar filtros SVG para daltonismo
  const ensureColorBlindFilters = () => {
    if (!document.getElementById('color-blind-filters')) {
      const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg')
      svg.id = 'color-blind-filters'
      svg.style.position = 'absolute'
      svg.style.width = '0'
      svg.style.height = '0'
      svg.innerHTML = `
        <defs>
          <!-- Protanopia (Red-Blind) -->
          <filter id="protanopia-filter">
            <feColorMatrix type="matrix" values="
              0.567, 0.433, 0,     0, 0
              0.558, 0.442, 0,     0, 0
              0,     0.242, 0.758, 0, 0
              0,     0,     0,     1, 0"/>
          </filter>
          
          <!-- Deuteranopia (Green-Blind) -->
          <filter id="deuteranopia-filter">
            <feColorMatrix type="matrix" values="
              0.625, 0.375, 0,   0, 0
              0.7,   0.3,   0,   0, 0
              0,     0.3,   0.7, 0, 0
              0,     0,     0,   1, 0"/>
          </filter>
          
          <!-- Tritanopia (Blue-Blind) -->
          <filter id="tritanopia-filter">
            <feColorMatrix type="matrix" values="
              0.95, 0.05,  0,     0, 0
              0,    0.433, 0.567, 0, 0
              0,    0.475, 0.525, 0, 0
              0,    0,     0,     1, 0"/>
          </filter>
        </defs>
      `
      document.body.appendChild(svg)
    }
  }

  // Carregar Hand Talk API
  const loadHandTalk = () => {
    // Verificar se já existe uma instância
    const existingWidget = document.querySelector('.ht-skip, [data-ht], #htWidget')
    if (existingWidget) {
      // Se já existe, apenas mostrar
      existingWidget.style.display = 'block'
      return
    }

    // Se não existe, criar nova instância
    if (!document.getElementById('handtalk-script')) {
      const script = document.createElement('script')
      script.id = 'handtalk-script'
      script.src = 'https://plugin.handtalk.me/web/latest/handtalk.min.js'
      script.async = true
      script.onload = () => {
        if (window.HT) {
          window.htInstance = new window.HT({
            token: 'seu-token-handtalk', // Você precisa se registrar em handtalk.me
            align: 'right',
            maxTextSize: 500,
            mobileConfig: {
              align: 'right',
              actionsAlign: 'right'
            }
          })
        }
      }
      document.body.appendChild(script)
    }
  }

  // Remover Hand Talk (ocultar widget)
  const removeHandTalk = () => {
    // Encontrar todos os elementos do Hand Talk
    const htElements = [
      document.querySelector('.ht-skip'),
      document.querySelector('[data-ht]'),
      document.querySelector('#htWidget'),
      document.querySelector('.ht-widget-container')
    ]

    htElements.forEach(element => {
      if (element) {
        element.style.display = 'none'
      }
    })

    // Fechar qualquer janela/modal aberta do Hand Talk
    const htModal = document.querySelector('.ht-modal, .ht-player')
    if (htModal) {
      htModal.style.display = 'none'
    }
  }

  // Fechar menu ao clicar fora
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setIsOpen(false)
      }
    }

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside)
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [isOpen])

  // Navegação por teclado e atalhos globais
  useEffect(() => {
    const handleKeyDown = (event) => {
      // Atalho global: Alt + A = Abrir menu de Acessibilidade
      if (event.altKey && event.key.toLowerCase() === 'a') {
        event.preventDefault()
        setIsOpen(prev => !prev)
        showNotification(isOpen ? '❌ Menu fechado' : '✅ Menu de acessibilidade aberto')
        return
      }

      // Atalho global: Alt + 1 = Toggle Libras
      if (event.altKey && event.key === '1') {
        event.preventDefault()
        setSettings(prev => {
          const newValue = !prev.libras
          showNotification(newValue ? '🤟 Libras ativado' : '🤟 Libras desativado')
          return { ...prev, libras: newValue }
        })
        return
      }

      // Atalho global: Alt + 2 = Toggle Alto Contraste
      if (event.altKey && event.key === '2') {
        event.preventDefault()
        setSettings(prev => {
          const newMode = prev.contrastMode === 'high' ? 'none' : 'high'
          showNotification(newMode === 'high' ? '🎨 Alto contraste ativado' : '🎨 Contraste normal')
          return { ...prev, contrastMode: newMode }
        })
        return
      }

      // Atalho global: Alt + 3 = Toggle Ultra Contraste
      if (event.altKey && event.key === '3') {
        event.preventDefault()
        setSettings(prev => {
          const newMode = prev.contrastMode === 'ultra' ? 'none' : 'ultra'
          showNotification(newMode === 'ultra' ? '⚫⚪ Ultra contraste ativado' : '🎨 Contraste normal')
          return { ...prev, contrastMode: newMode }
        })
        return
      }

      // Atalho global: Alt + '+' = Aumentar fonte
      if (event.altKey && (event.key === '+' || event.key === '=')) {
        event.preventDefault()
        adjustFontSize(5)
        showNotification(`🔤 Fonte: ${Math.min(settings.fontSize + 5, 150)}%`)
        return
      }

      // Atalho global: Alt + '-' = Diminuir fonte
      if (event.altKey && event.key === '-') {
        event.preventDefault()
        adjustFontSize(-5)
        showNotification(`🔤 Fonte: ${Math.max(settings.fontSize - 5, 75)}%`)
        return
      }

      // Se o menu estiver aberto, permitir navegação
      if (isOpen) {
        // ESC = Fechar menu
        if (event.key === 'Escape') {
          setIsOpen(false)
          return
        }

        // Navegação por setas dentro do menu
        if (event.key === 'ArrowDown' || event.key === 'ArrowUp') {
          event.preventDefault()
          const focusableElements = menuRef.current?.querySelectorAll(
            'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
          )
          
          if (focusableElements && focusableElements.length > 0) {
            const currentIndex = Array.from(focusableElements).indexOf(document.activeElement)
            let nextIndex
            
            if (event.key === 'ArrowDown') {
              nextIndex = currentIndex + 1
              if (nextIndex >= focusableElements.length) nextIndex = 0
            } else {
              nextIndex = currentIndex - 1
              if (nextIndex < 0) nextIndex = focusableElements.length - 1
            }
            
            focusableElements[nextIndex]?.focus()
          }
        }
      }
    }

    document.addEventListener('keydown', handleKeyDown)
    return () => document.removeEventListener('keydown', handleKeyDown)
  }, [isOpen])

  const toggleSetting = (key) => {
    setSettings(prev => ({ ...prev, [key]: !prev[key] }))
  }

  const adjustFontSize = (delta) => {
    setSettings(prev => ({
      ...prev,
      fontSize: Math.max(75, Math.min(150, prev.fontSize + delta))
    }))
  }

  const setColorBlindMode = (mode) => {
    setSettings(prev => ({ ...prev, colorBlindMode: mode }))
  }

  const colorBlindModes = [
    { value: 'none', label: 'Normal', description: 'Sem filtro' },
    { value: 'protanopia', label: 'Protanopia', description: 'Dificuldade com vermelho' },
    { value: 'deuteranopia', label: 'Deuteranopia', description: 'Dificuldade com verde' },
    { value: 'tritanopia', label: 'Tritanopia', description: 'Dificuldade com azul' },
    { value: 'achromatopsia', label: 'Acromatopsia', description: 'Visão em tons de cinza' }
  ]

  return (
    <div className="relative" ref={menuRef}>
      {/* Notificação de Atalho de Teclado */}
      <AnimatePresence>
        {notification && (
          <motion.div
            initial={{ opacity: 0, y: -20, x: '-50%' }}
            animate={{ opacity: 1, y: 0, x: '-50%' }}
            exit={{ opacity: 0, y: -20, x: '-50%' }}
            className="fixed top-20 left-1/2 transform z-[10000] bg-[#8C43FF] text-white px-6 py-3 rounded-full shadow-2xl font-medium text-sm flex items-center gap-2"
            role="status"
            aria-live="polite"
          >
            <span>{notification}</span>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Botão de Ajuda/Acessibilidade */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="p-1.5 rounded-full border dark:border-gray-600 border-black cursor-pointer dark:bg-[#333333] bg-white transition-colors duration-300 hover:bg-gray-100 dark:hover:bg-[#21262D]"
        aria-label="Menu de Acessibilidade (Atalho: Alt + A)"
        aria-expanded={isOpen}
        aria-haspopup="true"
        title="Alt + A para abrir"
      >
        <HelpCircle size={20} className="dark:text-gray-400 text-black" />
      </button>

      {/* Dropdown Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -10, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className="absolute right-0 mt-2 w-80 dark:bg-[#1E1E1E] bg-white rounded-2xl shadow-2xl border dark:border-[#333333] border-gray-200 overflow-hidden z-50"
            role="dialog"
            aria-label="Menu de Recursos de Acessibilidade"
          >
            {/* Header */}
            <div className="p-4 border-b dark:border-[#333333] border-gray-200 bg-gradient-to-r from-[#8C43FF] to-[#6B32C3]">
              <div className="flex items-center justify-between mb-1">
                <h3 className="text-white font-semibold text-lg">Acessibilidade</h3>
                <button
                  onClick={() => setIsOpen(false)}
                  className="text-white hover:bg-white/20 rounded-lg p-1 transition-colors"
                  aria-label="Fechar menu"
                >
                  <X size={18} />
                </button>
              </div>
              <p className="text-white/90 text-sm">
                Recursos de acessibilidade — personalize sua experiência
              </p>
            </div>

            {/* Conteúdo */}
            <div className="p-4 max-h-[500px] overflow-y-auto">
              {/* Libras */}
              <div className="mb-4">
                <button
                  onClick={() => toggleSetting('libras')}
                  className={`w-full flex items-center justify-between p-3 rounded-xl transition-all ${
                    settings.libras
                      ? 'bg-[#8C43FF]/10 border-2 border-[#8C43FF]'
                      : 'dark:bg-[#2D2D2D] bg-gray-100 border-2 border-transparent hover:border-[#8C43FF]/30'
                  }`}
                  aria-label={`Libras ${settings.libras ? 'ativado' : 'desativado'}`}
                  aria-pressed={settings.libras}
                >
                  <div className="flex items-center gap-3">
                    <div className={`p-2 rounded-lg ${settings.libras ? 'bg-[#8C43FF]' : 'dark:bg-[#3D3D3D] bg-gray-200'}`}>
                      <Hand size={20} className={settings.libras ? 'text-white' : 'dark:text-gray-400 text-gray-600'} />
                    </div>
                    <div className="text-left">
                      <p className="font-medium dark:text-white text-gray-900">Tradutor de Libras</p>
                      <p className="text-xs dark:text-gray-400 text-gray-600">Hand Talk API</p>
                    </div>
                  </div>
                  {settings.libras && (
                    <Check size={20} className="text-[#8C43FF]" />
                  )}
                </button>
              </div>

              {/* Tamanho da Fonte */}
              <div className="mb-4">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <Type size={18} className="dark:text-gray-400 text-gray-600" />
                    <span className="font-medium dark:text-white text-gray-900">Tamanho da Fonte</span>
                  </div>
                  <span className="text-sm dark:text-gray-400 text-gray-600">{settings.fontSize}%</span>
                </div>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => adjustFontSize(-5)}
                    disabled={settings.fontSize <= 75}
                    className="p-2 rounded-lg dark:bg-[#2D2D2D] bg-gray-100 hover:bg-[#8C43FF] hover:text-white disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                    aria-label="Diminuir fonte"
                  >
                    <Minus size={16} />
                  </button>
                  <div className="flex-1 h-2 bg-gray-200 dark:bg-[#2D2D2D] rounded-full overflow-hidden">
                    <div
                      className="h-full bg-[#8C43FF] transition-all duration-300"
                      style={{ width: `${((settings.fontSize - 75) / 75) * 100}%` }}
                      role="progressbar"
                      aria-valuenow={settings.fontSize}
                      aria-valuemin={75}
                      aria-valuemax={150}
                    />
                  </div>
                  <button
                    onClick={() => adjustFontSize(5)}
                    disabled={settings.fontSize >= 150}
                    className="p-2 rounded-lg dark:bg-[#2D2D2D] bg-gray-100 hover:bg-[#8C43FF] hover:text-white disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                    aria-label="Aumentar fonte"
                  >
                    <Plus size={16} />
                  </button>
                </div>
              </div>

              {/* Alto Contraste (Suave) */}
              <div className="mb-4">
                <button
                  onClick={() => {
                    setSettings(prev => ({ 
                      ...prev, 
                      contrastMode: prev.contrastMode === 'high' ? 'none' : 'high' 
                    }))
                  }}
                  className={`w-full flex items-center justify-between p-3 rounded-xl transition-all ${
                    settings.contrastMode === 'high'
                      ? 'bg-[#8C43FF]/10 border-2 border-[#8C43FF]'
                      : 'dark:bg-[#2D2D2D] bg-gray-100 border-2 border-transparent hover:border-[#8C43FF]/30'
                  }`}
                  aria-label={`Alto contraste ${settings.contrastMode === 'high' ? 'ativado' : 'desativado'}`}
                  aria-pressed={settings.contrastMode === 'high'}
                >
                  <div className="flex items-center gap-3">
                    <div className={`p-2 rounded-lg ${settings.contrastMode === 'high' ? 'bg-[#8C43FF]' : 'dark:bg-[#3D3D3D] bg-gray-200'}`}>
                      <Eye size={20} className={settings.contrastMode === 'high' ? 'text-white' : 'dark:text-gray-400 text-gray-600'} />
                    </div>
                    <div className="text-left">
                      <p className="font-medium dark:text-white text-gray-900">Alto Contraste</p>
                      <p className="text-xs dark:text-gray-400 text-gray-600">
                        {settings.contrastMode === 'high' ? '🎨 Ativo - Contraste Suave' : 'Melhora a legibilidade'}
                      </p>
                    </div>
                  </div>
                  {settings.contrastMode === 'high' && (
                    <Check size={20} className="text-[#8C43FF]" />
                  )}
                </button>
              </div>

              {/* Ultra Contraste (Forte) */}
              <div className="mb-4">
                <button
                  onClick={() => {
                    setSettings(prev => ({ 
                      ...prev, 
                      contrastMode: prev.contrastMode === 'ultra' ? 'none' : 'ultra' 
                    }))
                  }}
                  className={`w-full flex items-center justify-between p-3 rounded-xl transition-all ${
                    settings.contrastMode === 'ultra'
                      ? 'bg-[#8C43FF]/10 border-2 border-[#8C43FF]'
                      : 'dark:bg-[#2D2D2D] bg-gray-100 border-2 border-transparent hover:border-[#8C43FF]/30'
                  }`}
                  aria-label={`Ultra contraste ${settings.contrastMode === 'ultra' ? 'ativado' : 'desativado'}`}
                  aria-pressed={settings.contrastMode === 'ultra'}
                >
                  <div className="flex items-center gap-3">
                    <div className={`p-2 rounded-lg ${settings.contrastMode === 'ultra' ? 'bg-[#8C43FF]' : 'dark:bg-[#3D3D3D] bg-gray-200'}`}>
                      <Eye size={20} className={settings.contrastMode === 'ultra' ? 'text-white' : 'dark:text-gray-400 text-gray-600'} />
                    </div>
                    <div className="text-left">
                      <p className="font-medium dark:text-white text-gray-900">Ultra Contraste</p>
                      <p className="text-xs dark:text-gray-400 text-gray-600">
                        {settings.contrastMode === 'ultra' ? '⚫⚪ Ativo - Preto e Branco' : 'Máximo contraste possível'}
                      </p>
                    </div>
                  </div>
                  {settings.contrastMode === 'ultra' && (
                    <Check size={20} className="text-[#8C43FF]" />
                  )}
                </button>
              </div>

              {/* Modo de Daltonismo */}
              <div className="mb-4">
                <div className="flex items-center gap-2 mb-3">
                  <Palette size={18} className="dark:text-gray-400 text-gray-600" />
                  <span className="font-medium dark:text-white text-gray-900">Modo de Daltonismo</span>
                </div>
                <div className="space-y-2">
                  {colorBlindModes.map((mode) => (
                    <button
                      key={mode.value}
                      onClick={() => setColorBlindMode(mode.value)}
                      className={`w-full flex items-center justify-between p-2.5 rounded-lg transition-all text-left ${
                        settings.colorBlindMode === mode.value
                          ? 'bg-[#8C43FF]/10 border-2 border-[#8C43FF]'
                          : 'dark:bg-[#2D2D2D] bg-gray-100 border-2 border-transparent hover:border-[#8C43FF]/30'
                      }`}
                      aria-label={`${mode.label}: ${mode.description}`}
                      aria-pressed={settings.colorBlindMode === mode.value}
                    >
                      <div>
                        <p className="font-medium text-sm dark:text-white text-gray-900">{mode.label}</p>
                        <p className="text-xs dark:text-gray-400 text-gray-600">{mode.description}</p>
                      </div>
                      {settings.colorBlindMode === mode.value && (
                        <Check size={16} className="text-[#8C43FF]" />
                      )}
                    </button>
                  ))}
                </div>
              </div>

              {/* Leitor de Tela Info */}
              <div className="mt-4 p-3 rounded-xl dark:bg-[#2D2D2D] bg-gray-100 border dark:border-[#3D3D3D] border-gray-200">
                <div className="flex items-start gap-3">
                  <Volume2 size={18} className="dark:text-gray-400 text-gray-600 mt-0.5" />
                  <div>
                    <p className="font-medium text-sm dark:text-white text-gray-900 mb-1">Leitor de Tela</p>
                    <p className="text-xs dark:text-gray-400 text-gray-600">
                      Esta interface é compatível com leitores de tela e navegação por teclado
                    </p>
                  </div>
                </div>
              </div>

              {/* Atalhos de Teclado */}
              <div className="mt-4 p-3 rounded-xl dark:bg-[#2D2D2D]/50 bg-purple-50 border dark:border-[#3D3D3D] border-purple-200">
                <div className="mb-2">
                  <p className="font-semibold text-sm dark:text-white text-gray-900 mb-1 flex items-center gap-2">
                    ⌨️ Atalhos de Teclado
                  </p>
                </div>
                <div className="space-y-1.5 text-xs dark:text-gray-300 text-gray-700">
                  <div className="flex justify-between items-center">
                    <span>Abrir/Fechar Menu</span>
                    <kbd className="px-2 py-0.5 rounded dark:bg-[#1E1E1E] bg-white border dark:border-gray-600 border-gray-300 font-mono text-xs">Alt + A</kbd>
                  </div>
                  <div className="flex justify-between items-center">
                    <span>Modo Navegação Total</span>
                    <kbd className="px-2 py-0.5 rounded dark:bg-[#1E1E1E] bg-white border dark:border-gray-600 border-gray-300 font-mono text-xs font-bold">N</kbd>
                  </div>
                  <div className="flex justify-between items-center">
                    <span>Libras On/Off</span>
                    <kbd className="px-2 py-0.5 rounded dark:bg-[#1E1E1E] bg-white border dark:border-gray-600 border-gray-300 font-mono text-xs">Alt + 1</kbd>
                  </div>
                  <div className="flex justify-between items-center">
                    <span>Alto Contraste</span>
                    <kbd className="px-2 py-0.5 rounded dark:bg-[#1E1E1E] bg-white border dark:border-gray-600 border-gray-300 font-mono text-xs">Alt + 2</kbd>
                  </div>
                  <div className="flex justify-between items-center">
                    <span>Ultra Contraste</span>
                    <kbd className="px-2 py-0.5 rounded dark:bg-[#1E1E1E] bg-white border dark:border-gray-600 border-gray-300 font-mono text-xs">Alt + 3</kbd>
                  </div>
                  <div className="flex justify-between items-center">
                    <span>Aumentar Fonte</span>
                    <kbd className="px-2 py-0.5 rounded dark:bg-[#1E1E1E] bg-white border dark:border-gray-600 border-gray-300 font-mono text-xs">Alt + +</kbd>
                  </div>
                  <div className="flex justify-between items-center">
                    <span>Diminuir Fonte</span>
                    <kbd className="px-2 py-0.5 rounded dark:bg-[#1E1E1E] bg-white border dark:border-gray-600 border-gray-300 font-mono text-xs">Alt + -</kbd>
                  </div>
                  <div className="flex justify-between items-center">
                    <span>Navegar Menu</span>
                    <kbd className="px-2 py-0.5 rounded dark:bg-[#1E1E1E] bg-white border dark:border-gray-600 border-gray-300 font-mono text-xs">↑ ↓</kbd>
                  </div>
                  <div className="flex justify-between items-center">
                    <span>Fechar Menu</span>
                    <kbd className="px-2 py-0.5 rounded dark:bg-[#1E1E1E] bg-white border dark:border-gray-600 border-gray-300 font-mono text-xs">ESC</kbd>
                  </div>
                </div>
              </div>
            </div>

            {/* Footer */}
            <div className="p-3 border-t dark:border-[#333333] border-gray-200 dark:bg-[#2D2D2D] bg-gray-50">
              <p className="text-xs text-center dark:text-gray-400 text-gray-600">
                Seguindo diretrizes WCAG 2.1 • EtecNotes Acessível
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

export default AccessibilityMenu
