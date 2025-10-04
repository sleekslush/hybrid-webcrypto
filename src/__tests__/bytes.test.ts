
import * as b from "../bytes"


const expectBuffersEqual = (a: ArrayBuffer, b: ArrayBuffer): boolean =>
  a.byteLength === b.byteLength &&
  new Uint8Array(a).every((val, i) => val === new Uint8Array(b)[i]);

describe("bytes", () => {
  test("get random bytes", () => {
    const randomLength = Math.floor(Math.random() * 1000)
    const bytes = b.getRandomBytes(randomLength)
    expect(bytes).toHaveLength(randomLength)
  })

  test.each([
    ["hello world", [104, 101, 108, 108, 111, 32, 119, 111, 114, 108, 100]],
    ["🤘", [240, 159, 164, 152]]
  ])("encodeStr / decodeBytes", (str, bytes) => {
    expect(b.encodeStr(str)).toEqual(new Uint8Array(bytes))
    expect(b.decodeBuf(new Uint8Array(bytes).buffer)).toEqual(str)
  })

  test.each([
    ["ZGlja3MgYmFsbHMgY29ja3M=", [100, 105, 99, 107, 115, 32, 98, 97, 108, 108, 115, 32, 99, 111, 99, 107, 115]]
  ])("bufFromB64 / b64FromBuf", (base64, bytes) => {
    const bytesBuf = new Uint8Array(bytes).buffer
    expectBuffersEqual(b.bufFromB64(base64), bytesBuf)
    expect(b.b64FromBuf(bytesBuf)).toEqual(base64)
  })

  test.each([["dicks balls cocks", [100, 105, 99, 107, 115, 32, 98, 97, 108, 108, 115, 32, 99, 111, 99, 107, 115]]])(
    "str2ab / ab2str",
    (str, bytes) => {
      const bytesBuf = new Uint8Array(bytes).buffer
      expect(b.ab2str(bytesBuf)).toEqual(str)
      expectBuffersEqual(b.str2ab(str), bytesBuf)
    }
  )

  test.each([
    ["aa", [170]],
    [
      "82a08f64ed1626b28308b6e83554cc7885d0d5bc8cd7b80ec73560bd93836294",
      [
        130, 160, 143, 100, 237, 22, 38, 178, 131, 8, 182, 232, 53, 84, 204, 120, 133, 208, 213, 188, 140, 215, 184, 14,
        199, 53, 96, 189, 147, 131, 98, 148
      ]
    ]
  ])("hexToBytes / bytesToHex / bufToHex", (hex, bytes) => {
    const byteArr = new Uint8Array(bytes)
    expect(b.hexToBytes(hex)).toEqual(byteArr)
    expect(b.bytesToHex(byteArr)).toEqual(hex)
    expect(b.bufToHex(byteArr.buffer)).toEqual(hex)
  })

  test.each([
    [[[]], []],
    [[[1]], [1]],
    [
      [[1, 2, 3], [4]],
      [1, 2, 3, 4]
    ],
    [
      [
        [1, 2],
        [4, 5, 6],
        [1, 2, 9, 10]
      ],
      [1, 2, 4, 5, 6, 1, 2, 9, 10]
    ]
  ])("concatByteArrays", (numberArrays, expected) => {
    const byteArrays = numberArrays.map((bytes) => new Uint8Array(bytes))
    const combined = b.concatByteArrays(...byteArrays)
    expect(combined).toEqual(new Uint8Array(expected))
  })

  test.each([
    [[[]], []],
    [[[1]], [1]],
    [
      [[1, 2, 3], [4]],
      [1, 2, 3, 4]
    ],
    [
      [
        [1, 2],
        [4, 5, 6],
        [1, 2, 9, 10]
      ],
      [1, 2, 4, 5, 6, 1, 2, 9, 10]
    ]
  ])("concatArrayBuffers", (numberArrays, expected) => {
    const byteArrays = numberArrays.map((bytes) => new Uint8Array(bytes))
    const buffers = byteArrays.map((bytes) => bytes.buffer)
    const combined = b.concatBuffers(...buffers)
    expect(combined).toEqual(new Uint8Array(expected))
  })
})
