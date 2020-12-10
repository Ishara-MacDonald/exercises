const template = document.createElement('template')
template.innerHTML = `<div class="light-switch"></div> <button class="switch">Turn on/off</button>`

class LightSwitch extends HTMLElement{
  constructor(){ super(); }

  get isOn(){
    return this.hasAttribute('on');
  }

  set isOn(value){
    if(this.isOn == value){
      return;
    }

    if(value){ this.setAttribute('on', ''); }
    else{ this.removeAttribute('on') }
  }

  connectedCallback(){
    this.appendChild(template.content.cloneNode(true));

    this.querySelector('button').addEventListener('click', () =>{
      this.isOn = !this.isOn;
      this._switchPressed();
    });
  }

  _switchPressed(){
    const lightBulb = this.querySelector('.light-switch');

    if(this.isOn){
      lightBulb.classList.add('light-switch--on');
      this.setAttribute('on', '');
    }
    else{
      lightBulb.classList.remove('light-switch--on');
      this.removeAttribute('on');
   }

  }
}

window.customElements.define('light-switch', LightSwitch);