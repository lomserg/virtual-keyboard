export default class {
    constructor(keys) {
      // main props
      this.language = this.getLang();
      this.pressedBtn = [];
      this.isPressCaps = false
      // array
      this.keys = keys;
      //html element
      this.title = null;
      this.desription = null;
      this.textarea = null;
      this.main = null;
      this.keysContainer = null;
      this.row = null;
      this.createKeyboard();
    }

    init() {
        //create main div
        this.main = document.createElement('div');
        this.main.classList.add('main')
        document.body.appendChild(this.main)
        //add title
        this.title = document.createElement('h1');
        this.title.innerText = 'Virtual keyboard'
        this.main.appendChild(this.title)
        //add text area
        this.textarea = document.createElement('textarea');
        this.textarea.classList.add('text');
        this.main.appendChild(this.textarea);
        //add keyboard
        this.createKeyboard()
        this.main.appendChild(this.keysContainer);
    }

    createKeyboard() {
      this.keysContainer = document.createElement('div');
      this.keysContainer.classList.add('keyboard');
      const keysObj = this.keys
      let currentRow;
      keysObj.forEach(key => {
            // console.log(key.name)
            if(currentRow != key.row) {
                this.row = document.createElement('div');
                this.row.classList.add('keyboard__row');
              this.keysContainer.append( this.row);
              currentRow = key.row
              }
              const button = document.createElement('button');
              if (key.classes) {
                button.classList = key.classes;
              }
              if(key.isSpecial) {
                button.innerHTML = key.name
              } else {
                button.innerHTML = key[this.language];
            }

              button.dataset.keyCode = key.code;
              this.row.appendChild(button)
        });
                this.keysContainer.append( this.row)
    }

    utils(keyCode, eventType) {
      this.eventHelper(keyCode, eventType)
      console.log(this.pressedBtn)
      this.switchLanguage()
      this.highLightKeys()
      this.updateKeys()
    }

  // add key code to array
    addPressKey(keyName) {
      return this.pressedBtn.push(keyName)
    }
  // remove key code to array
    removePressKey(keyName) {
    this.pressedBtn.splice(0, this.pressedBtn.length - 1)
    this.pressedBtn.splice(this.pressedBtn.indexOf(keyName), 1)
    return this.pressedBtn
}

checkPressed(keyName) {
  if(keyName === 'CapsLock') {
      return this.isPressCaps = true
  } else {
      return this.pressedBtn.includes(keyName)
  }

}
    updateKeys() {
        const btns = this.keysContainer.querySelectorAll('button')
        btns.forEach((button) => {
            const data = this.getKeyDetail(button.dataset.keyCode);
            if (!data.isSpecial) {
            let updated = data[this.language]
            if (this.checkPressed('Shift')
          || (this.checkPressed('Shift') && this.checkPressed('CapsLock'))) {
            updated = data[`${this.language}Shift`];
          } else if (this.checkPressed('CapsLock')) {
            updated = data[this.language].toUpperCase();
          }
             document.querySelector(`[data-key-code="${data.code}"]`).innerHTML = updated;
            } else if(this.checkPressed('Shift')) {
              updated = data[this.language]
            }
          });
      }
      // shiftUpdateKeys() {
      //   const btns = this.keysContainer.querySelectorAll('button')
      //   btns.forEach((button) => {
      //       const data = this.getKeyDetail(button.dataset.keyCode);
      //       console.log(data)
        
      //       let updated = data[`${this.language}Shift`];
      //        document.querySelector(`[data-key-code="${data.code}"]`).innerHTML = updated;
      //       }
      //     );
      // }
    keyType(keyCode) {
        const textarea = document.querySelector('.text');
        let carriagePosition = textarea.selectionStart;
        let text = textarea.value
        let textBeginning = text.slice(0, carriagePosition);
        const textEnding = text.slice(carriagePosition);
        let typed = '';
          if(keyCode.isSpecial) {
            switch (keyCode.code) {
                case 'Backspace':
                    textBeginning = textBeginning.slice(0, -1);
                    carriagePosition -= 1;
                break;
                case 'Tab':
                    typed = '\t';
                    carriagePosition += 1;
                break;
                case 'Enter':
                    typed = '\n';
                    carriagePosition += 1;
                break;
                case 'Space':
                    typed = ' ';
                    carriagePosition += 1;
                break;
                }
            } else {
              typed += keyCode[this.language];
              carriagePosition += 1;
          }

          textarea.value = textBeginning + typed + textEnding;
      }
      // get data from array
       getKeyDetail(keyboardKey) {
        return this.keys.find(key => key.code === keyboardKey)
       }

       setLang(language = this.language) {
        localStorage.setItem('language', language);
        return this;
      }

      getLang() {
        let langNow = 'en';
        if (!localStorage.getItem('language')) {
          this.setLang(langNow);
        } else {
            langNow = localStorage.getItem('language');
        }
        return langNow;
      }

      switchLanguage() {
        if (this.checkPressed('ShiftLeft') && this.checkPressed('ControlLeft')) {
              this.language = (this.language === 'en') ? 'ru' : 'en';
              this.setLang(this.language);
              console.log(this.language)
        }
      }

      eventHelper(keyCode, eventType) {
        if (keyCode === 'CapsLock') {
          switch (eventType) {
            case 'keydown':
            case 'keyup':
              this.isPressCaps = !this.isPressCaps;
              break;
            default:
          }
        } else if (keyCode !== 'CapsLock') {
          switch (eventType) {
            case 'keydown':
              if (!this.checkPressed(keyCode)) {
                this.addPressKey(keyCode)
              };
              break;
            case 'keyup':
              if (this.checkPressed(keyCode)) {
                this.removePressKey(keyCode)
              }
              break;
            default:
          }
        }
      }

      isPressed(keyboardKey) {
        return (keyboardKey.code === 'CapsLock') ? this.capslockPressed : this.pressedBtn.some((key) => key.includes(keyboardKey.code));
      }

      highLightKeys() {
        this.keysContainer.querySelectorAll('button').forEach((button) => {
          if (!this.isPressed(button.dataset.keyCode)) button.classList.remove('active');
        });
        this.pressedBtn.forEach((key) => this.keysContainer.querySelector(`[data-key-code="${key}"]`).classList.add('active'));
        if (this.capslockPressed) this.keysContainer.querySelector('[data-key-code="CapsLock"]').classList.add('active');
      }
}