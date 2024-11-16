import {config as configDotenv} from 'dotenv'
import {resolve} from 'path'

configDotenv({
    path: resolve(__dirname, ".env")
})
export interface IProcessEnv {
    APP_URL: string
}

declare global {
    namespace NodeJS {
        interface ProcessEnv extends IProcessEnv { }
    }
}