const canvas = document.getElementById('game-screen')
canvas.width = window.innerWidth
canvas.height = window.innerHeight
const c = canvas.getContext('2d')

let stickman = new Stickman(new Vector2(300, 300), 6)
stickman.init()

const render = () => {
    c.clearRect(0,0, canvas.width, canvas.height)

    stickman.draw(c)
    
    requestAnimationFrame(render)
}
requestAnimationFrame(render)

window.addEventListener('keydown', e => {
    stickman.keyDown(e.keyCode)
})
window.addEventListener('keyup', e => {
    stickman.keyUp(e.keyCode)
})