const addButton = document.getElementById('add-button');
const mineButton = document.getElementById('mine-button');
const blockTxt = document.getElementById('block-txt');
const dataTxt = document.getElementById('data-input');
const hashTxt = document.getElementById('hash-info');
const prevHash = document.getElementById('p-hash');
const nonce = document.getElementById('nonce-info');
const allInput = document.querySelectorAll('input[type=text]');
const date = document.getElementById('date');

//particles.js object variables
window.onload = function() {
  Particles.init({
    selector: '.background',
    maxParticles: 100,
    color: ['#69ffb9', '#76ecfb', '#c1fda0', '#9386e6', '#f298f4'],
    connectParticles: true
  });
};

//variable for counting past Genesis block
let block = 1;

//previous hash set to 0 by default
prevHash.value = 0;

//holds previous hash values, defaulted to null in the event Add Block is pressed before current block is mined
let encryptArr = [null];

//holds and updates nonce for blocks
let nonceArr = [];

//sets first nonce if mine button is pressed without input to encrypt
nonceArr[0] = 2345;

//get the current date and time
const getTodayDate = () => {
  let today = new Date();
  let utcDate = today.toUTCString();
  return utcDate;
}

//set the current date and time on the block(s)
const setDate = () => {
  date.innerHTML = getTodayDate();
}

setDate();

//create new block and clear all previous data
const addBlock = () => {
  let block = document.getElementById('box-wrapper');
  let clone = block.cloneNode(true);
  block.parentNode.insertBefore(clone, block.nextSibling);
  dataTxt.disabled = false;
  clearInputData();
}

//clear block data
const clearInputData = () => {
  dataTxt.value = '';
  hashTxt.value = '';
  nonce.value = '';
}

//increment block numbers when new block is added
const changeBlockNum = () => {
  blockTxt.innerHTML = 'Block #' + block++;
}

//encrypt text input field
const encryptData = (str) => {
  str = dataTxt.value;
  let encrypt = CryptoJS.SHA256(str);
  let encryptStr = hashTxt.value = encrypt.toString();
  encryptArr.push(encryptStr);
}

//push encrypted text in to array
const getHash = () => {
  encryptArr[0] = hashTxt.value;
}

//set previous encrypted string to current previous hash field
const setPrevHash = () => {
    prevHash.value = encryptArr[0];
    encryptArr[0] = null;
}

//calculate the nonce (number only used once)
const calcNonce = () => {
  str = '';
  const possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

  while (str.length < 4) {
    str += possible.charCodeAt(Math.floor(Math.random() * possible.length));
  }
  return str;
}

//assign calculated nonce in nonceArr
const setNonce = () => {
  nonceArr[0] = calcNonce();
}

//set calculated nonce in array to nonce DOM element
const placeNonce = () => {
  nonce.value = nonceArr[0];
}

mineButton.addEventListener('click', () => {
    encryptData();
    getHash();
    placeNonce();
})

dataTxt.addEventListener('input', setNonce);

addButton.addEventListener('click', () => {
  dataTxt.disabled = true;
  addBlock();
  setPrevHash();
  changeBlockNum();
  setDate();
  setNonce();
})
