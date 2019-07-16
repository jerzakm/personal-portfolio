import * as style from './scss/style'
import { initRenderer, stage, ticker, renderer } from './pixi/renderer'
const styleFix = style
import { initCircleSquare } from './pixi/circleSquareAnim'
import { initTerrainGrid } from './pixi/terrainGrid';
import { renderNav } from './dom/nav';

// initRenderer()
// initTerrainGrid()
// initCircleSquare()
// initAnimatedTriangles()



// <navigation class="main-nav">
//         <logo><span class="nav-logo">M</span></logo>
//         <links class="nav-links">
//             <a href="#">about</a>
//             <a href="#">projects</a>
//             <a href="#">articles</a>
//             <a href="#">services</a>
//             <a href="#">contact</a>
//         </links>
//     </navigation>

renderNav()