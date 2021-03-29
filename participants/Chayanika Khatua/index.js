import { html, LitElement, css } from 'lit-element';

class CatComponent extends LitElement {
  static get styles() {
    return css`
      :host {
        display: block;
        border: gray 2px solid;
        padding: 3px;
        border-radius: 4px;
      }
    `;
  }

  static get properties() {
    return {
      name: {
        reflect: true,
        type: String,
        hasChanged: (newValue, oldValue) => {
          // console.log(newValue, oldValue);
          return true;
        },
      },
      breed: {
        reflect: true,
        type: String,
      },
      isBad: {
        reflect: true,
        type: Boolean,
      },
    };
  }

  constructor() {
    super();
    this.name = '';
    this.breed = '';
    this.isBad = true;
  }

  // shouldUpdate(changedProperties) {
  //   console.log(changedProperties.get('name'));
  //   console.log(changedProperties.has('name'));
  //   return true;
  // }

  updated(changedProperties) {
    super.updated(changedProperties);
    if (changedProperties.has('name')) {
      console.log('updated');
      this.name2 = `${this.name}-${this.name}`;
    }
  }

  greet() {
    alert(this.name);
  }

  render() {
    const qualities = ['furry', 'snuggly'];
    return html`
      ${this.isBad
        ? html`<p>${this.name} is a bad ${this.breed}.</p>`
        : html`<p>${this.name} is a wonderful ${this.breed}.</p>`}

      <button @click=${this.greet}>Read more!</button>
    `;
  }
}
customElements.define('cat-component', CatComponent);

export default `<cat-component name="NyanCat" breed="Space Cat"></cat-component>`;
