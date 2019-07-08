import { Graphics } from 'pixi.js';
import { stage, ticker } from './renderer';
import { findNewPoint } from '../util/math';
import { colourScheme } from '../core/style';

export const initAnimatedTriangles = ()=> {
  const graphics = new Graphics()
  stage.addChild(graphics)

const a = [
  1600, 280,
  1100, 600,
  1500, 720
];

const b = [
  1600, 280,
  1000, 630,
  1450, 750];

const c = [
  1600, 280,
  850, 650,
  1360, 770];


let angleA = 0
let angleB = 0
let angleC = 0
const distance = 10

ticker.add((delta)=>{
  angleA+=1*delta
  angleB+=1.5*delta
  angleC+=0.3*delta

  const polyA = [
    findNewPoint({x: a[0], y: a[1]}, angleA, distance),
    findNewPoint({x: a[2], y: a[3]}, angleB, distance),
    findNewPoint({x: a[4], y: a[5]}, angleC, distance)
  ]
  const polyB = [
    findNewPoint({x: b[0], y: b[1]}, angleB, distance),
    findNewPoint({x: b[2], y: b[3]}, angleC, distance),
    findNewPoint({x: b[4], y: b[5]}, angleA, distance),
  ]
  const polyC = [
    findNewPoint({x: c[0], y: c[1]}, angleC, distance),
    findNewPoint({x: c[2], y: c[3]}, angleC, distance),
    findNewPoint({x: c[4], y: c[5]}, angleB, distance),
  ]

  graphics.clear()
  graphics.lineStyle(2, colourScheme().primary, 1)
  graphics.drawPolygon([
    polyA[0].x, polyA[0].y,
    polyA[1].x, polyA[1].y,
    polyA[2].x, polyA[2].y,
  ])

  graphics.lineStyle(2, colourScheme().secondary, 1)
  graphics.drawPolygon([
    polyB[0].x, polyB[0].y,
    polyB[1].x, polyB[1].y,
    polyB[2].x, polyB[2].y,
  ])
  graphics.lineStyle(2, colourScheme().tetriary, 1)
  graphics.drawPolygon([
    polyC[0].x, polyC[0].y,
    polyC[1].x, polyC[1].y,
    polyC[2].x, polyC[2].y,
  ])

})
}