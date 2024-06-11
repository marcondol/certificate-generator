const fs = require('fs');
const { faker } = require('@faker-js/faker');

const fakeData = Array.from({ length: 500 }, () => ({
    certificateId: faker.string.uuid(),
    title: faker.word.adjective(),
    ownerName: faker.person.firstName(),
    category: "peserta",
    email: faker.internet.email(),
    phone: faker.phone.number(),
    files: Array.from({length: 5}, () => faker.system.commonFileName()),
    certificateDate: faker.date.past(),
    domicile: faker.location.streetAddress(),
    expiredDate: faker.date.future(),
}));

fs.writeFile('fakeData.json', JSON.stringify(fakeData, null, 2), (err) => {
    if (err) throw err;
    console.log('Data written to file');
});