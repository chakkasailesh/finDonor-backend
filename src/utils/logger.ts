import winston from 'winston'

const log = winston.createLogger({
  level: 'info',
  format: winston.format.combine(
    winston.format.errors({ stack: true }),
    winston.format.timestamp(),
    winston.format.json()
  ),
  transports: [new winston.transports.Console()],
})

export default log
