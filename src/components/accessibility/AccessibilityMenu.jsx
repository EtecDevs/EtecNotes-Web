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
  
  // Estados de acessibilidade
  const [settings, setSettings] = useState({
    libras: false,
    colorBlindMode: 'none', // none, protanopia, deuteranopia, tritanopia, achromatopsia
    highContrast: false,
    fontSize: 100, // porcentagem
    screenReader: true // sempre ativo para ARIA
  })

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

    // Aplicar tamanho da fonte
    root.style.fontSize = `${settings.fontSize}%`

    // Aplicar modo de alto contraste
    if (settings.highContrast) {
      root.classList.add('high-contrast')
    } else {
      root.classList.remove('high-contrast')
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
    if (!window.ht) {
      const script = document.createElement('script')
      script.src = 'https://plugin.handtalk.me/web/latest/handtalk.min.js'
      script.async = true
      script.onload = () => {
        if (window.HT) {
          new window.HT({
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

  // Remover Hand Talk
  const removeHandTalk = () => {
    const htElement = document.querySelector('[data-ht]')
    if (htElement) {
      htElement.remove()
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

  // Suporte a teclado
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape' && isOpen) {
        setIsOpen(false)
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
      {/* Botão de Ajuda/Acessibilidade */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="p-1.5 rounded-full border dark:border-gray-600 border-black cursor-pointer dark:bg-[#333333] bg-white transition-colors duration-300 hover:bg-gray-100 dark:hover:bg-[#21262D]"
        aria-label="Menu de Acessibilidade"
        aria-expanded={isOpen}
        aria-haspopup="true"
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

              {/* Alto Contraste */}
              <div className="mb-4">
                <button
                  onClick={() => toggleSetting('highContrast')}
                  className={`w-full flex items-center justify-between p-3 rounded-xl transition-all ${
                    settings.highContrast
                      ? 'bg-[#8C43FF]/10 border-2 border-[#8C43FF]'
                      : 'dark:bg-[#2D2D2D] bg-gray-100 border-2 border-transparent hover:border-[#8C43FF]/30'
                  }`}
                  aria-label={`Alto contraste ${settings.highContrast ? 'ativado' : 'desativado'}`}
                  aria-pressed={settings.highContrast}
                >
                  <div className="flex items-center gap-3">
                    <div className={`p-2 rounded-lg ${settings.highContrast ? 'bg-[#8C43FF]' : 'dark:bg-[#3D3D3D] bg-gray-200'}`}>
                      <Eye size={20} className={settings.highContrast ? 'text-white' : 'dark:text-gray-400 text-gray-600'} />
                    </div>
                    <div className="text-left">
                      <p className="font-medium dark:text-white text-gray-900">Alto Contraste</p>
                      <p className="text-xs dark:text-gray-400 text-gray-600">Melhora a legibilidade</p>
                    </div>
                  </div>
                  {settings.highContrast && (
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
                      Esta interface é compatível com leitores de tela e navegação por teclado (Tab, Enter, Esc)
                    </p>
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
