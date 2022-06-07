import chalk from 'chalk'
import process from 'process'

interface PrintingOptions {
  /** Printed message */
  message: string
  /** Message detail */
  detail?: string
  /**
   * Message level
   * + 0: Information
   * + 1: Done
   * + 2: Warning
   * + 3: Error
   */
  level?: number
  /** Rewrite current line */
  rewrite?: boolean
}

/**
 * Print log message
 * @param {PrintingOptions} options - Printing options
 */
export function printLog ({
  message = '',
  detail = '',
  level = 0,
  rewrite = false
}: PrintingOptions): void {
  // Init data
  let messageType: string
  const timeStr: string = `[${new Date().toLocaleTimeString()}]`

  // Handle message level
  switch (level) {
    case 0:
      // Information
      messageType = chalk.black.bgBlue(' INFO ')
      message = chalk.cyanBright(message)
      detail = chalk.cyan(detail)
      break

    case 1:
      // Done
      messageType = chalk.black.bgGreen(' DONE ')
      message = chalk.greenBright(message)
      detail = chalk.green(detail)
      break

    case 2:
      // Warning
      messageType = chalk.black.bgYellow(' WARN ')
      message = chalk.yellowBright(message)
      detail = chalk.yellow(detail)
      break

    case 3:
      // Error
      messageType = chalk.black.bgRed(' ERROR ')
      message = chalk.redBright(message)
      detail = chalk.red(detail)
      break

    default:
      // Default message type is Information
      messageType = chalk.black.bgBlue(' INFO ')
      message = chalk.cyanBright(message)
      detail = chalk.cyan(detail)
      break
  }

  // Print log message
  const content: string = `${messageType} ${timeStr} ${message} ${detail}`
  if (rewrite) {
    process.stdout.cursorTo(0)
    process.stdout.clearLine(0)
    process.stdout.write(content)
  } else {
    console.log(content)
  }
}
