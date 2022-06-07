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
  // 判断是否设置用户名密码
  if (!username || !password) {
    printLog({
      message: '请在环境变量中设置深澜账号信息',
      detail: '变量名："SRUN_ACCOUNT"，内容："用户名:密码"',
      level: 3
    })
    return
  }

  // 登录校园网
  const loginRes = await login(username, password)

  // 登录成功
  if (loginRes.error === 'ok') {
    const loginSuccessRes: LoginSuccessResponse = loginRes as LoginSuccessResponse
    printLog({ message: '客户端 IP 地址:', detail: loginSuccessRes.client_ip })
    printLog({ message: '登录提示信息:', detail: loginSuccessRes.suc_msg })
    printLog({ message: '登录成功', level: 1 })
    return
  }

  // 登录失败
  const loginFailureRes: LoginFailureResponse = loginRes as LoginFailureResponse
  printLog({ message: '客户端 IP 地址:', detail: loginFailureRes.client_ip })
  printLog({ message: '登录失败:', detail: loginFailureRes.error, level: 3 })
}

/**
 * 等待 N 秒后继续执行
 * @param {number} time - 等待时间，单位：秒
 * @param {string} [message] - 提示信息，`N 秒后[提示信息]`
 */
async function wait (time: number, message?: string): Promise<void> {
  for (time; time > 0; time--) {
    if (message) printLog({ message: `${time} 秒后${message || '继续'}`, rewrite: true })
    // 等待 1 秒
    await new Promise<void>(resolve => setTimeout(() => resolve(), 1000))
  }
  console.log()
}

// 程序主入口
(async function () {
  // 尝试 5 次登录校园网
  for (let loginTimes: number = 0; loginTimes < 5; loginTimes++) {
    try {
      // 登录校园网
      printLog({ message: '正在登录校园网...' })
      await loginToNetwork(USER_NAME, PASSWORD)
    } catch (error) {
      // 网络连接异常
      printLog({ message: '请求失败:', detail: (error as Error).message, level: 3 })
      continue
    }
    break
  }

  // 等待 5 秒后结束程序
  await wait(5, '自动关闭')
})()
