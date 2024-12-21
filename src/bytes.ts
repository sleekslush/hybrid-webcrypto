export function b64FromBuf(buf: ArrayBuffer): string {
  const encoded = ab2str(buf)
  return btoa(encoded)
}

export function bufFromB64(str: string): ArrayBuffer {
  const decoded = atob(str)

  const buf = new Uint8Array(decoded.length)
  for (let i = 0; i < decoded.length; ++i) {
    buf[i] = decoded[i].charCodeAt(0)
  }

  return buf
}

export function str2ab(str: string): ArrayBuffer {
  const buf = new ArrayBuffer(str.length)
  const bufView = new Uint8Array(buf)
  for (let i = 0, strLen = str.length; i < strLen; i++) {
    bufView[i] = str.charCodeAt(i)
  }
  return buf
}

export function ab2str(buf: ArrayBuffer): string {
  return String.fromCharCode.apply(null, new Uint8Array(buf) as unknown as number[])
}

export function hexToBytes(hex: string): Uint8Array {
  const hexPairs = hex.match(/[0-9a-f]{2}/gi)
  if (hexPairs?.length !== hex.length / 2) {
    throw new Error("Invalid hex string")
  }
  return new Uint8Array(hexPairs.map((hexPair) => parseInt(hexPair, 16)))
}

export function bufToHex(buf: ArrayBuffer): string {
  return bytesToHex(new Uint8Array(buf))
}

export function bytesToHex(bytes: Uint8Array): string {
  return [...bytes].map((byte) => byte.toString(16).padStart(2, "0")).join("")
}

export function encodeStr(str: string): Uint8Array {
  return new TextEncoder().encode(str)
}

export function decodeBuf(buf: ArrayBuffer): string {
  return new TextDecoder().decode(buf)
}

export function getRandomBytes(length: number): Uint8Array {
  return crypto.getRandomValues(new Uint8Array(length))
}

export function concatArrayBuffers(...bufs: ArrayBuffer[]): Uint8Array {
  const byteArrays = bufs.map((buf) => new Uint8Array(buf))
  return concatByteArrays(...byteArrays)
}

export function concatByteArrays(...byteArrays: Uint8Array[]): Uint8Array {
  const combinedLength = sum(byteArrays, (byteArray) => byteArray.length)
  const combined = new Uint8Array(combinedLength)

  let offset = 0
  for (const byteArray of byteArrays) {
    combined.set(byteArray, offset)
    offset += byteArray.length
  }

  return combined
}

function sum<T>(arr: T[], fn: (item: T) => number): number {
  return arr.reduce((sum, item) => sum + fn(item), 0)
}
