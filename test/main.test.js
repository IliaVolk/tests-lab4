require("chromedriver")
var webdriver = require('selenium-webdriver'),
    By = webdriver.By,
    until = webdriver.until


var chai = require("chai"),
    expect = chai.expect

describe("start", ()=>{
    var driver,
        varName,
        varTitle
    before(()=>{
        driver = new webdriver.Builder()
            .forBrowser('chrome')
            .build();

    })
    it("3d news date should be 01/06/2016", (done)=>{
        driver.get("http://pma.fpm.kpi.ua/")
        var link = driver.findElement(By.css("[href='/uk/news']"))
        link.click()
        var dateText = driver.findElement(By.css(".views-row-3 .date b"))
        dateText.getText().then(text=>{
            expect(text).to.contain("01/06/2016")
            var title = driver.findElement(By.css(".views-row-3 h2 a"))
            title.getText().then(text=>{
                varName = text
                console.log(varName)
                title.click()
                var publishedInfo = driver.findElement(By.css(".submitted"))
                publishedInfo.getText().then(text=>{
                    expect(text).to.contain("Опубліковано")
                    expect(text).to.contain("01/06/2016")
                    var title = driver.findElement(By.css("#main h1"))
                    title.getText().then(text=>{
                        varTitle = text
                        console.log(varTitle)
                        expect(varName).to.equal(varTitle)
                        done()
                    })
                })
            })

        })
    })
    after(()=>{
        driver.quit()
    })
})