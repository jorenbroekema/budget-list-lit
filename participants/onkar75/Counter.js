const counterTemplate = document.createElement('template');
counterTemplate.innerHTML = `
<style>
button, p {
  display: inline-block;
}
</style>
<button id="decrement">-</button>
  <p>0</p>
<button id="increment">+</button>
`;
class onkar75CounterComponent extends HTMLElement {
  constructor() {
    super();
    this.__value = 0;
    this.attachShadow({ mode: 'open' });
    this.shadowRoot.appendChild(counterTemplate.content.cloneNode(true));

    //getting dom elements

    this.valueElement = this.shadowRoot.querySelector('p');
    this.incrementButton = this.shadowRoot.getElementById('increment');
    this.decrementButton = this.shadowRoot.getElementById('decrement');

    // assigining eventlisteners

    this.incrementButton.addEventListener('click', (evt) => this.value++);

    this.decrementButton.addEventListener('click', (evt) => this.value--);
  }
  // this can be removed
  connectedCallback() {
    this.innerHTML = `<h1>Hello, onkar75!</h1>`;
  }

  get value() {
    return this.__value;
  }

  set value(value) {
    this.__value = value;
    this.valueElement.textContent = this.__value;
  }
} // end of class

customElements.define('onkar75-counter-component', onkar75CounterComponent);

export default `<onkar75-counter-component></onkar75-counter-component>`;
