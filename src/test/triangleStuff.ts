stage.interactive = true

const graphics = new Graphics()
stage.addChild(graphics)

const currentA = [
  1600, 280,
  1600, 280,
  1600, 280,
]
const currentB = [
  1000, 630,
  1000, 630,
  1000, 630,
]
const currentC = [
  1360, 770,
  1360, 770,
  1360, 770,
]
const a = [
  1600, 280,
  1100, 600,
  1500, 720];

const b = [
  1600, 280,
  1000, 630,
  1450, 750];

const c = [
  1600, 280,
  850, 650,
  1360, 770];

  const from = {
    a: currentA,
    b: currentB,
    c: currentC
  }
  const to = {
    a: a,
    b: b,
    c: c
  }

let counter = 0

const t1 = new TWEEN.Tween(from.a) // Create a new tween that modifies 'coords'.
        .to(to.a, 500) // Move to (300, 200) in 1 second.
        .easing(TWEEN.Easing.Quadratic.Out) // Use an easing function to make the animation smooth.
        .onUpdate(() => { // Called after tween.js updates 'coords'.
            // Move 'box' to the position described by 'coords' with a CSS translation.
        })
        .start()

const t2 = new TWEEN.Tween(from.b) // Create a new tween that modifies 'coords'.
.to(to.b, 1000) // Move to (300, 200) in 1 second.
.easing(TWEEN.Easing.Quadratic.Out) // Use an easing function to make the animation smooth.
.onUpdate(() => { // Called after tween.js updates 'coords'.
    // Move 'box' to the position described by 'coords' with a CSS translation.
})
.start()

const t3 = new TWEEN.Tween(from.c) // Create a new tween that modifies 'coords'.
.to(to.c, 1000) // Move to (300, 200) in 1 second.
.easing(TWEEN.Easing.Quadratic.Out) // Use an easing function to make the animation smooth.
.onUpdate(() => { // Called after tween.js updates 'coords'.
    // Move 'box' to the position described by 'coords' with a CSS translation.
})
.start()

let point = [-200,-200]

window.addEventListener('mousemove', (e)=> {
  point = [e.pageX, e.pageY]
})

ticker.add((delta)=>{
  counter = counter + 8*delta
  t1.update(counter)
  t2.update(counter)
  t3.update(counter)
  graphics.clear()
  graphics.lineStyle(2, colourScheme().primary, 1)
  graphics.drawPolygon(from.a)
  graphics.drawCircle(point[0],point[1], 20)
  graphics.lineStyle(2, colourScheme().secondary, 1)
  graphics.drawPolygon(from.b);
  graphics.lineStyle(2, colourScheme().tetriary, 1)
  graphics.drawPolygon(from.c);
})

const rect = document.getElementsByClassName('welcome-rectangle')