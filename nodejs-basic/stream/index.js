const fs = require('fs');
const path = require('path');
const { Readable, Writable } = require('stream');

const inputFilePath = path.resolve(__dirname, 'input.txt');
const outputFilePath = path.resolve(__dirname, 'output.txt');

const readableStream = new Readable({
  highWaterMark: 15, // Menetapkan nilai highWaterMark untuk readable stream
  read() {}
});

const writableStream = new Writable({
  write(chunk, encoding, callback) {
    fs.writeFile(outputFilePath, chunk.toString() + '\n', { flag: 'a' }, callback);
  }
});

readableStream.pipe(writableStream);

fs.readFile(inputFilePath, 'utf8', (err, data) => {
  if (err) {
    console.error('Gagal membaca berkas input.txt:', err);
    return;
  }
  
  const chunks = data.match(/.{1,15}/g); // Memisahkan teks menjadi potongan-potongan 15 karakter
  chunks.forEach(chunk => readableStream.push(chunk));
  readableStream.push(null); // Menandakan akhir dari readable stream
});
