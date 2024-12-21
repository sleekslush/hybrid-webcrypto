import { bufToHex } from "./bytes"

export const sha256 = getDigestFn("SHA-256")
export const sha256Hex = getDigestHexFn(sha256)

export const sha384 = getDigestFn("SHA-384")
export const sha384Hex = getDigestHexFn(sha384)

export const sha512 = getDigestFn("SHA-512")
export const sha512Hex = getDigestHexFn(sha512)

function getDigestFn(algorithm: DigestAlgorithm): DigestFn {
  return async (data: BufferSource) => await crypto.subtle.digest(algorithm, data)
}

function getDigestHexFn(digestFn: DigestFn): DigestHexFn {
  return async (data: BufferSource) => {
    const digest = await digestFn(data)
    return bufToHex(digest)
  }
}
