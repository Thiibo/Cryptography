const charSet = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyzÁÀÃÂÇÉÈÊÍÌÎÓÒÕÔÚÙÛáàãâçéèêíìîóòõôúùû0123456789.,?!;:<>/\\+-*%=_~&|@#\"’'§^°()[]{}$€£²³´` \n"
console.log("Length of charSet = " + charSet.length)

function setCustomCharSet() {
  keyVignereAfter = "";
  let usedChars = [];
  for(let i = 0; i < keyVignere.length; i++) {
    if(usedChars.indexOf(keyVignere[i]) == -1) {
      keyVignereAfter = keyVignereAfter + keyVignere[i];
      usedChars.push(keyVignere[i]);
    }
  }
  customCharSet = ""
  for(let i = 0; i < charSet.length; i++) {
    if(usedChars.indexOf(charSet[i]) == -1) {
      customCharSet = customCharSet + charSet[i];
    }
  }
  customCharSet = keyVignereAfter + customCharSet;
  console.log("Custom charset: " + customCharSet);
}
function encrypt() {
  keyVignere = document.getElementById('key_vignere_input').value;
  let keyHead = document.getElementById('key_head_input').value;
  let decryptedMsg = document.getElementById('decryptedField').value;
  for(let i = 0; i < keyVignere.length; i++) {
    if(charSet.indexOf(keyVignere[i]) == -1) {
      errorMsg = "ERROR: The vignere key cannot contain the character '" + keyVignere[i] + "'.\nAccepted characters are:\n\n" + charSet;
      document.getElementById('encryptedField').style.border = "1px dashed red";
      document.getElementById('encryptedField').value = errorMsg;
      return;
    }
  }
  for (let i = 0; i < decryptedMsg.length; i++) {
    if(charSet.indexOf(decryptedMsg[i]) == -1) {
      errorMsg = "ERROR: The decrypted message (input) cannot contain the character '" + decryptedMsg[i] + "'.\nAccepted characters are:\n\n" + charSet;
      document.getElementById('encryptedField').style.border = "1px dashed red";
      document.getElementById('encryptedField').value = errorMsg;
      return;
    }
  }
  document.getElementById('encryptedField').setAttribute("style", "");
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
  document.getElementById('encryptedField').value = "§" + encryptedMsg;
}
function decrypt() {
  keyVignere = document.getElementById('key_vignere_input').value;
  let keyHead = document.getElementById('key_head_input').value;
  let encryptedMsg = document.getElementById('encryptedField').value.substring(1);
  console.log(encryptedMsg);
  for(let i = 0; i < keyVignere.length; i++) {
    if(charSet.indexOf(keyVignere[i]) == -1) {
      errorMsg = "ERROR: The vignere key cannot contain the character '" + keyVignere[i] + "'.\nAccepted characters are:\n\n" + charSet;
      document.getElementById('encryptedField').style.border = "1px dashed red";
      document.getElementById('encryptedField').value = errorMsg;
      return;
    }
  }
  for (let i = 0; i < encryptedMsg.length; i++) {
    if(charSet.indexOf(encryptedMsg[i]) == -1 && encryptedMsg[i] != "¬" && encryptedMsg[i] != "·") {
      errorMsg = "ERROR: The encrypted message (input) cannot contain the character '" + encryptedMsg[i] + "'.\nAccepted characters are:\n\n" + charSet;
      document.getElementById('encryptedField').style.border = "1px dashed red";
      document.getElementById('encryptedField').value = errorMsg;
      return;
    }
  }
  document.getElementById('encryptedField').setAttribute("style", "");
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
  document.getElementById('decryptedField').value = decryptedMsg;
}

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
function randomizeVignere() {
  document.getElementById('key_vignere_input').value = randomize(Math.floor(Math.random() * 15) + 1);
}

function setActionButtonsHeight() {
  document.getElementById("encrypt").style.height = document.getElementById("encrypt").offsetWidth + "px";
  document.getElementById("decrypt").style.height = document.getElementById("encrypt").offsetWidth + "px";
  console.log("hi");
}
window.addEventListener('resize', setActionButtonsHeight);
