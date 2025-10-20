import { useState, useEffect, useRef } from "react"
import { Play, RotateCcw, Trophy } from "lucide-react"

function MiniFlappyGame() {
  const [gameStarted, setGameStarted] = useState(false)
  const [gameOver, setGameOver] = useState(false)
  const [score, setScore] = useState(0)
  const [highScore, setHighScore] = useState(() => {
    return parseInt(localStorage.getItem('flappyHighScore') || '0')
  })
  const [birdY, setBirdY] = useState(50)
  const [birdVelocity, setBirdVelocity] = useState(0)
  const [pipes, setPipes] = useState([])
  
  const gameRef = useRef(null)
  const animationRef = useRef(null)
  const pipeTimerRef = useRef(null)

  const GRAVITY = 0.03
  const JUMP_STRENGTH = -1.5
  const PIPE_WIDTH = 40
  const PIPE_GAP = 100
  const PIPE_SPEED = 3
  const GAME_WIDTH = 300
  const GAME_HEIGHT = 200

  // Física do jogo
  useEffect(() => {
    if (!gameStarted || gameOver) return

    const gameLoop = () => {
      // Atualizar velocidade e posição do pássaro
      setBirdVelocity(v => v + GRAVITY)
      setBirdY(y => {
        const newY = y + birdVelocity
        
        // Verificar colisão com chão ou teto
        if (newY <= 0 || newY >= GAME_HEIGHT - 20) {
          endGame()
          return y
        }
        
        return newY
      })

      // Mover pipes
      setPipes(prevPipes => {
        const newPipes = prevPipes
          .map(pipe => ({
            ...pipe,
            x: pipe.x - PIPE_SPEED
          }))
          .filter(pipe => pipe.x > -PIPE_WIDTH)

        // Verificar colisão com pipes
        newPipes.forEach(pipe => {
          const birdLeft = 50
          const birdRight = 70
          const birdTop = birdY
          const birdBottom = birdY + 20

          if (
            birdRight > pipe.x &&
            birdLeft < pipe.x + PIPE_WIDTH &&
            (birdTop < pipe.topHeight || birdBottom > pipe.topHeight + PIPE_GAP)
          ) {
            endGame()
          }

          // Incrementar score quando passar pelo pipe
          if (pipe.x + PIPE_WIDTH < 50 && !pipe.scored) {
            pipe.scored = true
            setScore(s => s + 1)
          }
        })

        return newPipes
      })

      animationRef.current = requestAnimationFrame(gameLoop)
    }

    animationRef.current = requestAnimationFrame(gameLoop)

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current)
      }
    }
  }, [gameStarted, gameOver, birdY, birdVelocity])

  // Gerar pipes
  useEffect(() => {
    if (!gameStarted || gameOver) return

    pipeTimerRef.current = setInterval(() => {
      const topHeight = Math.random() * (GAME_HEIGHT - PIPE_GAP - 40) + 20
      setPipes(prev => [...prev, {
        x: GAME_WIDTH,
        topHeight,
        scored: false
      }])
    }, 2000)

    return () => {
      if (pipeTimerRef.current) {
        clearInterval(pipeTimerRef.current)
      }
    }
  }, [gameStarted, gameOver])

  const jump = () => {
    if (!gameStarted) {
      startGame()
      return
    }
    if (gameOver) return
    setBirdVelocity(JUMP_STRENGTH)
  }

  const startGame = () => {
    setGameStarted(true)
    setGameOver(false)
    setScore(0)
    setBirdY(50)
    setBirdVelocity(0)
    setPipes([])
  }

  const endGame = () => {
    setGameOver(true)
    if (score > highScore) {
      setHighScore(score)
      localStorage.setItem('flappyHighScore', score.toString())
    }
  }

  const resetGame = () => {
    setGameStarted(false)
    setGameOver(false)
    setScore(0)
    setBirdY(50)
    setBirdVelocity(0)
    setPipes([])
  }

  return (
    <div className="bg-[#1a1a1a] rounded-lg p-4 border border-[#2d2d2d] shadow-lg">
      <div className="flex items-center justify-between mb-3">
        <h4 className="text-[#8b5cf6] font-semibold text-sm flex items-center gap-2">
          <span className="text-lg">🦆</span>
          Flappy Notes
        </h4>
        <div className="flex items-center gap-3 text-xs">
          <div className="text-[#d1d5db]">
            Score: <span className="text-[#8b5cf6] font-bold">{score}</span>
          </div>
          <div className="flex items-center gap-1 text-[#fbbf24]">
            <Trophy className="w-3 h-3" />
            <span className="font-bold">{highScore}</span>
          </div>
        </div>
      </div>

      <div
        ref={gameRef}
        onClick={jump}
        onKeyDown={(e) => e.code === 'Space' && jump()}
        tabIndex={0}
        className="relative bg-gradient-to-b from-[#0a0a0a] to-[#1a1a2e] rounded-md overflow-hidden cursor-pointer focus:outline-none focus:ring-2 focus:ring-[#8b5cf6] focus:ring-opacity-50"
        style={{ width: GAME_WIDTH, height: GAME_HEIGHT }}
      >
        {/* Pato */}
        <div
          className="absolute transition-transform"
          style={{
            left: '40px',
            top: `${birdY}px`,
            transform: `rotate(${birdVelocity * 2}deg)`,
            width: '35px',
            height: '30px'
          }}
        >
          {/* Corpo do pato */}
          <div className="absolute w-7 h-5 bg-white rounded-full bottom-0 left-1 shadow-lg" 
               style={{ boxShadow: '0 2px 8px rgba(255, 255, 255, 0.3)' }}>
          </div>
          
          {/* Cabeça do pato */}
          <div className="absolute w-5 h-5 bg-white rounded-full top-0 right-0 shadow-md">
            {/* Olho */}
            <div className="absolute w-1.5 h-1.5 bg-[#1a1a1a] rounded-full top-1.5 right-1"></div>
            
            {/* Óculos */}
            <div className="absolute top-1 right-0.5 w-2.5 h-2 border-2 border-[#1a1a1a] rounded-full bg-cyan-100 bg-opacity-30"></div>
            <div className="absolute top-2 right-2.5 w-1.5 h-0.5 bg-[#1a1a1a]"></div>
          </div>
          
          {/* Bico laranja */}
          <div className="absolute w-3 h-1.5 bg-[#fb923c] rounded-sm top-2 -right-1 shadow-sm"></div>
          
          {/* Asa */}
          <div className="absolute w-3 h-4 bg-gray-100 rounded-full bottom-1 left-2 rotate-12 opacity-90"></div>
          
          {/* Pés */}
          <div className="absolute w-1 h-1.5 bg-[#fb923c] rounded-sm -bottom-1 left-2"></div>
          <div className="absolute w-1 h-1.5 bg-[#fb923c] rounded-sm -bottom-1 left-4"></div>
        </div>

        {/* Pipes */}
        {pipes.map((pipe, index) => (
          <div key={index}>
            {/* Pipe superior */}
            <div
              className="absolute bg-gradient-to-r from-[#22c55e] to-[#16a34a] border-r-2 border-[#15803d]"
              style={{
                left: `${pipe.x}px`,
                top: 0,
                width: `${PIPE_WIDTH}px`,
                height: `${pipe.topHeight}px`
              }}
            />
            {/* Pipe inferior */}
            <div
              className="absolute bg-gradient-to-r from-[#22c55e] to-[#16a34a] border-r-2 border-[#15803d]"
              style={{
                left: `${pipe.x}px`,
                top: `${pipe.topHeight + PIPE_GAP}px`,
                width: `${PIPE_WIDTH}px`,
                height: `${GAME_HEIGHT - pipe.topHeight - PIPE_GAP}px`
              }}
            />
          </div>
        ))}

        {/* Tela inicial */}
        {!gameStarted && !gameOver && (
          <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-60 backdrop-blur-sm">
            <div className="text-center">
              <Play className="w-12 h-12 text-[#8b5cf6] mx-auto mb-2 animate-pulse" />
              <p className="text-[#d1d5db] text-sm font-semibold mb-1">Clique para começar!</p>
              <p className="text-[#6b7280] text-xs">Clique ou Espaço para voar</p>
            </div>
          </div>
        )}

        {/* Game Over */}
        {gameOver && (
          <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-70 backdrop-blur-sm">
            <div className="text-center">
              <p className="text-[#ef4444] text-lg font-bold mb-2">Game Over!</p>
              <p className="text-[#d1d5db] text-sm mb-1">Score: {score}</p>
              {score === highScore && score > 0 && (
                <p className="text-[#fbbf24] text-xs mb-3 flex items-center gap-1 justify-center">
                  <Trophy className="w-3 h-3" />
                  Novo recorde!
                </p>
              )}
              <button
                onClick={(e) => {
                  e.stopPropagation()
                  resetGame()
                }}
                className="bg-[#8b5cf6] hover:bg-[#7c3aed] text-white px-4 py-2 rounded-full text-xs font-semibold transition-colors flex items-center gap-2 mx-auto"
              >
                <RotateCcw className="w-3 h-3" />
                Jogar Novamente
              </button>
            </div>
          </div>
        )}

        {/* Chão decorativo */}
        <div className="absolute bottom-0 left-0 right-0 h-2 bg-gradient-to-r from-[#22c55e] via-[#16a34a] to-[#22c55e]"></div>
      </div>

      <p className="text-[#6b7280] text-xs mt-2 text-center">
        Relaxe um pouco! 🎮
      </p>
    </div>
  )
}

export default MiniFlappyGame
