
import Keyboard from './modules/keyboard.js'
import keys from './modules/keyslayout.js'


const newKeyboard = new Keyboard(keys)


newKeyboard.init()


document.addEventListener("keydown", e => {
    e.preventDefault();
    const textarea = document.querySelector('.text');
    let carriagePosition = textarea.selectionStart;


    const keyboardKey = e.code
    const keyDetail = newKeyboard.getKeyDetail(keyboardKey)
    newKeyboard.keyType(keyDetail)

  
  })