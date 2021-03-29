class mfluitCounterComponent extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
    this.counter = 0;
    // this.render();
    // this node is re-rendered, so it needs the event listener every time
    // it renders
    // Might work better if moved to the render function
    // this.shadowRoot.querySelector('#increment').addEventListener('click', this.increment());
    // this.addEventListener('decrement', this.counter - 1);
  }

  attributeChangedCallback(name, oldValue, newValue) {
    this.render();
  }

  connectedCallback() {
    // This will need to re-render when an attribute changes,
    // Maybe an idea to render in a different function?
    this.render();
  }

  static get observedAttributes() {
    return ['counter'];
  }

  // You can reflect the counter property value to the counter attribute
  // Using get counter() { this.getAttribute('counter')}
  // Using set counter() { this.setAttribute('counter', value)}

  render() {
    // This can be rendered in the shadowRoot
    this.shadowRoot.innerHTML = `
    <h1>Hello, Marko!</h1>
    <div>
      <p>Counter: ${this.counter}</p>
      <button id="incrementButton">Increment</button>
      <button id="decrementButton">Decrement</button>
    </div>
    `;
    this.shadowRoot
      .querySelector('#incrementButton')
      .addEventListener('click', () => this.increment());
    this.shadowRoot
      .querySelector('#decrementButton')
      .addEventListener('click', this.increment().bind(this));
    // onclick will only accept function as a string, doesn't work well with function references
    // Maybe try querying the button and adding an event listener using
    // addEventListener()
  }

  increment() {
    this.counter++;
  }
  decrement() {
    this.counter--;
  }
}

customElements.define('mfluit-counter-component', mfluitCounterComponent);

export default `<mfluit-counter-component></mfluit-counter-component>`;
