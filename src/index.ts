import * as style from './scss/style'
import { initRenderer, stage, ticker, renderer } from './pixi/renderer'
import { colourScheme } from './core/style'
const styleFix = style
import { initMouseFollow } from './pixi/mouseFollow'
import { Graphics } from 'pixi.js'
import { findNewPoint, distance, pointsAngleDeg, checkIntersection } from './util/math'
import { initAnimatedTriangles } from './pixi/animatedTriangles'
import { initCircleSquare } from './pixi/circleSquareAnim'
const TWEEN = require('@tweenjs/tween.js')

initRenderer()
// initMouseFollow()
initCircleSquare()
// initAnimatedTriangles()

const graphics = new Graphics();

ticker.add((delta)=> {

})



stage.addChild(graphics);