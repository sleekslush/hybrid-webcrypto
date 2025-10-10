import type { BufferedBytes } from "./global"

export type AesEncryptionAlgorithm = "AES-GCM"

export type AesKeyGenAlgorithm = AesEncryptionAlgorithm | "AES-KW"

export type AesGcmOptions = Omit<AesGcmParams, "name" | "iv">

export type AesEncryptOptions = AesGcmOptions & {
  name?: string
  ivLength?: number
}

export type AesKeyOptions = {
  name?: AesKeyGenAlgorithm
  keyLength?: number
  extractable?: boolean
}

export type AesKeyHashOptions = AesKeyOptions & {
  hashAlgorithm?: AlgorithmIdentifier
}

export type AESEncryptedPayload = {
  iv: BufferedBytes
  cipherText: BufferedBytes
}

export type AESKeyUsage = "encrypt" | "decrypt" | "wrapKey" | "unwrapKey"
