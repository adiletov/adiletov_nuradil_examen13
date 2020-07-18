const { I } = inject();
// Add in your custom step files



When('я нахожусь на странице логина', () => {
  I.amOnPage('/login');
  I.wait(1)
});

Then('я заполняю поля формы :', (table) => {
    const tableData = table.parse().rawData;
    tableData.forEach(row => {
        I.fillField(row[0], row[1])
    });
    I.wait(1)
});

Then('нажимаю на кнопку {string}', (name) => {
    I.click(name)
});

Then('я вижу текст {string}', text => {
    I.waitForText(text);
    I.wait(1)
});

Then('нажимаю на кнопку {string}', (name) => {
    I.click(name);
    I.wait(1)
});

Then('нажимаю на кнопку {string}', (name) => {
    I.click(name);
    I.wait(1)
});

Then('я нахожусь на странице добавления', () => {
    I.amOnPage('/add_place');
    I.wait(1)
});

Then('я заполняю поля формы :', (table) => {
    const tableData = table.parse().rawData;
    tableData.forEach(row => {
        if (row[0] === 'mainPicture') {
            I.attachFile(row[0], row[1]);
        }else{
            I.fillField(row[0], row[1])
        }
    });
    I.wait(2)
});
Then('нажимаю на кнопку {string}', (name) => {
    I.click(name);
});
Then('нажимаю на кнопку {string}', (name) => {
    I.click(name);
});
Then('я вижу текст {string}', text => {
    I.waitForText(text);
    I.wait(3)
});