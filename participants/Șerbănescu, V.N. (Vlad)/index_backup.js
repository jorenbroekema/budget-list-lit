class ȘerbănescuCounterComponent extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
    this.counterProperty = 0;
  }

  disconnectedCallback() {}

  static get observedAttributes() {
    return ['counter'];
  }
  // You can use attributeChangedCallback hook to act once the attribute changes

  attributeChangedCallback(name, oldValue, newValue) {
    this.render();
  }

  increment() {
    this.counter++;
  }

  decrement() {
    this.counter--;
  }

  get counterProperty() {
    this.getAttribute('counter');
  }

  set counterProperty(value) {
    this.setAttribute('counter', value);
  }

  render() {
    this.innerHTML = `<h1>Hello, Șerbănescu, V.N. (Vlad)! ${this.counter}</h1>
      <button id="plus">+</button>
      <button id="minus">-</button>
    `;
  }
}

customElements.define('serbanescu-counter-component', ȘerbănescuCounterComponent);

export default `<serbanescu-counter-component></serbanescu-counter-component>`;
