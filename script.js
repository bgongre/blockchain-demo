const addButton = document.getElementById('add-button');
const mineButton = document.getElementById('mine-button');
const blockTxt = document.getElementById('block-txt');
const dataTxt = document.getElementById('data-input');
const hashTxt = document.getElementById('hash-info');
const prevHash = document.getElementById('p-hash');
const nonce = document.getElementById('nonce-info');

let block = 1;
nonce.value = 305404;
prevHash.value = 0;

let encryptArr = [];
let nonceArr = [];

const todayDate = () => {
  let today = new Date();
  let utcDate = today.toUTCString();
  return utcDate;
}

document.getElementById('date').innerHTML = todayDate();

const addBlock = () => {
  let itm = document.getElementById('box-wrapper');
  let clone = itm.cloneNode(true);
  itm.parentNode.insertBefore(clone, itm.nextSibling);
  clearInputData();
}

const clearInputData = () => {
  dataTxt.value = '';
  hashTxt.value = '';
  nonce.value = '';
}

const changeBlockNum = () => {
  blockTxt.innerHTML = 'Block #' + block++;
}

const encryptData = (str) => {
  str = dataTxt.value;
  let encrypt = CryptoJS.SHA256(str);
  let encryptStr = hashTxt.value = encrypt.toString();
  encryptArr.push(encryptStr);
}

const getHash = () => {
  encryptArr[0] = hashTxt.value;
}

const setPrevHash = () => {
  prevHash.value = encryptArr[0];
}

const calcNonce = () => {
  str = '';
  const possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

  while (str.length < 4) {
    str += possible.charCodeAt(Math.floor(Math.random() * possible.length));
  }
  return str;
}

const setNonce = () => {
  nonceArr[0] = calcNonce();
}

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
  addBlock();
  clearInputData();
  setPrevHash();
  changeBlockNum();
})
