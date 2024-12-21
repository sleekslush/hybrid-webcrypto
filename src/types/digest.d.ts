type DigestAlgorithm = "SHA-256" | "SHA-384" | "SHA-512"
type DigestFn = (data: BufferSource) => Promise<ArrayBuffer>
type DigestHexFn = (data: BufferSource) => Promise<string>
