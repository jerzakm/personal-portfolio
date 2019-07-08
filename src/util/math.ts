import * as lineIntersect from 'line-intersect'

export const polygonLines = (points: Point[]): Line[] => {
  const lines: Line[] = []
  for(let i=0; i< points.length; i++){
    let next = i+1==points.length? 0 : i+1
    lines.push({
      p1: points[i],
      p2: points[next]
    })
  }
  return lines
}

export const checkIntersection = (line1: Line, line2: Line) => {
  return lineIntersect.checkIntersection(line1.p1.x, line1.p1.y, line1.p2.x, line1.p2.y, line2.p1.x, line2.p1.y, line2.p2.x, line2.p2.y)
}

export const pointsAngleRad = (p1: Point, p2: Point) =>{
  return Math.atan2(p2.y - p1.y, p2.x - p1.x)
}

export const pointsAngleDeg = (p1: Point, p2: Point) =>{
  return Math.atan2(p2.y - p1.y, p2.x - p1.x) * 180 / Math.PI
}

export const findNewPoint = (start: Point, angle: number, distance: number): Point => {
  return {
    x : Math.round(Math.cos(angle * Math.PI / 180) * distance + start.x),
    y : Math.round(Math.sin(angle * Math.PI / 180) * distance + start.y)
  };
}

export const findClosestPoint = (from: Point, points: Point[], ignorePoints: Point[]) => {
  let closest = {x: 0, y: 0}
  let closestD: number

  for(let point of points){


    const ignored = ignorePoints.find((p)=>{
      return p.x == point.x && p.y == point.y
    })

    const d = distance(from,point)
    if((!closestD||d<closestD)&&!ignored){
      closestD = d
      closest = point
    }
  }
  return closest
}

export const distance = (from: Point, to: Point): number => {
  return Math.sqrt((Math.pow(from.x-to.x,2))+(Math.pow(from.y-to.y,2)))
}

export interface Point {
  x: number,
  y: number
}

export interface Line {
  p1: Point,
  p2: Point
}

export interface Circle {
  x: number,
  y: number,
  r: number
}