import { stage, ticker } from "./renderer"
import { Line, findNewPoint } from "../util/math"
import { colourScheme } from "../core/style"
import * as PIXI from 'pixi.js'

export const initTerrainGrid = () => {

  const container = new PIXI.Container()
  const g = new PIXI.Graphics()
  container.addChild(g)
  stage.addChild(container)

  const yP = 400
  const w = screen.width

  const lines1: Line[] = []

  const maxLines = 300

  for(let i =0; i<maxLines; i++){
    const angle = (180/(i+1)**1.1)
    const p1= {
      x:0,
      y:yP
    }
    lines1.push({
      p1: p1,
      p2: findNewPoint(p1, angle, 3000)
    })
  }

  ticker.add((delta)=> {
      g.clear()
      if(window.scrollY>1800){
        for(let line of lines1){
          g.lineStyle(1,colourScheme().primary)
          g.moveTo(line.p1.x, line.p1.y)
          g.lineTo(line.p2.x, line.p2.y)
          g.moveTo(screen.width, line.p1.y)
          g.lineTo(-line.p2.x +100, line.p2.y)
        }
        g.lineStyle(0,colourScheme().primary)
        g.beginFill(0x000)
        g.drawRect(-1,-1,screen.width+10, yP+40)
        g.endFill()

      } else if(window.scrollY>1300) {
        const yVar = (window.innerHeight - window.innerHeight*((window.scrollY-window.innerHeight*1.3)/(1800-window.innerHeight*1.3)))+yP
        for(let i =0; i<maxLines; i++){
          g.lineStyle(1,colourScheme().primary)
          const angle = (180/(i+1)**1.1)
          const p1= {
            x: 0,
            y: yVar
          }
          let line = {
            p1: p1,
            p2: findNewPoint(p1, angle, 3000*(window.scrollY/1800))
          }
          g.moveTo(line.p1.x, line.p1.y)
          g.lineTo(line.p2.x, line.p2.y)
          g.moveTo(screen.width, line.p1.y)
          g.lineTo(-line.p2.x +100, line.p2.y)
        }
        g.lineStyle(0,colourScheme().primary)
        g.beginFill(0x000)
        g.drawRect(-1,-1,screen.width+10, yVar)
        g.endFill()
      }
  })
}