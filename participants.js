const fs = require('fs');
const path = require('path');
const { convertCsvToXlsx } = require('@aternus/csv-to-xlsx');
const { faker } = require('@faker-js/faker');
const certificatePdf = require('./certificate-pdf');
const Jimp = require("jimp");


const title = faker.lorem.sentence(3);


const fakeData = Array.from({ length: 20 }, () => ({
  ownerName: faker.person.fullName(),
  phoneNumber: faker.phone.phoneNumber,
  domicile: faker.location.streetAddress(),
  email: faker.internet.email(),
  categoryCertificate: 'peserta',
  certificateId: faker.string.uuid(),
  title,
  certificateDate: faker.date.recent().toISOString().split('T')[0],
  expiredDate: faker.date.future().toISOString().split('T')[0],
}));

fakeData.unshift({'ownerName': 'ownerName','phoneNumber': 'phoneNumber','domicile': 'domicile','email': 'email','categoryCertificate': 'categoryCertificate','certificateId': 'certificateId','title': 'title','certificateDate': 'certificateDate','expiredDate': 'expiredDate'});

const csvData = fakeData.map((item) => Object.values(item).join(','));

//Writing the data into csv file
fs.writeFile('./participants.csv', csvData.join('\r\n').toString(), (err) => {
    if (err) throw err;
    console.log('Data written to file csv');
    let source = path.join(__dirname, './participants.csv');
    let destination = path.join(__dirname, './testingdata/sertifikat.xlsx');
    let destinationPdf = path.join(__dirname, './testingpdf/sertifikat.xlsx');

    try {
      convertCsvToXlsx(source, destination);
      convertCsvToXlsx(source, destinationPdf);
    } catch (e) {
      console.log(e);
    }
});



fs.writeFile('participants.json', JSON.stringify(fakeData, null, 2), (err) => {
    if (err) throw err;
    console.log('Data written to file json');
});

var x = 279;

// var x = 850;
var lgX = 265;
var xlX = 220;
var xxlX = 205;
// var smX = 375;
var y = 535;
// var y = 700;

fs.readFile('participants.json',(err,data) => {
  if(err) return console.log(err);
  var dataObj = JSON.parse(data);
  var printObj =[];
  var len = dataObj.length;
  for(let i=0;i<len;i++) {
    if(dataObj[i].ownerName.split(" ")[1]){
      printObj.push(dataObj[i].ownerName.split(" ")[0] + " " +  dataObj[i].ownerName.split(" ")[1]);
      console.log(printObj[i]);
    }
    else {
      printObj.push(dataObj[i].ownerName.split(" ")[0]);
      console.log(printObj[i]);
    }
    Jimp.read("basesss.jpg", function (err, image) {
      Jimp.loadFont(Jimp.FONT_SANS_32_BLACK).then(function (font) { // load font from .fnt file
        // if(printObj[i].length < 50 ){
          // console.log(printObj[i].length);
          let printS = printObj[i].toString().toUpperCase();
          image.print(font, x, y, printS).write("./testingdata/"+ dataObj[i].certificateId + ".jpg");        // print a message on an image
        // }
        // else if(printObj[i].length >= 20){
        //   console.log(printObj[i].length);
        //   let printS = printObj[i].toString().toUpperCase();
        //   image.print(font, xxlX , y, printS).write("./GAEcertificates/op"+ i + ".jpg");
        // }
        // else if(printObj[i].length >= 16 && printObj[i].length < 20){
        //   console.log(printObj[i].length);
        //   let printS = printObj[i].toString().toUpperCase();
        //   image.print(font, xlX , y, printS).write("./GAEcertificates/op"+ i + ".jpg");
        // }
        // else if(printObj[i].length >= 14 && printObj[i].length < 16){
        //   console.log(printObj[i].length);
        //   let printS = printObj[i].toString().toUpperCase();
        //   image.print(font, lgX , y, printS).write("./GAEcertificates/op"+ i + ".jpg");
        // }
        // else if(printObj[i].length <= 6){
        //   console.log(printObj[i].length);
        //   let printS = printObj[i].toString().toUpperCase();
        //   image.print(font, smX , y, printS).write("./GAEcertificates/op"+ i + ".jpg");
        // }

      });
    });
  }

});

for ( data of fakeData) {
  if (data.certificateId === 'certificateId') {
    continue;
  }
  certificatePdf(data);
}
