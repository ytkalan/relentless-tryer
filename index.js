const webdriver = require('selenium-webdriver');
const { By } = webdriver;

const chrome = require('selenium-webdriver/chrome');
const path = require('chromedriver').path;
const notifier = require('node-notifier');

const dotenv = require('dotenv').config();

const counter = 1;
const service = new chrome.ServiceBuilder(path).build();
chrome.setDefaultService(service);

const driver = new webdriver.Builder().withCapabilities(webdriver.Capabilities.chrome()).build();

const reconnect = () => {
    driver
      .get(process.env.url)
      .then(() => {
          console.log("Attempt: ", counter);
          driver
          .findElement(By.xpath(process.env.img_xpath))
          .then(() => {
            notifier.notify('Success!');
            driver
            .findElement(By.xpath(process.env.button_xpath)).click()
            .catch(() => console.log('End'));
          })
          .catch(() => {
            counter = count + 1;
            setTimeout(reconnect, 500);
        });
      });
   };
   
   reconnect();
