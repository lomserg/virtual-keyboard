export default class {
    constructor(keys) {
      this.language ='en';
      this.keys = keys;
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

       getKeyDetail(keyboardKey) {
        return this.keys.find(key => key.code === keyboardKey)
       }

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
                    console.log('Backspace')
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
        }else {
            typed += keyCode[this.language];
            carriagePosition += 1;
          }

          textarea.value = textBeginning + typed + textEnding;
       }
}