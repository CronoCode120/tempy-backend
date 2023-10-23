import { beforeAll, beforeEach, describe, expect, it, vi } from "vitest"
import { PostVoteController } from "./PostVoteController"

describe("PostVoteController", () => {
  let postVote
  let postVoteController
  beforeEach(() => {
    postVote = { execute: vi.fn(() => Promise.resolve()) }
    postVoteController = new PostVoteController(postVote)
  })

  it("calls PostVote use-case with the vote", async () => {
    const vote = {
      id: 1,
      temperature: 24,
      country: "Spain",
      like: true,
      comment: "I like it",
      unit: "Celsius",
    }
    const ctx = {
      request: {
        body: vote,
      },
    }

    await postVoteController.execute(ctx)

    expect(postVote.execute).toBeCalledWith(vote)
  })

  it.each([
    {
      id: 1,
      temperature: 24,
      country: "Spain",
      like: true,
      comment: "I like it",
      error: "Invalid unit parameter: undefined",
    },
    {
      id: 1,
      unit: "Celsius",
      temperature: "24",
      country: "Spain",
      like: true,
      comment: "I like it",
      error: "Invalid temperature parameter: string",
    },
    {
      id: 1,
      unit: "Celsius",
      temperature: 24,
      like: true,
      comment: "I like it",
      error: "Invalid country parameter: undefined",
    },
    {
      id: 1,
      unit: "Celsius",
      temperature: 24,
      country: "Spain",
      like: "true",
      comment: "I like it",
      error: "Invalid like parameter: string",
    },
    {
      id: 1,
      unit: "Celsius",
      temperature: 24,
      country: "Spain",
      like: true,
      comment: 123,
      error: "Invalid comment parameter: number",
    },
    {
      unit: "Celsius",
      temperature: 24,
      country: "Spain",
      like: true,
      comment: 123,
      error: "Invalid id parameter: undefined",
    },
  ])("throws error if a param is invalid", async ({ error, ...vote }) => {
    const ctx = {
      request: {
        body: vote,
      },
    }

    expect(postVoteController.execute(ctx)).rejects.toThrow(error)
  })
})
