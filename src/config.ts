// 深澜账号环境变量名称
const envName: string = 'SRUN_ACCOUNT'

// 从环境变量获取深澜账号
const SRUN_ACCOUNT: string[] = (process.env[envName] as string).split(':')

/** 用户名 */
export const USER_NAME: string = SRUN_ACCOUNT[0]

/** 密码 */
export const PASSWORD: string = SRUN_ACCOUNT[1]

/** 校园网登录网站地址 */
export const BASE_URL: string = 'http://192.168.254.240'
