/*
@license MIT
Copyright (c) 2016-2020 Horacio "LostInBrittany" Gonzalez

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
*/

import { html, css, LitElement } from 'lit-element';
import QRCode from '@lostinbrittany/qr-esm';

/**
 * A custom element to decode a QR Code from an image.
 *
 * @element granite-qrcode-decoder
 *
 * @prop {Boolean} auto - If true, the QRCode is regenerated at each change in parameters.
 * @prop {String} data - The data to encode in the QRCode.
 * @prop {Boolean} debug - If debug is true, the components logs its actions on the console.
 * @prop {String} ecclevel - The error correction code level, one of 'L', 'M', 'Q', 'H'. Defaults to 'L'.
 * @prop {String} format - The format of the generated QRCode, either "html" or "png". Defaults to "png".
 * @prop {Number} margin - This is a size of margin in *modules*. Defaults to 4 (white modules). The specficiation mandates the margin no less than 4 modules
 * @prop {Number} mask - The mask level, an integer in [0,7]. When omitted (or -1) the best mask is chosen.
 * @prop {String} mode - The mode of the QRCode, one of 'numeric', 'alphanumeric', 'octet'. When omitted the smallest possible ('numeric') mode is chosen.
 * @prop {Number} modulesize - The size of each modules in pixels. Defaults to 5px.
 * @prop {Number} version - The QRCode version, an integer in [1,40]. When omitted (or -1) the smallest possible version is chosen.
 *
 * @event {CustomEvent} qrcode-generated - Fires whenever a QRcode is generated.
 */

export class GraniteQrcodeGenerator extends LitElement {
  static get properties() {
    return {
      auto: {
        type: Boolean,
      },
      data: {
        type: String,
      },
      debug: {
        type: Boolean,
      },
      ecclevel: {
        type: String,
      },
      format: {
        type: String,
      },
      margin: {
        type: Number,
      },
      mask: {
        type: Number,
        value: -1,
      },
      mode: {
        type: String,
      },
      modulesize: {
        type: Number,
      },
      version: {
        type: Number,
      },
      _qrcode: {
        type: Object,
      },
    };
  }

  constructor() {
    super();
    this.auto = false;
    this.debug = false;
    this.ecclevel = 'L';
    this.format = 'html';
    this.mode = 'numeric';
    this.margin = 4;
    this.mask = -1;
    this.modulesize = 5;
    this.version = -1;
    this._qrcode = null;
  }

  _validateParams() {
    return (
      
      this._validateEcclevel() &&
      this._validateFormat() &&
      this._validateMask() &&
      this._validateMode() &&
      this._validateModulesize() &&
      this._validateVersion()
    );
  }

  _validateEcclevel() {
    /* istanbul ignore else */
    if (
      this.ecclevel === 'L' ||
      this.ecclevel === 'M' ||
      this.ecclevel === 'Q' ||
      this.ecclevel === 'H'
    ) {
      return true;
    }
    console.error(
      '[granite-qrcode-generator] _validateEcclevel - Invalid value of `ecclevel`',
      this.ecclevel,
    );
    return false;
  }

  _validateFormat() {
    /* istanbul ignore else */
    if (this.format == 'html' || this.format == 'png') {
      return true;
    }
    console.error(
      '[granite-qrcode-generator] _validateFormat - Invalid value of `format`',
      this.format,
    );
    return false;
  }

  
  _validateMargin() {
    /* istanbul ignore else */
    if (this.margin >= -1) {
      return true;
    }
    console.error(
      '[granite-qrcode-generator] _validateMargin - Invalid value of `margin`',
      this.margin,
    );
    return false;
  }

  _validateMask() {
    /* istanbul ignore else */
    if (this.mask >= -1 && this.mask <= 7) {
      return true;
    }
    console.error('[granite-qrcode-generator] _validateMask - Invalid value of `mask`', this.mask);
    return false;
  }

  _validateMode() {
    /* istanbul ignore else */
    if (this.mode === 'numeric' || this.mode === 'alphanumeric' || this.mode === 'octet') {
      return true;
    }
    console.error('[granite-qrcode-generator] _validateMode - Invalid value of `mode`', this.mode);
    return false;
  }

  _validateModulesize() {
    /* istanbul ignore else */
    if (this.modulesize >= 0.5) {
      return true;
    }
    console.error(
      '[granite-qrcode-generator] _validateModulesize - Invalid value of `modulesize`',
      this.modulesize,
    );
    return false;
  }

  _validateVersion() {
    /* istanbul ignore else */
    if (this.version == -1 || (this.version >= 0 && this.version <= 40)) {
      return true;
    }
    console.error(
      '[granite-qrcode-generator] _validateVersion - Invalid value of `version`',
      this.version,
    );
    return false;
  }




  _getOptions() {
    return {
      modulesize: this.modulesize,
      margin: this.margin,
      version: this.version,
      mode: this.mode,
      ecclevel: this.ecclevel,
      mask: this.mask,
    };
  }

  _generateQRCodePNG() {
    let img;
    try {
      img = document.createElement('img');
      img.src = QRCode.generatePNG(this.data, this._getOptions());
      this._qrcode = img;
    } catch (e) {
      console.error('[granite-qrcode-generator] generateQRCodePNG - No canvas support', e);
    }
  }

  _generateQRCodeHTML() {
    /* istanbul ignore next */
    if (this.debug) {
      console.debug('[granite-qrcode-generator] generateQRCodeHTML - data ', this.data);
    }
    this._qrcode = QRCode.generateHTML(this.data, this._getOptions());
  }

  /**
   * Generates the QRCode
   */
  generateQRCode() {
    
    /* istanbul ignore next */
    if (this.debug) {
      console.log('[granite-qrcode-generator] generateQRCode', this._validateParams());
    }
    /* istanbul ignore else */
    if (!this._validateParams()) {
      return;
    }
    if (this.format === 'png') {
      this._generateQRCodePNG();
    } else {
      this._generateQRCodeHTML();
    }
    this.dispatchEvent(
      new CustomEvent('qrcode-generated', {
        bubbles: true,
        composed: true,
      }),
    );
  }

  /**
   * If any of the following properties has changed, and if in auto mode,
   * it generates automatically a QRCode: auto,data,ecclevel,mask,mode,version
   * @param {*} changedProperties
   */
  updated(changedProperties) {
    /* istanbul ignore next */
    if (this.debug) {
      console.log('[granite-qrcode-generator] updated');
    }

    /* istanbul ignore else*/
    if (
      (changedProperties.has('auto') ||
        changedProperties.has('data') ||
        changedProperties.has('ecclevel') ||
        changedProperties.has('mask') ||
        changedProperties.has('mode') ||
        changedProperties.has('version')) &&
      this.auto
    ) {
      this.generateQRCode();
    }
  }

  render() {
    return html`
      <div id="qrCodeContainer">
        ${this._qrcode ? this._qrcode : ''}
      </div>
    `;
  }

  static get styles() {
    return css`
      :host {
        display: block;
      }
    `;
  }
}

window.customElements.define('granite-qrcode-generator', GraniteQrcodeGenerator);
