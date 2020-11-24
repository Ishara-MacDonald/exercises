const template = document.createElement('template')
template.innerHTML = `<div class="light-bulb"></div><button class="switch">Turn on/off</button>`

class LightBulb extends HTMLElement {
  _switchState = false;

  connectedCallback() {
    this.appendChild(template.content.cloneNode(true))
	
    this.querySelector('.switch').addEventListener('click', () => {
      this._switchState = !this._switchState;
      this.switchLight(this._switchState);
    });
  }

  switchLight(state) {
    const lightBulb = this.querySelector('.light-bulb');

    if (state) { lightBulb.classList.add('light-bulb--on'); }
    else { lightBulb.classList.remove('light-bulb--on'); }
  }
}

customElements.define('light-bulb', LightBulb);

// const template = document.createElement('template')
// template.innerHTML = `<div class="light-switch"></div>
// <button class="switch">Turn on/off</button>`

// class LightBulb extends HTMLElement{
//     _switchState = false;
//     constructor(){
//         super();
//     }

//     connectedCallback(){
//         this.appendChild(template.content.cloneNode(true))

//         this.querySelector('.switch').addEventListener('click', ()=>{
//             this._switchState = !this._switchState;
//             this.switchLight(this._switchState);
//         });
//     }

//     switchLight(state){
//         const lightBulb = this.querySelector('.light-switch');

//         if(state){ lightBulb.classList.add('.light-switch--on'); }
//         else{ lightBulb.classList.remove('.light-switch--on'); }
//     }
// }


// customElements.define('light-switch', LightBulb);