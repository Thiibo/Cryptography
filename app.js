const charSet = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyzÁÀÃÂÇÉÈÊÍÌÎÓÒÕÔÚÙÛáàãâçéèêíìîóòõôúùû0123456789.,?!;:<>/\\+-*%=_~&|@#\"’'§^°()[]{}$€£²³´` \n"
let encryptedField = document.getElementById('encryptedField');
let decryptedField = document.getElementById('decryptedField');
console.log("Length of charSet = " + charSet.length)

function setCustomCharSet() {
  let keyVigenereAfter = "";
  let usedChars = [];
  for(let i = 0; i < keyVigenere.length; i++) {
    if(usedChars.indexOf(keyVigenere[i]) == -1) {
      keyVigenereAfter = keyVigenereAfter + keyVigenere[i];
      usedChars.push(keyVigenere[i]);
    }
  }
  customCharSet = ""
  for(let i = 0; i < charSet.length; i++) {
    if(usedChars.indexOf(charSet[i]) == -1) {
      customCharSet = customCharSet + charSet[i];
    }
  }
  customCharSet = keyVigenereAfter + customCharSet;
  console.log("Custom charset: " + customCharSet);
}
function encrypt() {
  keyVigenere = document.getElementById('key_vigenere_input').value;
  let keyHead = document.getElementById('key_head_input').value;
  let decryptedMsg = decryptedField.value;
  for(let i = 0; i < keyVigenere.length; i++) {
    if(charSet.indexOf(keyVigenere[i]) == -1) {
      errorMsg = "ERROR: The vigenere key cannot contain the character '" + keyVigenere[i] + "'.\nAccepted characters are:\n\n" + charSet;
      encryptedField.value = errorMsg;
      encryptedField.classList.add("error");
      return;
    }
  }
  for (let i = 0; i < decryptedMsg.length; i++) {
    if(charSet.indexOf(decryptedMsg[i]) == -1) {
      errorMsg = "ERROR: The decrypted message (input) cannot contain the character '" + decryptedMsg[i] + "'.\nAccepted characters are:\n\n" + charSet;
      encryptedField.value = errorMsg;
      encryptedField.classList.add("error");
      return;
    }
  }
  encryptedField.classList.remove("error");
  setCustomCharSet();
  let encryptedMsg = "";
  for (let i = 0; i < decryptedMsg.length; i++) {
    encryptedCharIndex = customCharSet.indexOf(keyHead[i % keyHead.length]) - customCharSet.indexOf(decryptedMsg[i]);
    encryptedCharIndex = encryptedCharIndex < 0 ? customCharSet.length + encryptedCharIndex : encryptedCharIndex;
    switch (customCharSet[encryptedCharIndex]) {
      case "\n":
        encryptedChar = "¬";
        break;
      case " ":
        encryptedChar = "·";
        break;
      default:
        encryptedChar = customCharSet[encryptedCharIndex];
    }
    console.log("For '" + decryptedMsg[i] + "' (" + customCharSet.indexOf(decryptedMsg[i]) + "): encrypted char = " + encryptedCharIndex + " ('" + encryptedChar + "')");
    encryptedMsg = encryptedMsg + encryptedChar;
  }
  encryptedField.value = "§" + encryptedMsg;
}
function decrypt() {
  keyVigenere = document.getElementById('key_vigenere_input').value;
  let keyHead = document.getElementById('key_head_input').value;
  let encryptedMsg = encryptedField.value.substring(1);
  console.log(encryptedMsg);
  for(let i = 0; i < keyVigenere.length; i++) {
    if(charSet.indexOf(keyVigenere[i]) == -1) {
      errorMsg = "ERROR: The vigenere key cannot contain the character '" + keyVigenere[i] + "'.\nAccepted characters are:\n\n" + charSet;
      decryptedField.value = errorMsg;
      decryptedField.classList.add("error");
      return;
    }
  }
  for (let i = 0; i < encryptedMsg.length; i++) {
    if(charSet.indexOf(encryptedMsg[i]) == -1 && encryptedMsg[i] != "¬" && encryptedMsg[i] != "·") {
      errorMsg = "ERROR: The encrypted message (input) cannot contain the character '" + encryptedMsg[i] + "'.\nAccepted characters are:\n\n" + charSet;
      decryptedField.value = errorMsg;
      decryptedField.classList.add("error");
      return;
    }
  }
  decryptedField.classList.remove("error");
  setCustomCharSet();
  let decryptedMsg = "";
  for (let i = 0; i < encryptedMsg.length; i++) {
    switch (encryptedMsg[i]) {
      case "¬":
        decryptedCharIndex = customCharSet.indexOf(keyHead[i % keyHead.length]) - customCharSet.indexOf("\n");
        break;
      case "·":
        decryptedCharIndex = customCharSet.indexOf(keyHead[i % keyHead.length]) - customCharSet.indexOf(" ");
        break;
      default:
        decryptedCharIndex = customCharSet.indexOf(keyHead[i % keyHead.length]) - customCharSet.indexOf(encryptedMsg[i]);
    }
    decryptedCharIndex = decryptedCharIndex < 0 ? customCharSet.length + decryptedCharIndex : decryptedCharIndex;
    switch (customCharSet[decryptedCharIndex]) {
      case "¬":
        decryptedChar = "\n";
        break;
      case "·":
        decryptedChar = " ";
        break;
      default:
        decryptedChar = customCharSet[decryptedCharIndex];
    }
    console.log("For '" + encryptedMsg[i] + "' (" + customCharSet.indexOf(encryptedMsg[i]) + "): decrypted char = " + decryptedCharIndex + " ('" + decryptedChar + "')");
    decryptedMsg = decryptedMsg + decryptedChar;
  }
  decryptedField.value = decryptedMsg;
}
decryptedField.addEventListener('input', function() {decryptedField.classList.remove("error");}, false);
encryptedField.addEventListener('input', function() {encryptedField.classList.remove("error");}, false);

function randomize(n) {
  let str = ""
  for (let i = 0; i < n; i++) {
    char = charSet[Math.floor(Math.random() * charSet.length)];
    str = str + char
  }
  return str;
}
function randomizeHead() {
  document.getElementById('key_head_input').value = randomize(Math.floor(Math.random() * 15) + 1);
}
function randomizeVigenere() {
  document.getElementById('key_vigenere_input').value = randomize(Math.floor(Math.random() * 15) + 1);
}

function setActionButtonsHeight() {
  document.getElementById("encrypt").style.height = document.getElementById("encrypt").offsetWidth + "px";
  document.getElementById("decrypt").style.height = document.getElementById("decrypt").offsetWidth + "px";
}
/*window.addEventListener('resize', setActionButtonsHeight);*/
