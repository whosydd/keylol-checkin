const puppeteer = require('puppeteer')
const mail = require('./mail')
require('dotenv').config()

const login = async url => {
  const browser = await puppeteer.launch({
    // headless: false, //当 headless 为 false 时显示浏览器窗口 默认为 true
    defaultViewport: {
      width: 1500,
      height: 800,
    },
  })
  try {
    const [page] = await browser.pages()

    await page.goto(url)

    // 登录页面加载
    await page.click('.btn-user-action')
    await page.waitForSelector('#cv_login_imgdiv', { visible: true })

    // login
    const username = process.env.LOGIN_USERNAME
    const password = process.env.LOGIN_PASSWORD
    await page.type('[placeholder="用户名/手机号/EMail"]', username)
    await page.type('[placeholder="密码"]', password)
    await page.click('.login_button')

    // 等待加载首页
    await page.waitForSelector('.avatar')
    // 点击头像进入统计信息页面
    await page.click('.avatar')

    // 处理cookie
    const cookies = await page.cookies()
    const cookie = cookies.reduce((pre, cur) => {
      pre += cur.name + '=' + cur.value + ';'
      return pre
    }, '')

    // 获取统计信息页面的url
    const info_url = page.url()

    return new Promise(async (resolve, reject) => {
      resolve({ info_url, cookie })
    })
  } catch (error) {
    // 出现错误时，发送邮件
    mail(error)
    await browser.close()
  } finally {
    if (browser != null) {
      await browser.close()
    }
  }
}

module.exports = {
  login,
}
