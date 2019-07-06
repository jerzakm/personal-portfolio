import * as PIXI from 'pixi.js'


export let renderer: PIXI.Renderer
export let ticker = PIXI.Ticker.shared
export let stage: PIXI.Container


export function initRenderer(){
  const canvas = makeCanvas()

  renderer = new PIXI.Renderer(
    { width: window.innerWidth,
        height: window.innerHeight,
        backgroundColor: 0x010101,
        forceFXAA: true,
        powerPreference: 'high-performance',
        view: canvas
    }
  )

  ticker = new PIXI.Ticker()
  ticker.maxFPS = 60

  stage = new PIXI.Container();

  ticker.add(() => {
      renderer.render(stage)
  }, PIXI.UPDATE_PRIORITY.LOW)

  ticker.start()

  document.body.appendChild(renderer.view)

  PIXI.settings.SCALE_MODE = PIXI.SCALE_MODES.LINEAR

  window.addEventListener('resize', ()=> {
    renderer.resize(renderer.screen.width,renderer.screen.height)
  })
}

const makeCanvas = () => {
  const canvas = document.createElement('canvas')
  canvas.id='pixi'
  document.body.appendChild(canvas)
  return canvas;
}