
import Keyboard from './modules/keyboard.js'
import keys from './modules/keyslayout.js'

console.log(keys)
const newKeyboard = new Keyboard(keys)

console.log(newKeyboard)
newKeyboard.init()
