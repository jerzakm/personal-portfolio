import { Graphics, Container, Text, GRAPHICS_CURVES } from 'pixi.js';
import { findNewPoint, distance, pointsAngleDeg, checkIntersection, Point, Line, Circle } from '../util/math'
import { initRenderer, stage, ticker, renderer } from '../pixi/renderer'
import { colourScheme } from '../core/style'
const TWEEN = require('@tweenjs/tween.js')

export const initCircleSquare = () => {
  const gContainer = new Container()
  const graphics = new Graphics()
  gContainer.addChild(graphics)
  stage.addChild(gContainer)
  const labels = new Container()
  stage.addChild(labels)

  gContainer.position.x = 1400
  gContainer.position.y = 550

  const circle = {
    x: 0,
    y: 0,
    radius: 250
  }

  const circlePointsCount = 64

  const circlePoints: Point[] = []
  for(let i = 0; i<circlePointsCount; i++){
    circlePoints.push(findNewPoint(circle, (360/circlePointsCount)*i,circle.radius))
  }

  const squareSides: Line[] = [
    {//top
      p1: {x: circle.x-circle.radius/2, y: circle.y-circle.radius/2},
      p2: {x: circle.x+circle.radius/2, y: circle.y-circle.radius/2}
    },
    {//bottom
      p1: {x: circle.x-circle.radius/2, y: circle.y+circle.radius/2},
      p2: {x: circle.x+circle.radius/2, y: circle.y+circle.radius/2}
    },
    {//left
      p1: {x: circle.x-circle.radius/2, y: circle.y-circle.radius/2},
      p2: {x: circle.x-circle.radius/2, y: circle.y+circle.radius/2}
    },
    {//right
      p1: {x: circle.x+circle.radius/2, y: circle.y-circle.radius/2},
      p2: {x: circle.x+circle.radius/2, y: circle.y+circle.radius/2}
    }
  ]

  const squarePoints: Point[] = []
  for(let circlePoint of circlePoints){
    const centerLine = {p1: circlePoint, p2: circle}
    for(let squareSide of squareSides){
      const intersect = checkIntersection(centerLine, squareSide)
      if(intersect.type=='intersecting'){
        const g = squarePoints.find((e)=>{
          return e.x == intersect.point.x && e.y == intersect.point.y
        })
        if(!g){
          squarePoints.push(intersect.point)
        }
      }
    }
  }

  const c = document.getElementById('pixi')
  let xScale = 1
  if(c){
    xScale = window.outerWidth/c.getBoundingClientRect().width
  }

  let mouseLoc = {x: 0, y:0}

  window.addEventListener('pointermove', (e)=> {
    mouseLoc = {
      x:(e.pageX-window.scrollX)*xScale,
      y:e.pageY-window.scrollY,
    }
  })

  const tRadius = circle.radius / 10
  const rotationCircles: any[] = []

  for(let i = 0; i< circlePoints.length; i++){
    const angle = pointsAngleDeg(squarePoints[i], circlePoints[i])
    const newP = findNewPoint(squarePoints[i], angle, -tRadius/2)
    rotationCircles.push({
      x: newP.x,
      y: newP.y,
      r: tRadius/2,
      cr: tRadius*2,
      angle: angle
    })
  }

  const pointerDistanceMax = distance({x:0, y:0}, {x: 1400, y: 500})
  ticker.add((delta)=> {
    let pointerDistance = distance(mouseLoc, {x: 1400, y: 500})
    pointerDistance = pointerDistance < 50? 50 : pointerDistance
    graphics.clear()
    graphics.lineStyle(2, 0x121212, 1)
    graphics.drawCircle(circle.x,circle.y, circle.radius)

    for(let circlePoint of circlePoints){
      graphics.lineStyle(2, 0x121212, 1)
      graphics.moveTo(circlePoint.x, circlePoint.y)
      graphics.lineTo(circle.x,circle.y)
      graphics.lineStyle(2, colourScheme().primary, 1)
      graphics.beginFill(colourScheme().primary)
      graphics.drawCircle(circlePoint.x, circlePoint.y, 5)
      graphics.endFill()
    }



    for(let r = 0; r < rotationCircles.length; r++) {
      rotationCircles[r].cr = rotationCircles[r].r + (((pointerDistanceMax/pointerDistance)/10)*tRadius)
      // graphics.lineStyle(2, 0x121212, 1)
      // graphics.drawCircle(rotationCircles[r].x, rotationCircles[r].y, rotationCircles[r].cr)
      const p = findNewPoint(rotationCircles[r], rotationCircles[r].angle, rotationCircles[r].cr)


      // graphics.lineStyle(2, 0x121212, 1)

      graphics.moveTo(p.x,p.y)
      graphics.lineTo(circlePoints[r].x, circlePoints[r].y)

      graphics.beginFill(colourScheme().primary)
      graphics.drawCircle(p.x, p.y, 3)
      graphics.endFill()
      rotationCircles[r].angle += delta*1+((pointerDistanceMax/pointerDistance)/10)*delta
      rotationCircles[r].angle = rotationCircles[r].angle>360? rotationCircles[r].angle-360: rotationCircles[r].angle
    }
  })
}