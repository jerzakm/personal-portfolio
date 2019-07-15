import * as style from './scss/style'
import { initRenderer, stage, ticker, renderer } from './pixi/renderer'
import { colourScheme } from './core/style'
const styleFix = style
import { initMouseFollow } from './pixi/mouseFollow'
import * as PIXI from 'pixi.js'
import { findNewPoint, distance, pointsAngleDeg, checkIntersection, Line } from './util/math'
import { initAnimatedTriangles } from './pixi/animatedTriangles'
import { initCircleSquare } from './pixi/circleSquareAnim'
import { initTerrainGrid } from './pixi/terrainGrid';
const TWEEN = require('@tweenjs/tween.js')

initRenderer()
initTerrainGrid()
initCircleSquare()
// initAnimatedTriangles()