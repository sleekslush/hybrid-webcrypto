export type DigestAlgorithm = "SHA-256" | "SHA-384" | "SHA-512"
export type DigestFn = (data: BufferSource) => Promise<ArrayBuffer>
export type DigestHexFn = (data: BufferSource) => Promise<string>
