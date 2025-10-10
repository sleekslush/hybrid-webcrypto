import type {
  PEMKeyType,
  RsaArrayBufferPair,
  RsaEncryptionAlgorithm,
  RsaHashAlgorithm,
  RsaImportKeyParams,
  RsaImportPrivateKeyParams,
  RsaImportPublicKeyParams,
  RsaJsonWebKeyPair,
  RsaKeyPairParams,
  RsaKeyUsage,
  RsaOaepOptions,
  RsaPEMPair,
  RsaPrivateKeyUsage,
  RsaPublicKeyUsage,
  RsaSigningAlgorithm,
  RsaSigningKeyUsage,
  RsaSigningParams,
  RsaUnwrappedKeyOptions,
  RsaVerifyPayload,
  WrapKeys
} from "./types"
import { ab2str, str2ab } from "./bytes"

const RSA_ALGORITHM: RsaEncryptionAlgorithm = "RSA-OAEP"
const RSA_SIGNING_ALGORITHM: RsaSigningAlgorithm = "RSA-PSS"
const RSA_HASH: RsaHashAlgorithm = "SHA-256"
const RSA_KEY_EXTRACTABLE: boolean = true
const RSA_MODULUS_LENGTH: number = 4096
const RSA_PUBLIC_EXPONENT: BigInteger = new Uint8Array([1, 0, 1])
const RSA_PUBLIC_KEY_USAGES: RsaPublicKeyUsage[] = ["encrypt", "wrapKey"]
const RSA_PRIVATE_KEY_USAGES: RsaPrivateKeyUsage[] = ["decrypt", "unwrapKey"]
const RSA_KEY_PAIR_USAGES: RsaKeyUsage[] = [...RSA_PUBLIC_KEY_USAGES, ...RSA_PRIVATE_KEY_USAGES]
const RSA_SIGNING_SALT_LENGTH: number = 32
const RSA_SIGNING_KEY_USAGES: RsaSigningKeyUsage[] = ["sign", "verify"]

export async function encrypt(
  data: BufferSource,
  publicKey: CryptoKey,
  options?: RsaOaepOptions
): Promise<ArrayBuffer> {
  const algorithm: RsaOaepParams = {
    name: RSA_ALGORITHM,
    ...options
  }

  return await crypto.subtle.encrypt(algorithm, publicKey, data)
}

export async function decrypt(
  data: BufferSource,
  privateKey: CryptoKey,
  options?: RsaOaepOptions
): Promise<ArrayBuffer> {
  const algorithm: RsaOaepParams = {
    name: RSA_ALGORITHM,
    ...options
  }

  return await crypto.subtle.decrypt(algorithm, privateKey, data)
}

export async function importPrivateKeyJWK(
  keyData: JsonWebKey,
  { keyUsages = RSA_PRIVATE_KEY_USAGES, ...keyParams }: RsaImportPrivateKeyParams = {}
): Promise<CryptoKey> {
  return await importKeyJWK(keyData, keyUsages, keyParams)
}

export async function importPrivateKeyBytes(
  keyData: BufferSource,
  {
    name = RSA_ALGORITHM,
    keyUsages = RSA_PRIVATE_KEY_USAGES,
    hashAlgorithm = RSA_HASH,
    extractable = RSA_KEY_EXTRACTABLE
  }: RsaImportPrivateKeyParams = {}
): Promise<CryptoKey> {
  const algorithm: RsaHashedImportParams = {
    name,
    hash: hashAlgorithm
  }

  return await crypto.subtle.importKey("pkcs8", keyData, algorithm, extractable, keyUsages)
}

export async function importPrivateKeyPEM(pem: string): Promise<CryptoKey> {
  return await importPrivateKeyBytes(pemToArrayBuffer(pem, "PRIVATE"))
}

export async function importPublicKeyJWK(
  keyData: JsonWebKey,
  { keyUsages = RSA_PUBLIC_KEY_USAGES, ...keyParams }: RsaImportPublicKeyParams = {}
): Promise<CryptoKey> {
  return await importKeyJWK(keyData, keyUsages, keyParams)
}

export async function importPublicKeyBytes(
  keyData: ArrayBuffer,
  {
    name = RSA_ALGORITHM,
    keyUsages = RSA_PUBLIC_KEY_USAGES,
    hashAlgorithm = RSA_HASH,
    extractable = RSA_KEY_EXTRACTABLE
  }: RsaImportPublicKeyParams = {}
): Promise<CryptoKey> {
  const algorithm: RsaHashedImportParams = {
    name,
    hash: hashAlgorithm
  }

  return await crypto.subtle.importKey("spki", keyData, algorithm, extractable, keyUsages)
}

export async function importPublicKeyPEM(pem: string): Promise<CryptoKey> {
  return await importPublicKeyBytes(pemToArrayBuffer(pem, "PUBLIC"))
}

async function importKeyJWK(
  keyData: JsonWebKey,
  keyUsages: RsaKeyUsage[],
  { name = RSA_ALGORITHM, hashAlgorithm = RSA_HASH, extractable = RSA_KEY_EXTRACTABLE }: RsaImportKeyParams = {}
): Promise<CryptoKey> {
  const algorithm: RsaHashedImportParams = {
    name,
    hash: hashAlgorithm
  }

  return await crypto.subtle.importKey("jwk", keyData, algorithm, extractable, keyUsages)
}

export async function exportKeyJWK(key: CryptoKey): Promise<JsonWebKey> {
  return await crypto.subtle.exportKey("jwk", key)
}

export async function exportKeysJWK(keyPair: CryptoKeyPair): Promise<RsaJsonWebKeyPair> {
  const exportedKeyPromises = [keyPair.privateKey, keyPair.publicKey].map(exportKeyJWK)
  const [privateKey, publicKey] = await Promise.all(exportedKeyPromises)
  return { privateKey, publicKey }
}

export async function exportPrivateKeyPEM(key: CryptoKey): Promise<string> {
  const privateKey = await exportPrivateKeyBytes(key)
  return arrayBufferToPEM(privateKey, "PRIVATE")
}

export async function exportPublicKeyPEM(key: CryptoKey): Promise<string> {
  const publicKey = await exportPublicKeyBytes(key)
  return arrayBufferToPEM(publicKey, "PUBLIC")
}

export async function exportKeysPEM(keyPair: CryptoKeyPair): Promise<RsaPEMPair> {
  const [privateKey, publicKey] = await Promise.all([
    exportPrivateKeyPEM(keyPair.privateKey),
    exportPublicKeyPEM(keyPair.publicKey)
  ])

  return { privateKey, publicKey }
}

export async function exportPrivateKeyBytes(key: CryptoKey): Promise<ArrayBuffer> {
  return await crypto.subtle.exportKey("pkcs8", key)
}

export async function exportPublicKeyBytes(key: CryptoKey): Promise<ArrayBuffer> {
  return await crypto.subtle.exportKey("spki", key)
}

export async function exportKeysBytes(keyPair: CryptoKeyPair): Promise<RsaArrayBufferPair> {
  const [privateKey, publicKey] = await Promise.all([
    exportPrivateKeyBytes(keyPair.privateKey),
    exportPublicKeyBytes(keyPair.publicKey)
  ])

  return { privateKey, publicKey }
}

export async function generateKeyPair({
  name = RSA_ALGORITHM,
  hash = RSA_HASH,
  extractable = RSA_KEY_EXTRACTABLE,
  modulusLength = RSA_MODULUS_LENGTH,
  publicExponent = RSA_PUBLIC_EXPONENT,
  keyUsages = RSA_KEY_PAIR_USAGES
}: RsaKeyPairParams = {}): Promise<CryptoKeyPair> {
  const algorithm: RsaHashedKeyGenParams = {
    name,
    hash,
    modulusLength,
    publicExponent
  }

  return await crypto.subtle.generateKey(algorithm, extractable, keyUsages)
}

export async function generateSigningKeyPair({
  name = RSA_SIGNING_ALGORITHM,
  keyUsages = RSA_SIGNING_KEY_USAGES,
  ...keyParams
}: RsaKeyPairParams = {}): Promise<CryptoKeyPair> {
  return await generateKeyPair({ name, keyUsages, ...keyParams })
}

function arrayBufferToPEM(buf: ArrayBuffer, keyType: PEMKeyType): string {
  const exportedAsString = ab2str(buf)
  const exportedAsBase64 = btoa(exportedAsString)
  return `-----BEGIN ${keyType} KEY-----\n${exportedAsBase64}\n-----END ${keyType} KEY-----`
}

export function pemToArrayBuffer(pem: string, keyType: PEMKeyType): ArrayBuffer {
  const pemHeader = `-----BEGIN ${keyType} KEY-----`
  const pemFooter = `-----END ${keyType} KEY-----`
  const pemContents = pem.substring(pemHeader.length, pem.length - pemFooter.length)
  const binaryDerString = atob(pemContents)
  return str2ab(binaryDerString)
}

export async function wrapKeyAsRaw(wrapKeys: WrapKeys, options?: RsaOaepOptions): Promise<ArrayBuffer> {
  return await wrapKey("raw", wrapKeys, options)
}

export async function wrapKeyAsJWK(wrapKeys: WrapKeys, options?: RsaOaepOptions): Promise<ArrayBuffer> {
  return await wrapKey("jwk", wrapKeys, options)
}

export async function wrapKeyAsPrivate(wrapKeys: WrapKeys, options?: RsaOaepOptions): Promise<ArrayBuffer> {
  return await wrapKey("pkcs8", wrapKeys, options)
}

export async function wrapKeyAsPublic(wrapKeys: WrapKeys, options?: RsaOaepOptions): Promise<ArrayBuffer> {
  return await wrapKey("spki", wrapKeys, options)
}

export async function wrapKey(
  format: KeyFormat,
  { key, wrappingKey }: WrapKeys,
  options?: RsaOaepOptions
): Promise<ArrayBuffer> {
  const algorithm: RsaOaepParams = {
    name: RSA_ALGORITHM,
    ...options
  }

  return await crypto.subtle.wrapKey(format, key, wrappingKey, algorithm)
}

export async function unwrapRawKey(
  wrappedKey: BufferSource,
  unwrappingKey: CryptoKey,
  unwrappedKeyOptions: RsaUnwrappedKeyOptions,
  unwrapOptions?: RsaOaepOptions
): Promise<CryptoKey> {
  return await unwrapKey("raw", wrappedKey, unwrappingKey, unwrappedKeyOptions, unwrapOptions)
}

export async function unwrapJWKKey(
  wrappedKey: BufferSource,
  unwrappingKey: CryptoKey,
  unwrappedKeyOptions: RsaUnwrappedKeyOptions,
  unwrapOptions?: RsaOaepOptions
): Promise<CryptoKey> {
  return await unwrapKey("jwk", wrappedKey, unwrappingKey, unwrappedKeyOptions, unwrapOptions)
}

export async function unwrapPrivateKey(
  wrappedKey: BufferSource,
  unwrappingKey: CryptoKey,
  unwrappedKeyOptions: RsaUnwrappedKeyOptions,
  unwrapOptions?: RsaOaepOptions
): Promise<CryptoKey> {
  return await unwrapKey("pkcs8", wrappedKey, unwrappingKey, unwrappedKeyOptions, unwrapOptions)
}

export async function unwrapPublicKey(
  wrappedKey: BufferSource,
  unwrappingKey: CryptoKey,
  unwrappedKeyOptions: RsaUnwrappedKeyOptions,
  unwrapOptions?: RsaOaepOptions
): Promise<CryptoKey> {
  return await unwrapKey("spki", wrappedKey, unwrappingKey, unwrappedKeyOptions, unwrapOptions)
}

export async function unwrapKey(
  format: KeyFormat,
  wrappedKey: BufferSource,
  unwrappingKey: CryptoKey,
  {
    algorithm: unwrappedKeyAlgorithm,
    extractable: unwrappedKeyExtractable,
    keyUsages: unwrappedKeyUsages
  }: RsaUnwrappedKeyOptions,
  unwrapOptions?: RsaOaepOptions
): Promise<CryptoKey> {
  const unwrapAlgorithm: RsaOaepParams = {
    name: RSA_ALGORITHM,
    ...unwrapOptions
  }

  return await crypto.subtle.unwrapKey(
    format,
    wrappedKey,
    unwrappingKey,
    unwrapAlgorithm,
    unwrappedKeyAlgorithm,
    unwrappedKeyExtractable,
    unwrappedKeyUsages
  )
}

export async function sign(
  data: BufferSource,
  key: CryptoKey,
  { saltLength = RSA_SIGNING_SALT_LENGTH }: RsaSigningParams = {}
): Promise<ArrayBuffer> {
  const algorithm: RsaPssParams = {
    name: RSA_SIGNING_ALGORITHM,
    saltLength
  }

  return await crypto.subtle.sign(algorithm, key, data)
}

export async function verify(
  { data, signature }: RsaVerifyPayload,
  key: CryptoKey,
  { saltLength = RSA_SIGNING_SALT_LENGTH }: RsaSigningParams = {}
): Promise<boolean> {
  const algorithm: RsaPssParams = {
    name: RSA_SIGNING_ALGORITHM,
    saltLength
  }

  return await crypto.subtle.verify(algorithm, key, signature, data)
}
