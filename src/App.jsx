import { useRef, useState } from 'react'
import './App.css'

function App() {
  const zoneRef = useRef(null)
  const noButtonRef = useRef(null)
  const [noPosition, setNoPosition] = useState({ x: 250, y: 40 })
  const [accepted, setAccepted] = useState(false)

  const moveNoButton = (mouseX, mouseY) => {
    if (!zoneRef.current || !noButtonRef.current) return

    const zoneRect = zoneRef.current.getBoundingClientRect()
    const buttonRect = noButtonRef.current.getBoundingClientRect()
    const maxX = Math.max(0, zoneRect.width - buttonRect.width)
    const maxY = Math.max(0, zoneRect.height - buttonRect.height)

    let nextX = Math.random() * maxX
    let nextY = Math.random() * maxY

    if (typeof mouseX === 'number' && typeof mouseY === 'number') {
      const localX = mouseX - zoneRect.left
      const localY = mouseY - zoneRect.top

      for (let i = 0; i < 12; i += 1) {
        const candidateX = Math.random() * maxX
        const candidateY = Math.random() * maxY
        const centerX = candidateX + buttonRect.width / 2
        const centerY = candidateY + buttonRect.height / 2
        const distance = Math.hypot(localX - centerX, localY - centerY)

        if (distance > 210) {
          nextX = candidateX
          nextY = candidateY
          break
        }
      }
    }

    setNoPosition({ x: nextX, y: nextY })
  }

  const handleMouseMove = (event) => {
    if (!noButtonRef.current) return

    const buttonRect = noButtonRef.current.getBoundingClientRect()
    const buttonCenterX = buttonRect.left + buttonRect.width / 2
    const buttonCenterY = buttonRect.top + buttonRect.height / 2
    const deltaX = event.clientX - buttonCenterX
    const deltaY = event.clientY - buttonCenterY
    const distance = Math.hypot(deltaX, deltaY)

    if (distance < 220) {
      moveNoButton(event.clientX, event.clientY)
    }
  }

  return (
    <main className="home">
      <div className="heart heart-1">♥</div>
      <div className="heart heart-2">♥</div>
      <div className="heart heart-3">♥</div>
      <div className="heart heart-4">♥</div>
      <div className="heart heart-5">♥</div>
      <div className="heart heart-6">♥</div>
      <div className="heart heart-7">♥</div>
      <div className="heart heart-8">♥</div>

      {accepted ? (
        <section className="success-screen">
          <div className="success-view">
            <img
              className="valentine-photo"
              src="valentine-photo.png"
              alt="Photo romantique"
            />
            <p className="success-text">tu viens d&apos;accéder au bonheur</p>
          </div>
        </section>
      ) : (
        <section className="hero">
          <>
            <h1 className="question">
              veux tu etre ma valentine
              <br />
              pour passer le moment le plus romantique
              <br />
              de ton existence samedi 14 février?
            </h1>
            <div ref={zoneRef} className="button-zone" onMouseMove={handleMouseMove}>
              <button type="button" className="yes-btn" onClick={() => setAccepted(true)}>
                Oui
              </button>
              <button
                ref={noButtonRef}
                type="button"
                className="no-btn"
                style={{ left: `${noPosition.x}px`, top: `${noPosition.y}px` }}
                onMouseEnter={(event) => moveNoButton(event.clientX, event.clientY)}
                onMouseDown={(event) => {
                  event.preventDefault()
                  moveNoButton(event.clientX, event.clientY)
                }}
                onClick={(event) => event.preventDefault()}
              >
                Non
              </button>
            </div>
          </>
        </section>
      )}
    </main>
  )
}

export default App
