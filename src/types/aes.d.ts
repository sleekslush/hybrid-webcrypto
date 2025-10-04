type AesEncryptionAlgorithm = "AES-GCM"

type AesKeyGenAlgorithm = AesEncryptionAlgorithm | "AES-KW"

type AesGcmOptions = Omit<AesGcmParams, "name" | "iv">

type AesEncryptOptions = AesGcmOptions & {
  name?: string
  ivLength?: number
}

type AesKeyOptions = {
  name?: AesKeyGenAlgorithm
  keyLength?: number
  extractable?: boolean
}

type AesKeyHashOptions = {
  hashAlgorithm?: AlgorithmIdentifier
} & AesKeyOptions

type AESEncryptedPayload = {
  iv: BufferedBytes
  cipherText: BufferedBytes
}

type AESKeyUsage = "encrypt" | "decrypt" | "wrapKey" | "unwrapKey"
