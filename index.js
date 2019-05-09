const webdriver = require('selenium-webdriver');
const { By } = webdriver;

const chrome = require('selenium-webdriver/chrome');
const path = require('chromedriver').path;
const notifier = require('node-notifier');

const dotenv = require('dotenv').config();
const service = new chrome.ServiceBuilder(path).build();
chrome.setDefaultService(service);

const driver = new webdriver.Builder().withCapabilities(webdriver.Capabilities.chrome()).build();

const customFunction = () => {
  console.log('Do anything');
};

const reconnect = (count = 1) => {
  driver
    .get(process.env.url)
    .then(async() => {
      console.log(`Attempt: ${count}`);
      await driver
        .findElement(By.xpath(process.env.img_xpath))
        .then(() => {
          notifier.notify({ title: 'Connected!', message: `Successful after ${count} attempts`});
          customFunction();
          return Promise.resolve()
        })
        .catch(() => (setTimeout(() => reconnect(count + 1), 50)));
    });
};
   
reconnect();
