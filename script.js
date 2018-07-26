const addButton = document.getElementById('add-button');
const mineButton = document.getElementById('mine-button');
const blockTxt = document.getElementById('block-txt');
const dataTxt = document.getElementById('data-input');
const hashTxt = document.getElementById('hash-info');
const prevHash = document.getElementById('p-hash');

let block = 1;
prevHash.value = 0;

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
  dataTxt.value ='';
  hashTxt.value = '';
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

let setPrevHash = () => {
  prevHash.value = encryptArr[0];
}

mineButton.addEventListener('click', () => {
  encryptData();
  console.log(encryptArr);
})

addButton.addEventListener('click',() => {
  addBlock();
  clearInputData();
  setPrevHash();
  changeBlockNum();
})
