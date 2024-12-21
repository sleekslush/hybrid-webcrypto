import { describe, expect, test } from "@jest/globals"

import * as digest from "~encryption/digest"

describe("digest", () => {
  test("sha256", async () => {
    const data = new Uint8Array([1, 2, 3, 4, 5])
    const hash = await digest.sha256(data)
    expect(hash.byteLength).toEqual(32)
  })

  test("sha256Hex", async () => {
    const data = new Uint8Array([1, 2, 3, 4, 5])
    const hash = await digest.sha256Hex(data)
    expect(hash).toEqual("74f81fe167d99b4cb41d6d0ccda82278caee9f3e2f25d5e5a3936ff3dcec60d0")
  })

  test("sha384", async () => {
    const data = new Uint8Array([1, 2, 3, 4, 5])
    const hash = await digest.sha384(data)
    expect(hash.byteLength).toEqual(48)
  })

  test("sha384Hex", async () => {
    const data = new Uint8Array([1, 2, 3, 4, 5])
    const hash = await digest.sha384Hex(data)
    expect(hash).toEqual(
      "d88875db0f77aad8f3d994fe68cd1cc7ec3a4ff14378b7feb991e54784850192145854c36e5a40a0c2e80da2002d7cc8"
    )
  })

  test("sha512", async () => {
    const data = new Uint8Array([1, 2, 3, 4, 5])
    const hash = await digest.sha512(data)
    expect(hash.byteLength).toEqual(64)
  })

  test("sha512Hex", async () => {
    const data = new Uint8Array([1, 2, 3, 4, 5])
    const hash = await digest.sha512Hex(data)
    expect(hash).toEqual(
      "50540bc4ae31875fceb3829434c55e3c2b66ddd7227a883a3b4cc8f6cda965ad1712b3ee0008f9cee08da93f5234c1a7bf0e2570ef56d65280ffea691b953efe"
    )
  })
})
