import {Graphics, Container} from 'pixi.js'
import { stage, ticker } from './renderer';
import { colourScheme } from '../core/style';


export const initMouseFollow = ()=> {
  const graphics = new Graphics()
  stage.addChild(graphics)

  let counter = 0

  let point = [-200,-200]

  interface IPointerCircle {
    x: number,
    y: number,
    radius: number,
    lastDraw: number
  }

  const pointerCircles: IPointerCircle[] = []

  let lastNew = Date.now()

  const c = document.getElementById('pixi')
  let xScale = 1
  if(c){
    xScale = window.outerWidth/c.getBoundingClientRect().width
  }

  window.addEventListener('pointermove', (e)=> {
    const circle = {
      x:(e.pageX-window.scrollX)*xScale,
      y:e.pageY-window.scrollY,
      radius: 25,
      lastDraw: Date.now()
    }

    point = [circle.x, circle.y]

    if(Date.now()-lastNew>80){
      pointerCircles.push(circle)
      lastNew = Date.now()
    }
  })

  ticker.add((delta)=>{
    graphics.clear()

    const now = Date.now()
    for(let circle of pointerCircles){
      if(circle.radius>0&&now-circle.lastDraw>0){
        const color = circle.radius<20? 0x121212 : circle.radius<40? 0x121212 : colourScheme().secondary
        graphics.lineStyle(2, color, 1)
        graphics.beginFill(color)
        // graphics.lineStyle(2, 0x121212, 1)
        graphics.drawCircle(circle.x, circle.y, circle.radius)
        graphics.endFill()
        circle.radius -= (circle.radius**0.6)/circle.radius
        circle.lastDraw = Date.now()
      }
    }

    graphics.lineStyle(2, colourScheme().primary, 1)
    graphics.drawCircle(point[0],point[1], 25)
  })
}
