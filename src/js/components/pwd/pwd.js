// this will be the "desktop" where the user can interact with the icons of the other components to open them in a new window
// should it be possible to change desktop background? (maybe a settings icon that opens a settings window where the user can change the background image?)

// which responsibilities should the desktop have?
// display icons
// display window on click
// close window on click (desktop listens to close event sent from window)
// (minimize window on click)
// move window on click and drag
// change background image (right click on desktop to open settings window)
// mac os styling

// array of applications (app name and icon)
// another array of currently run applications
// pros of rendering the icons dynamically: easy to add new applications
// in the connectedCallback the icons should be rendered dynamically when the desktop is connected to the DOM

const template = document.createElement('template')
template.innerHTML = `
  <main id="desktop">

  </main>
`

customElements.define('desktop', class extends HTMLElement {
  constructor () {
    super()

    this.attachShadow({
      mode: 'open'
    })
    this.shadowRoot.appendChild(template.content.cloneNode(true))
  }
})
