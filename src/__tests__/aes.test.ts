
import type { AESKeyUsage } from "../types"
import * as aes from "../aes"
import { concatBuffers, decodeBuf, encodeStr, getRandomBytes } from "../bytes"

describe("aes", () => {
  test.each([[["encrypt"]], [["decrypt"]], [["encrypt", "decrypt"]]] as [AESKeyUsage[]][])(
    "get crypto key from string",
    async (keyUsages) => {
      const key = await aes.cryptoKeyFromStr("this is a test", keyUsages)
      expect(key).toBeInstanceOf(CryptoKey)
      expect(key).toMatchObject({
        type: "secret",
        extractable: true,
        algorithm: { name: "AES-GCM", length: 256 },
        usages: keyUsages
      })
    }
  )

  test.each([["82a08f64ed1626b28308b6e83554cc7885d0d5bc8cd7b80ec73560bd93836294"]])(
    "get crypto key from hex",
    async (hex: string) => {
      const key = await aes.cryptoKeyFromHex(hex, ["encrypt", "decrypt"])
      expect(key).toBeInstanceOf(CryptoKey)
      expect(key).toMatchObject({
        type: "secret",
        extractable: true,
        algorithm: { name: "AES-GCM", length: 256 },
        usages: ["encrypt", "decrypt"]
      })
    }
  )

  test.each([[["encrypt"]], [["decrypt"]], [["encrypt", "decrypt"]]] as [AESKeyUsage[]][])(
    "get crypto key from data",
    async (keyUsages) => {
      const keyData = getRandomBytes(32)
      const key = await aes.cryptoKeyFromBuf(keyData, keyUsages)
      expect(key).toBeInstanceOf(CryptoKey)
      expect(key).toMatchObject({
        type: "secret",
        extractable: true,
        algorithm: { name: "AES-GCM", length: 256 },
        usages: keyUsages
      })
    }
  )

  test.each([
    [42, ["encrypt"]],
    [69, ["decrypt"]],
    [420, ["encrypt", "decrypt"]]
  ] as [number, AESKeyUsage[]][])("invalid key length", async (length, keyUsages) => {
    const keyData = getRandomBytes(length)
    await expect(aes.cryptoKeyFromBuf(keyData, keyUsages)).rejects.toThrow()
  })

  test("encrypt data", async () => {
    const data = getRandomBytes(256)
    const key = await aes.generateKey(["encrypt"])
    const { iv, cipherText } = await aes.encrypt(data, key)
    expect(iv).toBeInstanceOf(Uint8Array)
    expect(iv).toHaveLength(12)
    expect(cipherText).toBeInstanceOf(ArrayBuffer)
    expect(cipherText.byteLength).toBeGreaterThan(0)
  })

  test("encrypt to bytes", async () => {
    const data = getRandomBytes(256)
    const key = await aes.generateKey(["encrypt", "decrypt"])
    const encrypted = await aes.encryptToBytes(data, key)
    const decrypted = await aes.decrypt(encrypted, key)
    expect(new Uint8Array(decrypted)).toEqual(data)
  })

  test("decrypt data", async () => {
    const secretText = "shh, this is so secret, bro"
    const data = encodeStr(secretText)
    const key = await aes.generateKey(["encrypt", "decrypt"])
    const { iv, cipherText } = await aes.encrypt(data, key)
    const combinedCipher = concatBuffers(iv, cipherText)
    const decrypted = await aes.decrypt(combinedCipher, key)
    expect(new Uint8Array(decrypted)).toEqual(data)
    const decoded = decodeBuf(decrypted)
    expect(decoded).toEqual(secretText)
  })

  test("decrypt payload", async () => {
    const secretText = "shh, this is so secret, bro"
    const data = encodeStr(secretText)
    const key = await aes.generateKey(["encrypt", "decrypt"])
    const encryptedPayload = await aes.encrypt(data, key)
    const decrypted = await aes.decryptPayload(encryptedPayload, key)
    expect(new Uint8Array(decrypted)).toEqual(data)
    const decoded = decodeBuf(decrypted)
    expect(decoded).toEqual(secretText)
  })
})
