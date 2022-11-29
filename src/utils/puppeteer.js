const puppeteer = require('puppeteer')
require('dotenv').config()

const login = async url => {
  const browser = await puppeteer.launch({
    // headless: false, //当 headless 为 false 时显示浏览器窗口 默认为 true
    defaultViewport: {
      width: 1500,
      height: 800,
    },
    args: ['--no-sandbox', '--disable-setuid-sandbox'],
  })
  try {
    const [page] = await browser.pages()

    await page.goto(url)

    // 登录页面加载
    await page.click('.btn-user-action')
    await page.waitForSelector('[placeholder="用户名/手机号/EMail"]')

    // login
    const username = process.env.LOGIN_USERNAME
    const password = process.env.LOGIN_PASSWORD
    await page.type('[placeholder="用户名/手机号/EMail"]', username)
    await page.type('[placeholder="密码"]', password)
    await page.click('.login_button')

    await page.waitForSelector('#nav-logo')
    const cookies = await page.cookies()
    const cookie = cookies.reduce((pre, cur) => {
      pre += cur.name + '=' + cur.value + ';'
      return pre
    }, '')

    return new Promise((resolve, reject) => {
      resolve({ cookie, err: null })
    })
  } catch (err) {
    console.log('pptr_err:', err)
    return new Promise((resolve, reject) => {
      resolve({ cookie: null, err })
    })
  } finally {
    if (browser != null) {
      await browser.close()
    }
  }
}

module.exports = {
  login,
}
