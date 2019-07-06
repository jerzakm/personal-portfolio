import * as style from './scss/style'
import { initRenderer, stage, ticker, renderer } from './pixi/renderer';
import { colourScheme } from './core/style';
const styleFix = style
import { initMouseFollow } from './pixi/mouseFollow';

initRenderer()
initMouseFollow()