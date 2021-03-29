class CatComponent extends HTMLElement {
  static get observedAttributes() {
    return ['name', 'breed'];
  }

  set name(name) {
    this.setAttribute('name', name);
  }

  get name() {
    return this.getAttribute('name');
  }

  set breed(breed) {
    this.setAttribute('breed', breed);
  }

  get breed() {
    return this.getAttribute('breed');
  }

  constructor() {
    super();
    this.attachShadow({
      mode: 'open',
    });
  }

  attributeChangedCallback() {
    if (this.shadowRoot) {
      this.render();
    }
  }

  connectedCallback() {
    this.render();
    // this.innerHTML = `<h1>Hello, Chayanika!</h1>`;
  }

  render() {
    this.shadowRoot.innerHTML = `
      <style>
        :host {
          display: block;
          border: gray 2px solid;
          padding: 3px;
          border-radius: 4px;
        }
      </style>
      <p>${this.name} is a wonderful ${this.breed}.</p>
      <button>Read more!</button>
    `;

    this.shadowRoot.querySelector('button').addEventListener('click', () => alert('Mweou!'));
  }
}
customElements.define('cat-component', CatComponent);

export default `<cat-component name="NyanCat" breed="Space Cat"></cat-component>`;
