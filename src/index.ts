import * as style from './scss/style'
import { initRenderer, stage, ticker, renderer } from './pixi/renderer';
import {Graphics} from 'pixi.js'
import { colourScheme } from './core/style';
const styleFix = style

initRenderer()


// const graphics = new Graphics()
// graphics.lineStyle(2, colourScheme().primary, 1)
// const wMargin = window.innerHeight/10
// const hMargin = window.innerWidth/18
// graphics.drawRect(
//   wMargin,
//   hMargin,
//   window.innerWidth-wMargin*2,
//   window.innerHeight-hMargin*2
//   )
// stage.addChild(graphics)

// ticker.add((delta)=> {

// })