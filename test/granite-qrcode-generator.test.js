import { html, fixture, expect } from '@open-wc/testing';
import sinon from 'sinon';

import '../index.js';

describe('GraniteQrcodeGenerator', () => {
  it('has default values for all the properties', async () => {
    const el = await fixture(html`
      <granite-qrcode-generator></granite-qrcode-generator>
    `);

    expect(el.auto).to.equal(false);
    expect(el.debug).to.equal(false);
    expect(el.ecclevel).to.equal('L');
    expect(el.format).to.equal('html');
    expect(el.mode).to.equal('numeric');
    expect(el.margin).to.equal(4);
    expect(el.mask).to.equal(-1);
    expect(el.modulesize).to.equal(5);
    expect(el.version).to.equal(-1);
  });

  it('detects changing in properties and generates QRcode', async () => {
    const el = await fixture(html`
      <granite-qrcode-generator></granite-qrcode-generator>
    `);

    let timesCalled = 0;

    el._qrcode = null;
    el.data = 'LostInBrittany';
    el.mode = 'alphanumeric';
    el.generateQRCode(); 
    expect(el._qrcode).to.not.be.null;
    
    el._qrcode = null;
    el.data = '12345678';
    el.mode = 'numeric';
    el.format = 'png';
    el.generateQRCode();
    expect(el._qrcode).to.not.be.null;
  });

  it('detects invalid properties values', async () => {
    const el = await fixture(html`
      <granite-qrcode-generator></granite-qrcode-generator>
    `);


    el.mode = 'xyz';
    el.generateQRCode(); 
    expect(el._qrcode).to.be.null;
       
    el.mode = 'numeric';
    el.modulesize = 0;
    el.generateQRCode(); 
    expect(el._qrcode).to.be.null;
  
    el.modulesize = 5;
    el.format = 'gif';
    el.generateQRCode(); 
    expect(el._qrcode).to.be.null;

    el.format = 'png';
    el.mask = 12;
    el.generateQRCode(); 
    expect(el._qrcode).to.be.null;

    el.mask = -1;
    el.ecclevel = 'A';
    el.generateQRCode(); 
    expect(el._qrcode).to.be.null;

    el.ecclevel = 'L'
    el.version = 50;
    el.generateQRCode(); 
    expect(el._qrcode).to.be.null;
  });
});
