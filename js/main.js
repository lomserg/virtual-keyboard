import Keyboard from './modules/keyboard.js';
import keys from './modules/keyslayout.js';

const newKeyboard = new Keyboard(keys);

newKeyboard.init();

// helper event hendle functions
function eventHandler(e) {
  e.preventDefault();
  const keyboardKey = e.code;
  const keyDetail = newKeyboard.getKeyDetail(keyboardKey);
  if (keyDetail) {
    newKeyboard.utils(e.code, e.type);
    if (e.type === 'keydown') {
      newKeyboard.keyType(keyDetail);
    }
  }
}

document.addEventListener('keydown', eventHandler);
document.addEventListener('keyup', eventHandler);
document.querySelector('textarea').focus();
document.querySelector('.keyboard').addEventListener('mousedown', (e) => {
  const keyboardKey = e.target.dataset.keyCode;
  const keyDetail = newKeyboard.getKeyDetail(keyboardKey);
  newKeyboard.keyType(keyDetail);
  newKeyboard.utils(keyboardKey, e.type);
});
// document.addEventListener("keydown", e => {
//     e.preventDefault();
//     const keyboardKey = e.code
//     const keyDetail = newKeyboard.getKeyDetail(keyboardKey)
//     newKeyboard.keyType(keyDetail)
//     if(e.ctrlKey) {
//         console.log('cool')
//         if(e.shiftKey) {
//             newKeyboard.switchLanguage()
//             newKeyboard.updateKeys()
//         }
//     } else if(e.shiftKey && e.repeat) {
//         console.log('shift down')

//     } else if(!e.shiftKey) {

//     }

//   })

//   document.addEventListener('keyup', e => {
//     e.preventDefault();
//     console.log(e)
//   })
