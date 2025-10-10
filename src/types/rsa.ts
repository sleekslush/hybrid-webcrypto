import type { AesKeyGenAlgorithm } from "./aes"

export type PEMKeyType = "PRIVATE" | "PUBLIC"

export type RsaEncryptionAlgorithm = "RSA-OAEP"
export type RsaSigningAlgorithm = "RSA-PSS"

export type RsaKeyGenAlgorithm = RsaEncryptionAlgorithm | RsaSigningAlgorithm

export type RsaHashAlgorithm = "SHA-256" | "SHA-384" | "SHA-512"

export type RsaPublicKeyUsage = "encrypt" | "wrapKey"

export type RsaPrivateKeyUsage = "decrypt" | "unwrapKey"

export type RsaSigningKeyUsage = "sign" | "verify"

export type RsaKeyUsage = RsaPublicKeyUsage | RsaPrivateKeyUsage | RsaSigningKeyUsage

export type RsaOaepOptions = {
  label?: BufferSource
}

export type RsaImportKeyParams = {
  name?: RsaKeyGenAlgorithm
  hashAlgorithm?: RsaHashAlgorithm
  extractable?: boolean
}

export type RsaImportPublicKeyParams = RsaImportKeyParams & {
  keyUsages?: RsaPublicKeyUsage[]
}

export type RsaImportPrivateKeyParams = RsaImportKeyParams & {
  keyUsages?: RsaPrivateKeyUsage[]
}

export type RsaKeyPairParams = Partial<RsaKeyGenParams & RsaHashedImportParams & RsaImportKeyParams> & {
  keyUsages?: RsaKeyUsage[]
}

export type RsaJsonWebKeyPair = {
  privateKey: JsonWebKey
  publicKey: JsonWebKey
}

export type RsaArrayBufferPair = {
  privateKey: ArrayBuffer
  publicKey: ArrayBuffer
}

export type RsaPEMPair = {
  privateKey: string
  publicKey: string
}

export type RsaSigningParams = {
  saltLength?: number
}

export type RsaVerifyPayload = {
  data: BufferSource
  signature: BufferSource
}

export type RsaUnwrappedKeyOptions = {
  algorithm: RsaHashedImportParams | AesKeyGenAlgorithm
  extractable: boolean
  keyUsages: KeyUsage[]
}
