import { css } from 'lit-element';

export const jorenStyles = css`
  h2 {
    color: blue;
  }

  :host([bool]) h2 {
    color: red;
  }

  :host([my-title='Willem']) h2 {
    color: green;
  }

  .card {
    background-color: grey;
    padding: 20px;
    border-radius: 5px;
    display: inline-block;
    margin: 20px;
  }
`;
