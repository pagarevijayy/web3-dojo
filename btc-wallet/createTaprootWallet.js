// Taproot wallet address generation using Node.js.
// reference: https://github.com/bitcoinjs/bitcoinjs-lib/blob/master/test/integration/taproot.spec.ts 

const ecc = require('tiny-secp256k1')
const { BIP32Factory } = require('bip32')
const bip32 = BIP32Factory(ecc)
const bip39 = require('bip39')
const bitcoin = require('bitcoinjs-lib')

const path = `m/86'/0'/0'/0/0`; // Path to first child of receiving wallet on first account
bitcoin.initEccLib(ecc);

let mnemonic = bip39.generateMnemonic()
const seed = bip39.mnemonicToSeedSync(mnemonic)
let rootKey = bip32.fromSeed(seed)

const childNode = rootKey.derivePath(path);
let node = childNode.derive(0).derive(0);

const toXOnly = pubKey => (pubKey.length === 32 ? pubKey : pubKey.slice(1, 33));

const childNodeXOnlyPubkey = toXOnly(childNode.publicKey);

const internalPubkey = childNodeXOnlyPubkey;

const { address, output } = bitcoin.payments.p2tr({
    internalPubkey
});

console.log(`
Wallet generated:
- Taproot Address: ${address},
- Key: ${node.toWIF()}, 
- Mnemonic: ${mnemonic}    
`)