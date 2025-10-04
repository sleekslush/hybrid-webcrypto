type HybridEncryptionOptions = {
  rsaOaepOptions?: RsaOaepOptions
  aesKeyOptions?: AesKeyOptions
  aesGcmOptions?: AesGcmOptions
}

type HybridDecryptKeyOptions = {
  rsaOaepOptions?: RsaOaepOptions
  aesKeyOptions?: AesKeyOptions
}

type HybridDecryptionOptions = HybridEncryptionOptions & {
  rsaKeyLength?: number
}

type HybridEncryptedPayload = {
  encryptedKey: ArrayBuffer
  iv: BufferedBytes
  cipherText: BufferedBytes
}
