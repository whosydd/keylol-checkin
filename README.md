# keylol-checkin

## 已知问题

### puppeteer

- 本地可以正常运行，但是使用 github actions 却会报 `TimeoutError: Waiting for selector '#nav-logo' failed: Waiting failed: 30000ms exceeded` 的错误，所以此项目**暂时**需要手动登录后获取 `cookie` 

## 配置项

登录信息敏感，需要在 `secrets` 中配置相关环境变量

- `LOGIN_URL` ：https://keylol.com
- `LOGIN_USERNAME` ：用户名
- `LOGIN_PASSWORD` ：密码
- `UID` ：可以在 `个人资料` 页面找到
- `SEND_MAIL` ：发送邮件的邮箱，默认使用 QQ 邮箱
- `RECEIVE_MAIL` ：接收邮件的邮箱
- `TOKEN` ：这是 smtp 授权码
- `COOKIE` ：手动登录网站后获取

## 使用

github actions 默认北京时间每天中午 12 点执行一次，如果想要更改时间，可以编辑 `.github/workflows/checkin.yml`中的`schedule`字段，[如果你一头雾水，这个链接可能对你有帮助](https://crontab.guru/#00_12_*_*_*)
