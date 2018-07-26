const addButton = document.getElementById('add-button');
const mineButton = document.getElementById('mine-button');
const blockTxt = document.getElementById('block-txt');
const dataTxt = document.getElementById('data-input');
const hashTxt = document.getElementById('hash-info');
// const preHash = document.getElementById('p-hash');

// var encrypted = CryptoJS.SHA256(dataTxt);
let block = 1;

let encryptArr = [];

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
  document.getElementById('data-input').value ='';
  document.getElementById('hash-info').value = '';
}

const changeBlockNum = () => {
  blockTxt.innerHTML = 'Block #' + block++;
}

const encryptData = (str) => {
  let encryptedStr = CryptoJS.SHA256(str);
  document.getElementById('hash-info').value = encryptedStr.toString();
  encryptArr.push(encryptedStr);
}

const setPreHash = () => {
  document.getElementById('p-hash').value = encryptArr[0];
}

mineButton.addEventListener('click', () => {
  encryptData();
})

addButton.addEventListener('click',() => {
  addBlock();
  changeBlockNum();
})
