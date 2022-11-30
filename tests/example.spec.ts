import { test } from "@playwright/test";
import * as dotenv from "dotenv";
dotenv.config();

const username = process.env.LOGIN_USERNAME!;
const password = process.env.LOGIN_PASSWORD!;

test("test", async ({ page }) => {
  try {
    await page.goto("https://keylol.com/");
    await page.waitForTimeout(2000);
    await page
      .locator("#nav-user-action-bar")
      .getByRole("link", { name: "登录" })
      .click();

    await page.waitForTimeout(2000);
    await page.getByPlaceholder("用户名/手机号/EMail").fill(username);
    await page.getByRole("textbox", { name: "密码" }).fill(password);
    await page.waitForTimeout(1000);
    await page.locator(".login_button").click();

    await page.waitForTimeout(6000);
    await page.locator('a[href="suid-201529"]').click();

    await page.waitForTimeout(2000);
    const html = await page.content();

    const info = html.match(/<li><em>[积分|体力|蒸汽].*<\/li>/g);
    const [points, hp, steam] = info!.join("").match(/\d+/g)!;
    console.log(`当前积分为${points}, 体力为${hp}点, 蒸汽为${steam}克`);
  } catch (err) {}

  await await page.close();
});
