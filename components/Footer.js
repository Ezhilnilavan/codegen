import { LitElement, html, css } from 'lit';

export class MyComponent extends LitElement {
  static styles = css`
    .container {
      background: #222;
      font-size: 14px;
      border-radius: 6px;
      padding: 16px;
      color: #fff;
    }
  `;

  render() {
    return html`
      <div class="container">
        <h2>Lit Component from MCP Server</h2>
        <p>This uses design tokens from MCP server.</p>
      </div>
    `;
  }
}

customElements.define('my-component', MyComponent);
