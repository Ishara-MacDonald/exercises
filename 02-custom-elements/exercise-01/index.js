const template = document.createElement('template')
template.innerHTML = `<div class="light-switch"></div> <button class="switch">Turn on/off</button>`

class LightSwitch extends HTMLElement{
  _lightOn = false;

  constructor(){ super(); }

  connectedCallback(){
    this.appendChild(template.content.cloneNode(true));

    this._lightOn = false;

    this.querySelector('button').addEventListener('click', () =>{
      this._lightOn = !this._lightOn;
      this.switchPressed();
    });
  }

  switchPressed(){
    const lightBulb = this.querySelector('.light-switch');

    if(this._lightOn){ lightBulb.classList.add('light-switch--on')}
    else{ lightBulb.classList.remove('light-switch--on') }

  }
}

window.customElements.define('light-switch', LightSwitch);