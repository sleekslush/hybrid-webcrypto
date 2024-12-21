type PEMKeyType = "PRIVATE" | "PUBLIC"

type RsaEncryptionAlgorithm = "RSA-OAEP"
type RsaSigningAlgorithm = "RSA-PSS"

type RsaKeyGenAlgorithm = RsaEncryptionAlgorithm | RsaSigningAlgorithm

type RsaHashAlgorithm = "SHA-256" | "SHA-384" | "SHA-512"

type RsaPublicKeyUsage = "encrypt" | "wrapKey"

type RsaPrivateKeyUsage = "decrypt" | "unwrapKey"

type RsaSigningKeyUsage = "sign" | "verify"

type RsaKeyUsage = RsaPublicKeyUsage | RsaPrivateKeyUsage | RsaSigningKeyUsage

type RsaOaepOptions = {
  label?: BufferSource
}

type RsaImportKeyParams = {
  name?: RsaKeyGenAlgorithm
  hashAlgorithm?: RsaHashAlgorithm
  extractable?: boolean
}

type RsaImportPublicKeyParams = RsaImportKeyParams & {
  keyUsages?: RsaPublicKeyUsage[]
}

type RsaImportPrivateKeyParams = RsaImportKeyParams & {
  keyUsages?: RsaPrivateKeyUsage[]
}

type RsaKeyPairParams = Partial<RsaKeyGenParams & RsaHashedImportParams & RsaImportKeyParams> & {
  keyUsages?: RsaKeyUsage[]
}

type RsaJsonWebKeyPair = {
  privateKey: JsonWebKey
  publicKey: JsonWebKey
}

type RsaArrayBufferPair = {
  privateKey: ArrayBuffer
  publicKey: ArrayBuffer
}

type RsaPEMPair = {
  privateKey: string
  publicKey: string
}

type RsaSigningParams = {
  saltLength?: number
}

type RsaVerifyPayload = {
  data: BufferSource
  signature: BufferSource
}

type RsaUnwrappedKeyOptions = {
  algorithm: RsaHashedImportParams | AesKeyGenAlgorithm
  extractable: boolean
  keyUsages: KeyUsage[]
}
