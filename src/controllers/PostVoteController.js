import { InvalidParamError } from "../errors/InvalidParamError.js"

export class PostVoteController {
  constructor(postVote) {
    this.postVote = postVote
  }

  execute = async ctx => {
    const voteParams = ctx.request.body
    console.log(ctx)
    const { id, temperature, country, like, comment, unit } = voteParams

    const checkParams = {
      id: typeof id !== "number",
      temperature: typeof temperature !== "number",
      country: typeof country !== "string",
      like: typeof like !== "boolean",
      unit: typeof unit !== "string",
      comment: typeof comment !== "string" && typeof comment !== "undefined",
    }

    for (let param in checkParams) {
      if (checkParams[param])
        throw new InvalidParamError(param, voteParams[param])
    }

    await this.postVote.execute({
      id,
      temperature,
      country,
      like,
      comment,
      unit,
    })
  }
}
