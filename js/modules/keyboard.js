export default class {
    constructor(keys) {
      this.language ='en';
      this.keys = keys;
      this.title = null;
      this.desription = null;
      this.textarea = null;
      this.main = null;
      this.keysContainer = null;
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
        const row = document.createElement('div');
        keysObj.forEach(key => {
            // console.log(key.name)
            const button = document.createElement('button');
            button.dataset.keyCode = key.code;
            button.innerText = key[this.language];
            row.appendChild(button)
        });
        this.keysContainer.append(row)
       }
}