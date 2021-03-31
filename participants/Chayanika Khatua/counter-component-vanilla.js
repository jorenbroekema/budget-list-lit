class Counter extends HTMLElement {
  static get observedAttributes() {
    return ['value'];
  }

  set valueProperty(value) {
    console.log('property setter', value);
    this.setAttribute('value', value);
  }

  get valueProperty() {
    return this.getAttribute('value');
  }

  constructor () {
    super();
    this.attachShadow({
      mode: 'open',
    });
    this.valueProperty = 0;
    console.log('constructor');
  }

  attributeChangedCallback(name, oldValue, newValue) {
    console.log(name, oldValue, newValue);
    this.render();
  }

  connectedCallback() {
    console.log('connectedCallback');
    this.render();
  }

  increment() {
    this.valueProperty++;
  }

  decrement() {
    this.valueProperty--;
  }

  render() {
    this.shadowRoot.innerHTML = `
      <div>
        <p>${this.valueProperty}</p>
        <button id="incButton">+</button>
        <button id="decButton">-</button>
      </div>
    `;
    this.shadowRoot.querySelector('#incButton').onclick = this.increment.bind(this);
    this.shadowRoot.querySelector('#decButton').onclick = this.decrement.bind(this);
  }
}

customElements.define('custom-counter', Counter);