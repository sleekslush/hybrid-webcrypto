import { concatArrayBuffers, encodeStr, getRandomBytes, hexToBytes } from "./bytes"

export const AES_ALGORITHM: AesEncryptionAlgorithm = "AES-GCM"
const AES_KEYGEN_ALGORITHM: AesKeyGenAlgorithm = AES_ALGORITHM
const AES_IV_LENGTH: number = 12
const AES_TAG_LENGTH: number = 128
const AES_KEY_LENGTH: number = 256
const AES_KEY_EXTRACTABLE: boolean = true
const HASH_ALGORITHM: AlgorithmIdentifier = "SHA-256"

export async function encrypt(
  data: BufferSource,
  key: CryptoKey,
  { ivLength = AES_IV_LENGTH, tagLength = AES_TAG_LENGTH, ...aesParams }: AesEncryptOptions = {}
): Promise<AESEncryptedPayload> {
  const iv = getRandomBytes(ivLength)
  const algorithm: AesGcmParams = {
    name: AES_ALGORITHM,
    iv,
    tagLength,
    ...aesParams
  }
  const cipherText = await crypto.subtle.encrypt(algorithm, key, data)
  return { iv, cipherText }
}

export async function encryptStr(
  str: string,
  key: CryptoKey,
  options?: AesEncryptOptions
): Promise<AESEncryptedPayload> {
  const strBytes = encodeStr(str)
  return await encrypt(strBytes, key, options)
}

export async function encryptToBytes(
  data: BufferSource,
  key: CryptoKey,
  options?: AesEncryptOptions
): Promise<ArrayBuffer> {
  const { iv, cipherText } = await encrypt(data, key, options)
  return concatArrayBuffers(iv, cipherText)
}

export async function decrypt(
  data: ArrayBuffer,
  key: CryptoKey,
  { ivLength = AES_IV_LENGTH, ...aesParams }: AesEncryptOptions = {}
): Promise<ArrayBuffer> {
  const iv = data.slice(0, ivLength)
  const cipherText = data.slice(ivLength)
  return await decryptPayload({ iv, cipherText }, key, aesParams)
}

export async function decryptPayload(
  { iv, cipherText }: AESEncryptedPayload,
  key: CryptoKey,
  { tagLength = AES_TAG_LENGTH, ...aesParams }: AesGcmOptions = {}
): Promise<ArrayBuffer> {
  const algorithm: AesGcmParams = {
    name: AES_ALGORITHM,
    tagLength,
    iv,
    ...aesParams
  }

  return await crypto.subtle.decrypt(algorithm, key, cipherText)
}

export async function cryptoKeyFromStr(
  str: string,
  keyUsages: AESKeyUsage[],
  {
    name = AES_ALGORITHM,
    keyLength = AES_KEY_LENGTH,
    hashAlgorithm = HASH_ALGORITHM,
    extractable = AES_KEY_EXTRACTABLE
  }: AesKeyHashOptions = {}
): Promise<CryptoKey> {
  const strBytes = encodeStr(str)
  const keyMaterial = await crypto.subtle.importKey("raw", strBytes, "PBKDF2", false, ["deriveKey"])

  const algorithm: Pbkdf2Params = {
    name: "PBKDF2",
    salt: getRandomBytes(16),
    iterations: 100000,
    hash: hashAlgorithm
  }

  return await crypto.subtle.deriveKey(algorithm, keyMaterial, { name, length: keyLength }, extractable, keyUsages)
}

export async function cryptoKeyFromHex(
  hex: string,
  keyUsages: AESKeyUsage[],
  aesKeyOptions?: AesKeyOptions
): Promise<CryptoKey> {
  const bytes = hexToBytes(hex)
  return await cryptoKeyFromBuf(bytes, keyUsages, aesKeyOptions)
}

export async function cryptoKeyFromBuf(
  keyData: BufferSource,
  keyUsages: AESKeyUsage[],
  { name = AES_ALGORITHM, keyLength = AES_KEY_LENGTH, extractable = AES_KEY_EXTRACTABLE }: AesKeyOptions = {}
): Promise<CryptoKey> {
  const algorithm: AesKeyAlgorithm = {
    name,
    length: keyLength
  }

  return await crypto.subtle.importKey("raw", keyData, algorithm, extractable, keyUsages)
}

export async function cryptoKeyFromJWK(
  keyData: JsonWebKey,
  keyUsages: AESKeyUsage[],
  { name = AES_ALGORITHM, keyLength = AES_KEY_LENGTH, extractable = AES_KEY_EXTRACTABLE }: AesKeyOptions = {}
): Promise<CryptoKey> {
  const algorithm: AesKeyAlgorithm = {
    name,
    length: keyLength
  }

  return await crypto.subtle.importKey("jwk", keyData, algorithm, extractable, keyUsages)
}

export async function generateKey(
  keyUsages: AESKeyUsage[],
  { name = AES_KEYGEN_ALGORITHM, keyLength = AES_KEY_LENGTH, extractable = AES_KEY_EXTRACTABLE }: AesKeyOptions = {}
): Promise<CryptoKey> {
  const algorithm: AesKeyAlgorithm = {
    name,
    length: keyLength
  }

  return await crypto.subtle.generateKey(algorithm, extractable, keyUsages)
}

export async function exportKeyJWK(key: CryptoKey): Promise<JsonWebKey> {
  return await crypto.subtle.exportKey("jwk", key)
}

export async function exportKeyRaw(key: CryptoKey): Promise<ArrayBuffer> {
  return await crypto.subtle.exportKey("raw", key)
}
