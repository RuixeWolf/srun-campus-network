/*!
 * 深澜软件校园网自动登录工具
 */

import { USER_NAME, PASSWORD } from '@/config'
import { login } from '@srun/user'
import { LoginSuccessResponse, LoginFailureResponse } from '@interfaces/user'
import { printLog } from '@utils/printLog'

/**
 * 登录校园网
 * @param {string} username - 用户名
 * @param {string} password - 密码
 */
async function loginToNetwork (username: string, password: string) {
  printLog('正在登录校园网...')
  const loginRes = await login(username, password)

  // 登录成功
  if (loginRes.error === 'ok') {
    const loginSuccessRes: LoginSuccessResponse = loginRes as LoginSuccessResponse
    printLog('客户端 IP 地址:', loginSuccessRes.client_ip)
    printLog('登录提示信息:', loginSuccessRes.suc_msg)
    printLog('登录成功', undefined, 1)
    return
  }

  // 登录失败
  const loginFailureRes: LoginFailureResponse = loginRes as LoginFailureResponse
  printLog('客户端 IP 地址:', loginFailureRes.client_ip)
  printLog('登录失败:', loginFailureRes.error, 3)
}

// 程序主入口
(async function () {
  // 登录校园网
  await loginToNetwork(USER_NAME, PASSWORD)

  // 等待 5 秒
  await new Promise<void>(resolve => {
    setTimeout(() => resolve(), 5000)
  })
})()
