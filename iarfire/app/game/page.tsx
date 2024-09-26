"use client"

import React, { useState, useRef, useEffect } from 'react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

const WIDTH = 800
const HEIGHT = 600
const PLAYER_Y = HEIGHT - 50
const PLAYER_RADIUS = 20
const TARGET_RADIUS = 20
const BLOCKADE_RADIUS = 40

const levels = [
  { targetX: 200, targetY: 300, blockadeX: 400, blockadeY: 200, hint: "Try: x * 0.5" },
  { targetX: 600, targetY: 200, blockadeX: 300, blockadeY: 300, hint: "Try: x * 0.75" },
  { targetX: 400, targetY: 100, blockadeX: 200, blockadeY: 400, hint: "Try: Math.sin(x / 50) * 100" },
  { targetX: 700, targetY: 400, blockadeX: 500, blockadeY: 200, hint: "Try: Math.cos(x / 30) * 50 + 100" },
  { targetX: 300, targetY: 500, blockadeX: 600, blockadeY: 300, hint: "Try: Math.sqrt(x) * 10" },
  { targetX: 500, targetY: 150, blockadeX: 300, blockadeY: 400, hint: "Try: Math.log(x) * 30" },
  { targetX: 200, targetY: 450, blockadeX: 400, blockadeY: 200, hint: "Try: Math.tan(x / 100) * 50 + 200" },
  { targetX: 600, targetY: 300, blockadeX: 400, blockadeY: 400, hint: "Try: x * Math.sin(x / 20)" },
  { targetX: 400, targetY: 200, blockadeX: 200, blockadeY: 300, hint: "Try: Math.pow(x / 100, 2) * 50" },
  { targetX: 700, targetY: 100, blockadeX: 500, blockadeY: 400, hint: "Try: Math.sin(x / 20) * x / 5" },
]

function evaluateFunction(func: string, x: number): number {
  return new Function('x', `return ${func}`)(x)
}

function lineCircleIntersection(x1: number, y1: number, x2: number, y2: number, cx: number, cy: number, r: number): boolean {
  const dx = x2 - x1
  const dy = y2 - y1
  const a = dx * dx + dy * dy
  const b = 2 * (dx * (x1 - cx) + dy * (y1 - cy))
  const c = cx * cx + cy * cy + x1 * x1 + y1 * y1 - 2 * (cx * x1 + cy * y1) - r * r
  const discriminant = b * b - 4 * a * c
  return discriminant >= 0
}

export default function FunctionGame() {
  const [playerX, setPlayerX] = useState(WIDTH / 2)
  const [level, setLevel] = useState(0)
  const [functionInput, setFunctionInput] = useState('')
  const [debug, setDebug] = useState('')
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    setPlayerX(Math.random() * (WIDTH - 100) + 50)
    setFunctionInput(levels[level].hint.split(': ')[1])
  }, [level])

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    ctx.clearRect(0, 0, WIDTH, HEIGHT)

    // Draw player
    ctx.fillStyle = 'blue'
    ctx.beginPath()
    ctx.arc(playerX, PLAYER_Y, PLAYER_RADIUS, 0, Math.PI * 2)
    ctx.fill()

    // Draw target
    ctx.fillStyle = 'red'
    ctx.beginPath()
    ctx.arc(levels[level].targetX, levels[level].targetY, TARGET_RADIUS, 0, Math.PI * 2)
    ctx.fill()

    // Draw blockade
    ctx.fillStyle = 'gray'
    ctx.beginPath()
    ctx.arc(levels[level].blockadeX, levels[level].blockadeY, BLOCKADE_RADIUS, 0, Math.PI * 2)
    ctx.fill()

    // Draw function line
    ctx.strokeStyle = 'green'
    ctx.lineWidth = 3
    ctx.beginPath()
    ctx.moveTo(playerX, PLAYER_Y)
    let blockadeHit = false
    for (let x = 0; x <= WIDTH - playerX; x += 5) {
      try {
        const y = evaluateFunction(functionInput, x)
        const newX = playerX + x
        const newY = PLAYER_Y - y
        if (!blockadeHit && lineCircleIntersection(playerX, PLAYER_Y, newX, newY, levels[level].blockadeX, levels[level].blockadeY, BLOCKADE_RADIUS)) {
          blockadeHit = true
          ctx.lineTo(newX, newY)
          break
        }
        ctx.lineTo(newX, newY)
      } catch (error) {
        console.error('Error evaluating function:', error)
        setDebug(`Error evaluating function: ${error}`)
        break
      }
    }
    ctx.stroke()

    // Check if line hits target
    if (!blockadeHit) {
      try {
        const hitY = evaluateFunction(functionInput, levels[level].targetX - playerX)
        const distance = Math.abs(PLAYER_Y - hitY - levels[level].targetY)
        setDebug(`Distance to target: ${distance.toFixed(2)}`)
        if (distance < TARGET_RADIUS) {
          if (level < levels.length - 1) {
            setLevel(prevLevel => prevLevel + 1)
          } else {
            setDebug("Congratulations! You've completed all levels!")
          }
        }
      } catch (error) {
        console.error('Error checking target hit:', error)
        setDebug(`Error checking target hit: ${error}`)
      }
    } else {
      setDebug("Blockade hit! Try a different function.")
    }

  }, [playerX, level, functionInput])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setPlayerX(Math.random() * (WIDTH - 100) + 50)
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-4">
      <h1 className="text-3xl font-bold mb-4">Function Aiming Game</h1>
      <div className="relative">
        <canvas
          ref={canvasRef}
          width={WIDTH}
          height={HEIGHT}
          className="border-4 border-gray-300 bg-white mb-4"
        />
        <div className="absolute top-2 left-2 bg-white bg-opacity-75 p-2 rounded">
          <p>Player: Blue circle</p>
          <p>Target: Red circle</p>
          <p>Blockade: Gray circle</p>
          <p>Your function: Green line</p>
        </div>
      </div>
      <div className="mb-4 text-lg font-semibold">Level: {level + 1} / {levels.length}</div>
      <div className="mb-4 text-sm text-gray-600">{debug}</div>
      <form onSubmit={handleSubmit} className="flex flex-col items-center space-y-4">
        <div className="flex items-center space-x-2">
          <Label htmlFor="function-input" className="text-lg">Function:</Label>
          <Input
            id="function-input"
            type="text"
            value={functionInput}
            onChange={(e) => setFunctionInput(e.target.value)}
            className="w-64 text-lg"
            placeholder="Enter your function here"
          />
        </div>
        <Button type="submit" className="text-lg px-6 py-2">Submit</Button>
      </form>
      <div className="mt-4 text-sm text-gray-600">
        <p>Hint: {levels[level].hint}</p>
        <p>Use 'x' as the variable in your function.</p>
        <p>Avoid the gray blockade!</p>
      </div>
    </div>
  )
}