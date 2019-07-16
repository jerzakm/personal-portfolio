export const renderNav = () => {
  const menu = document.createElement('menu')
  menu.className = 'main-nav'

  const hamburger = document.createElement('hamburger')
  let burgerOpen = false
  hamburger.className = 'hamburger'
  hamburger.appendChild(document.createElement('div'))
  hamburger.appendChild(document.createElement('div'))
  hamburger.appendChild(document.createElement('div'))


  const logo = document.createElement('logo')
  const logoLetter = document.createElement('span')
  logoLetter.className = 'nav-logo'
  logoLetter.innerText = 'M'
  logo.appendChild(logoLetter)
  menu.appendChild(logo)

  const linksContainer = document.createElement('links')
  linksContainer.className = 'nav-links'

  const sections =  ['about','projects','articles','services','contact']
  for(let section of sections) {
    const link = document.createElement('a')
    link.href = '#'
    link.innerText = section
    linksContainer.appendChild(link)
    link.addEventListener('pointerdown', ()=> {
      // alert(`clicked on ${section} screen width:  ${window.innerWidth}`)
      if(window.innerWidth<800){
        burgerOpen = false
        menu.style.visibility = 'hidden'
      }
    })
  }

  menu.appendChild(linksContainer)

  document.body.appendChild(menu)

  hamburger.addEventListener('click', () => {
    switch(burgerOpen){
      case true:
        menu.style.visibility='hidden'
        burgerOpen=false
        break
      case false:
        menu.style.visibility='visible'
        burgerOpen=true
        break
      }
    })
  burgerOpen? burgerOpen = false : burgerOpen = true
  document.body.appendChild(hamburger)


  window.addEventListener('resize', ()=> {
    window.innerWidth>800? menu.style.visibility='visible': menu.style.visibility='hidden'
  })
}