import { html } from '@polymer/lit-element';
import { DmPageView } from './dm-page-view';
import { SharedStyles } from './shared-styles';

import '@vaadin/vaadin-combo-box/vaadin-combo-box';
import '@polymer/paper-card';
import './dm-weapon';

class DmWeaponsView extends DmPageView {
  render() {
    return html`
      ${SharedStyles}
      <style>  
        dm-weapon {
          padding-top: 1%;
        }
      </style>
      <vaadin-combo-box 
        label="Search for a weapon"
        @selected-item-changed="${this._inputChanged.bind(this)}"
        .items="${this._weaponsList}">
      </vaadin-combo-box>
      ${this._selectedWeapon ? this._generateWeaponCard() : ''}
    `;
  }

  static get properties() {
    return {
      _weaponsList: { type: Array },
      _selectedWeapon: { type: Object },
    };
  }

  constructor() {
    super();
    this._baseUrl = 'https://us-central1-dm-helper-1f262.cloudfunctions.net/weapons';
    this._weaponsList = [];
  }

  firstUpdated() {
    fetch(this._baseUrl)
      .then(r => r.json())
      .then((weapons) => {
        this._weaponsList = weapons;
      });
  }

  _generateWeaponCard() {
    return html`<dm-weapon .weapon="${this._selectedWeapon}"></dm-weapon>`;
  }

  _inputChanged({ target: { value } }) {
    fetch(value)
      .then(r => r.json())
      .then((w) => {
        this._selectedWeapon = w;
      });
  }
}

window.customElements.define('dm-weapons-view', DmWeaponsView);