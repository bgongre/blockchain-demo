const addButton = document.getElementById('add-button');
const blockTxt = document.getElementById('block-txt');
// const encryptedTxt = CryptoJS.AES('message');
// console.log(encryptedTxt);

let block = 1;

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
}

const changeBlockNum = () => {
  blockTxt.innerHTML = 'Block #' + block++;
}

addButton.addEventListener('click',() => {
  addBlock();
  changeBlockNum();
})
