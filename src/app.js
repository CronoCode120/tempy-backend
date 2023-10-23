import Koa from "koa"
import Router from "@koa/router"
import cors from "@koa/cors"
import { GetCurrentTemperature } from "./use-cases/GetCurrentTemperature.js"
import { PositionServiceIpApi } from "./services/PositionServiceIpApi.js"
import { TemperatureServiceOpenMeteo } from "./services/TemperatureServiceOpenMeteo.js"
import { GetTemperatureController } from "./controllers/GetTemperatureController.js"
import { PostVoteController } from "./controllers/PostVoteController.js"
import { InvalidIpError } from "./errors/InvalidIpError.js"
import { InvalidParamError } from "./errors/InvalidParamError.js"

const app = new Koa()
const router = new Router()

const positionService = new PositionServiceIpApi()
const temperatureService = new TemperatureServiceOpenMeteo()
const getCurrentTemperature = new GetCurrentTemperature(
  positionService,
  temperatureService
)
const getTemperatureController = new GetTemperatureController(
  getCurrentTemperature
)
const postVoteController = new PostVoteController()

router.get("/temperature", getTemperatureController.execute)
router.post("/temperature/vote", postVoteController.execute)

app
  .use(async (ctx, next) => {
    try {
      await next()
    } catch (error) {
      handleError(ctx, error)
    }
  })
  .use(cors())
  .use(router.routes())
  .use(router.allowedMethods())

function handleError(ctx, error) {
  switch (error.constructor) {
    case InvalidIpError:
      ctx.response.status = 400
      ctx.body = {
        error: {
          message: error.message,
        },
      }
      break
    case InvalidParamError:
      ctx.response.status = 400
      ctx.body = {
        error: {
          message: error.message,
        },
      }
      break
    default:
      throw error
  }
}

export default app
