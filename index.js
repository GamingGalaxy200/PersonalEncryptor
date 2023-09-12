const crypto = require('crypto');
const fs = require('fs');
const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

// Funktion zum Verschlüsseln einer Datei
function verschlüsselnDatei(ursprünglicheDatei, verschlüsselteDatei, verschlüsselungsschlüssel) {
  const input = fs.createReadStream(ursprünglicheDatei);
  const output = fs.createWriteStream(`./output/${verschlüsselteDatei}`);
  const cipher = crypto.createCipher('aes-256-cbc', verschlüsselungsschlüssel);

  input.pipe(cipher).pipe(output);
}

// Funktion zum Entschlüsseln einer Datei
function entschlüsselnDatei(verschlüsselteDatei, entschlüsselteDatei, entschlüsselungsschlüssel) {
  const input = fs.createReadStream(verschlüsselteDatei);
  const output = fs.createWriteStream(`./output/${entschlüsselteDatei}`);
  const decipher = crypto.createDecipher('aes-256-cbc', entschlüsselungsschlüssel);

  input.pipe(decipher).pipe(output);
}

// Benutzereingabe: Verschlüsseln oder Entschlüsseln
console.warn("\x1b[31m!!VORSICHT!! Bewahre Verschlüsselungsschlüssel gut auf! Andernfalls können verschlüsselte Datein nicht abgerufen werden.\x1b[37m")
rl.question('Wählen Sie eine Option:\n1. Verschlüsseln\n2. Entschlüsseln\n', (option) => {
  if (option === '1') {
    rl.question('Geben Sie den Verschlüsselungsschlüssel ein: ', (verschlüsselungsschlüssel) => {
      rl.question('Datei zum Verschlüsseln: ', (ursprünglicheDatei) => {
        rl.question('Verschlüsselte Datei speichern als: ', (verschlüsselteDatei) => {
          // Verschlüsseln
          verschlüsselnDatei(ursprünglicheDatei, verschlüsselteDatei, verschlüsselungsschlüssel);
          console.log('Datei erfolgreich verschlüsselt.');
          rl.close();
        });
      });
    });
  } else if (option === '2') {
    rl.question('Geben Sie den Entschlüsselungsschlüssel ein: ', (entschlüsselungsschlüssel) => {
      rl.question('Datei zum Entschlüsseln: ', (verschlüsselteDatei) => {
        rl.question('Entschlüsselte Datei speichern als: ', (entschlüsselteDatei) => {
          // Entschlüsseln
          entschlüsselnDatei(verschlüsselteDatei, entschlüsselteDatei, entschlüsselungsschlüssel);
          console.log('Datei erfolgreich entschlüsselt.');
          rl.close();
        });
      });
    });
  } else {
    console.log('Ungültige Option ausgewählt.');
    rl.close();
  }
});
