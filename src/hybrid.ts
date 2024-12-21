import * as aes from "./aes"
import { b64FromBuf, bufFromB64, concatArrayBuffers } from "./bytes"
import * as rsa from "./rsa"

const RSA_ENCRYPTED_KEY_LENGTH: number = 512
const RSA_ENCRYPTED_KEY_EXTRACTABLE: boolean = true

export async function encryptToB64(
  data: BufferSource,
  publicKey: CryptoKey,
  options?: HybridEncryptionOptions
): Promise<string> {
  const encryptedBytes = await encryptToBytes(data, publicKey, options)
  return b64FromBuf(encryptedBytes)
}

export async function encryptToBytes(
  data: BufferSource,
  publicKey: CryptoKey,
  options?: HybridEncryptionOptions
): Promise<Uint8Array> {
  const payload = await encrypt(data, publicKey, options)
  return encryptedPayloadToBytes(payload)
}

export async function encrypt(
  data: BufferSource,
  publicKey: CryptoKey,
  options?: HybridEncryptionOptions
): Promise<HybridEncryptedPayload> {
  const key = await aes.generateKey(["encrypt"], options?.aesKeyOptions)

  const [encryptedKey, { iv, cipherText }] = await Promise.all([
    rsa.wrapKeyAsRaw({ key, wrappingKey: publicKey }, options?.rsaOaepOptions),
    aes.encrypt(data, key, options?.aesGcmOptions)
  ])

  return { encryptedKey, iv, cipherText }
}

export async function decryptFromB64(
  b64encoded: string,
  privateKey: CryptoKey,
  options?: HybridDecryptionOptions
): Promise<ArrayBuffer> {
  const decodedEncryptedBuf = bufFromB64(b64encoded)
  return await decrypt(decodedEncryptedBuf, privateKey, options)
}

export async function decryptPayload(
  { encryptedKey, iv, cipherText }: HybridEncryptedPayload,
  privateKey: CryptoKey,
  options?: HybridDecryptionOptions
): Promise<ArrayBuffer> {
  const decryptedKey = await decryptEncryptedKey(encryptedKey, privateKey, options)
  return await aes.decryptPayload({ iv, cipherText }, decryptedKey, options?.aesGcmOptions)
}

export async function decrypt(
  data: ArrayBuffer,
  privateKey: CryptoKey,
  { rsaKeyLength = RSA_ENCRYPTED_KEY_LENGTH, ...options }: HybridDecryptionOptions = {}
): Promise<ArrayBuffer> {
  const encryptedKeyBuf = data.slice(0, rsaKeyLength)
  const decryptedKey = await decryptEncryptedKey(encryptedKeyBuf, privateKey, options)
  const encryptedDataBuf = data.slice(rsaKeyLength)
  return await aes.decrypt(encryptedDataBuf, decryptedKey, options?.aesGcmOptions)
}

export async function decryptEncryptedKey(
  encryptedKey: ArrayBuffer,
  privateKey: CryptoKey,
  {
    rsaOaepOptions,
    aesKeyOptions: { name = aes.AES_ALGORITHM, extractable = RSA_ENCRYPTED_KEY_EXTRACTABLE } = {}
  }: HybridDecryptKeyOptions = {}
): Promise<CryptoKey> {
  const unwrappedKeyAlgo: RsaUnwrappedKeyOptions = {
    algorithm: name,
    extractable,
    keyUsages: ["decrypt"]
  }

  return await rsa.unwrapRawKey(encryptedKey, privateKey, unwrappedKeyAlgo, rsaOaepOptions)
}

export function encryptedPayloadToBytes(payload: HybridEncryptedPayload): Uint8Array {
  return concatArrayBuffers(payload.encryptedKey, payload.iv, payload.cipherText)
}
