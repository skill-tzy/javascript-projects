const fs = require('fs');
const path = require('path');

const filePath = path.resolve(__dirname, 'notes.txt');

fs.readFile(filePath, 'utf8', (err, data) => {
  if (err) {
    console.error('Gagal membaca berkas:', err);
    return;
  }
  
  console.log(data);
});
