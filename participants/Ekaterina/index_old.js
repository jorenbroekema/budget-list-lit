class EkaterinaCounterComponent extends HTMLElement {
  constructor() {
    super();

    this.counter = 0;
    this.attachShadow({
      mode: 'open',
    });
    this.render();
  }
  static get observedAttributes() {
    return ['propName'];
  }
  connectedCallback() {
    // We want to re-render when some value changes
    // Maybe an idea to have this in a different function?

    console.log('1');
  }

  disconnectedCallback() {}

  attributeChangedCallback(attributeName, oldValue, newValue) {
    this.render();

    console.log('2');
  }

  get propName() {
    return this.counter;
  }

  set propName(val) {
    this.counter = val;
  }

  increment() {
    this.propName++;
    //this.render();
  }
  decrement() {
    this.counter--;
  }

  render() {
    this.shadowRoot.innerHTML = `<h1>Hello, Ekaterina!</h1>
    <div>
    <p>Counter: ${this.propName}</p>
    <button id='increment'>increment</button>
    <button id="decrement">decrement</button>
    </div>
    `;
    this.shadowRoot.querySelector('#increment').addEventListener('click', () => {
      this.increment();
    });

    // After render, you can query for your button to
    // attach an eventListener, for example if your button has an id
    // this.shadowRoot.querySelector('#id').addEventListener('click', function() {})
  }
}

customElements.define('ekaterina-counter-component', EkaterinaCounterComponent);

export default `<ekaterina-counter-component></ekaterina-counter-component>`;
