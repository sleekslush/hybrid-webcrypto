import type { AesGcmOptions, AesKeyOptions } from "./aes"
import type { BufferedBytes } from "./global"
import type { RsaOaepOptions } from "./rsa"

export type HybridEncryptionOptions = {
  rsaOaepOptions?: RsaOaepOptions
  aesKeyOptions?: AesKeyOptions
  aesGcmOptions?: AesGcmOptions
}

export type HybridDecryptKeyOptions = {
  rsaOaepOptions?: RsaOaepOptions
  aesKeyOptions?: AesKeyOptions
}

export type HybridDecryptionOptions = HybridEncryptionOptions & {
  rsaKeyLength?: number
}

export type HybridEncryptedPayload = {
  encryptedKey: ArrayBuffer
  iv: BufferedBytes
  cipherText: BufferedBytes
}
