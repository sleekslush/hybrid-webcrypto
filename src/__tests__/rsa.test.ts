import * as bytes from "../bytes"
import * as rsa from "../rsa"

const myPrivateKeyJWK = {
  alg: "RSA-OAEP-256",
  d: "VUGWzF3AUKXKFHrXlQUCJZSxvxs2AfReEELT4I9ed7_m4xAzF7CA8we1awC0rDf4bFLQCxREewpTK85gBs0P-dVG7puiB3GOYmed1hL5y7RVyv8yCsQ07-TYvFPkxUZ9k7Uyt4lTfXbAgL_fJkaUfti2HwXJ3TxBaIDHr5axsrDLNmv0gNaAAUA7hfYRsSbjY2zxQbyyvCV5vQOcCXRIqBCGiANv3B_WUUqUYztrrDdMGGbqyAUrD_VjI4nQy5XXbPnj9njMIGlnhwWEqweVzf8JcALMMukG4h9VI9zCIlDQm9zKekGy-APYE8CLZMRPXCA23a6uk_TOl6PqkEvxO12jyKPAPr8jOx5sFLBuqFxp6oE6YdS8jfxBhBXVlSbYzRILZ3fIskIxOmc16wdTFlBzIXmUACq9S2lSDE4Fx_nCffGPw0DTX-eE9AEIokt0zyz2KmrgjZ5R274HojggM29CB8YLPPTpGmOhzsxavpTA3rMqDPgOZEvmmqJGzIOERuRPSsoGzAwtRMO0cCGuqOb51gp3wsSnLVr-GVj9bw6fWfdqc98mFiKitX883eX1aQbMZj5ZEsuJiy-orWNovPfmAa7t_SB0EUPmQP2DsSR5S7TIErxwHGx-jZO8gLS2vwX0dNCdrw6oWLX-3Tnd8LyMn0NT2VpeWPMQ8mXi3H0",
  dp: "W27Qh9KSHXZgIFYEU81GSCIccl5Q1JTHNfsIXPCERbQ-Bo1h0cIg28thSkHBE3aMvmqCvauywHGj7f5kcSzTb7xZGa0i7G_ltjRY438guh0ywPcF-QhkQBL-xbtzJkYqDUJ8HRyz9lkiiIox2FgqlltCuIndHY5aWYXIcJh978ShRbRzzrXCn1vEVLjgYTsYEHIt2nZaMoL6DNf-6N6j2d-2SgKwsfCxvm4twAsU127ZLkP4fXK8dpUzMAlZKBjLD17dtEcmdAoDHE9q436h_pquOSqhCNcCaMZBwq5BPuB1zIyr7MaZG_2TxkQ71vKNngA5_ALWFj3Yt8nzCqwf-Q",
  dq: "ZXZlhMPz7rtapcrAOYNtzxXfVSal6Cy1bRhQH7gpL-PfvHRRKLu6FzrK_uQElhu7ZM47pMSvgpfAgNItn4hl9uk6ZyohkMmCN8MhGkeo8P0v3C1bpXPW-Mtr5DiabPP77ul3TJ5uy75eOWvorT9SYsoI4V9briYcbPMvbaUM1FmBm8pGDcT1MDGCPkmC4enWtVSD1DxGyVYdNsEMC7uKPc37n2SG-zYCRwZy5Cp_woqSHN7GUIbNAenHryWH6Q8LAv8U_4Qce_y7kkR2erL4aPvXXK7Xqs7XA1xuZqK3WVsEbxU_a8P1VxRmGMZZLdIF8S7JjeQKkoPRYNfywVVrcw",
  e: "AQAB",
  ext: true,
  key_ops: ["decrypt", "unwrapKey"],
  kty: "RSA",
  n: "ujnkct31H-qFk3fOrpFxkyBCYUBQP4A4SN-vWNy0yu-v9TUTpQ8T7F06Z9kft-PiBRZYVZlcWjXzp6Ke5ATaXgLu4P55UD0kKfqm-9bA6dafVfEetAsBEljRh7U7Ydr36KUjdDCBrmPnpPrvaP4MZIERgqaRPNdCYkBgy0K2aFidtH2AY3qCnpNVoMACPvKwnRDr0pLNiu35dbpXqWqkclxIRgQeutAds8EQD347GbQSyR_XCSRYHVIpuPWZAEQC6HDONm8sRZXzeDmtC3Tyc4snQOCs4TaGLkousMw2g4RbdJOUBg85PsrJ8s5Hb3WswPJYC1gaVhPXpVb3tEEUpz2ZjhFhT2JKpojXUbaLXw-fJ-1QebexNUtyu6H5NX4z2kJAJilP4M0PH669_sYRStSD1d1TrwhykPEkyLV17kpvGER56ltrM0lbMbV_kF-IwnSuQlig8OD-UxDSDvz1vn3CU63bxBD6bFT2zwT_uFCzvDsQOCLVxMLg44ReVcvDOfikglVZ_k7Bn2Q3rgNW6uY0UJ7F-jwpiJQ94xbOGcUVSELo6ph7puu5nWp_ABfDjFo3wUYvsnhY6U0CJ-0dkFEGAdTqYRaUM0D9qD-7IzDkMONTprCZiwHPXQX_QryQivUKQ9e5xzfRBub7A8pmJMvI1blw1g6nipcelavQggc",
  p: "23rQfEAUQPc4OpFOWWSOMzMu1My9bz2G_iCApY_BMpUMRaTTTZTeZL6Uim1cyJStZrRN3XEkXSHQxqfdMKOSOVhkRguh8tyYaIMdKOahBtNRul4Ew4sHj9lIVoK31ce0uB--SPUm52zCEuj5hDXPylh822FmoX9jv0Pi4TwXGzwmun9_m5KRnEFe6iBXQnmlOuzDE6yN7q7cMs2IZnHNG86RbbJZfwdKwsUiqHL3Jz9fcgyNj_-kkl2YWAhWbaZG2eSOLcQNiD8T6z7CbEuW4ZHjkZbQrkFUQZFEcHHBmZYDYpI978iLsrl3jNr7b29rB5zCBdvTc9aCFmqVDmnUlQ",
  q: "2TaSwRFswnAeYc1j-bVibA6ats2gAX5g5w13I-cFQqqB57uKqq9q-OQUYpGE59fwjPii7QL4k5MUauUI51KTOUSKlgKhxWek9cz6wHXFN6LzG657M9nwCHMKLJN4EqbWp7ZlOE1dVbu6hd4MmoE6-zqCZjU-haFgDT4tlRTikUaFMP6it5TI16x2cbXvYyjjpxV1m4jGzk82vVQKgoBHqSqEsLd-AwCFxknStsxcdszEx97HCZWXl6BYyJveTeETgowSN-uyKb0llLW9PmvRb_va6JQV20a8jvXBBdrNu92g5ycIJShXZXntGAu5SdebegGLe6-Ol8xz8VOc5hpZKw",
  qi: "znaKLoa9xeNzsrAwP0cS9OM-c9-OJ5Xg9D58eOCRAuwUK89bG6JwMJp7AKw1pRPQNXm2AU6DZH0XZ6cbai0qGJ68zqCIEkkSd8RfUQShwNAHHnG1O13Dx1Ie0PabcSHHgkEFFPtnaat3qSrVK-ukA_pDSLfdHnyjF7INgHdRcQdFTNv7Cyruv_lZK3-rOkHobGaCmRqqyrCsCa6I9XPUkK-pLQcfEjgprwFqF2t9FkaLi6K01FnQDgreCofReosS7l821yBfrUCX-F-o1Zk1Bj38EGMbsEewQHNs_Vu45tRsMP_IOpHtgoh8kbrieIpld10RqlLRJzJyeAcH4sy2cg"
}
const myPublicKeyJWK = {
  alg: "RSA-OAEP-256",
  e: "AQAB",
  ext: true,
  key_ops: ["encrypt", "wrapKey"],
  kty: "RSA",
  n: "ujnkct31H-qFk3fOrpFxkyBCYUBQP4A4SN-vWNy0yu-v9TUTpQ8T7F06Z9kft-PiBRZYVZlcWjXzp6Ke5ATaXgLu4P55UD0kKfqm-9bA6dafVfEetAsBEljRh7U7Ydr36KUjdDCBrmPnpPrvaP4MZIERgqaRPNdCYkBgy0K2aFidtH2AY3qCnpNVoMACPvKwnRDr0pLNiu35dbpXqWqkclxIRgQeutAds8EQD347GbQSyR_XCSRYHVIpuPWZAEQC6HDONm8sRZXzeDmtC3Tyc4snQOCs4TaGLkousMw2g4RbdJOUBg85PsrJ8s5Hb3WswPJYC1gaVhPXpVb3tEEUpz2ZjhFhT2JKpojXUbaLXw-fJ-1QebexNUtyu6H5NX4z2kJAJilP4M0PH669_sYRStSD1d1TrwhykPEkyLV17kpvGER56ltrM0lbMbV_kF-IwnSuQlig8OD-UxDSDvz1vn3CU63bxBD6bFT2zwT_uFCzvDsQOCLVxMLg44ReVcvDOfikglVZ_k7Bn2Q3rgNW6uY0UJ7F-jwpiJQ94xbOGcUVSELo6ph7puu5nWp_ABfDjFo3wUYvsnhY6U0CJ-0dkFEGAdTqYRaUM0D9qD-7IzDkMONTprCZiwHPXQX_QryQivUKQ9e5xzfRBub7A8pmJMvI1blw1g6nipcelavQggc"
}
const myPrivateKeyPEM =
  "-----BEGIN PRIVATE KEY-----\n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\n-----END PRIVATE KEY-----"
const myPrivateKeyBuf = rsa.pemToArrayBuffer(myPrivateKeyPEM, "PRIVATE")
const myPublicKeyPEM =
  "-----BEGIN PUBLIC KEY-----\nMIICIjANBgkqhkiG9w0BAQEFAAOCAg8AMIICCgKCAgEAujnkct31H+qFk3fOrpFxkyBCYUBQP4A4SN+vWNy0yu+v9TUTpQ8T7F06Z9kft+PiBRZYVZlcWjXzp6Ke5ATaXgLu4P55UD0kKfqm+9bA6dafVfEetAsBEljRh7U7Ydr36KUjdDCBrmPnpPrvaP4MZIERgqaRPNdCYkBgy0K2aFidtH2AY3qCnpNVoMACPvKwnRDr0pLNiu35dbpXqWqkclxIRgQeutAds8EQD347GbQSyR/XCSRYHVIpuPWZAEQC6HDONm8sRZXzeDmtC3Tyc4snQOCs4TaGLkousMw2g4RbdJOUBg85PsrJ8s5Hb3WswPJYC1gaVhPXpVb3tEEUpz2ZjhFhT2JKpojXUbaLXw+fJ+1QebexNUtyu6H5NX4z2kJAJilP4M0PH669/sYRStSD1d1TrwhykPEkyLV17kpvGER56ltrM0lbMbV/kF+IwnSuQlig8OD+UxDSDvz1vn3CU63bxBD6bFT2zwT/uFCzvDsQOCLVxMLg44ReVcvDOfikglVZ/k7Bn2Q3rgNW6uY0UJ7F+jwpiJQ94xbOGcUVSELo6ph7puu5nWp/ABfDjFo3wUYvsnhY6U0CJ+0dkFEGAdTqYRaUM0D9qD+7IzDkMONTprCZiwHPXQX/QryQivUKQ9e5xzfRBub7A8pmJMvI1blw1g6nipcelavQggcCAwEAAQ==\n-----END PUBLIC KEY-----"
const myPublicKeyBuf = rsa.pemToArrayBuffer(myPublicKeyPEM, "PUBLIC")


const expectBuffersEqual = (a: ArrayBuffer, b: ArrayBuffer): boolean =>
  a.byteLength === b.byteLength &&
  new Uint8Array(a).every((val, i) => val === new Uint8Array(b)[i]);

describe("rsa", () => {
  let myKeyPair: CryptoKeyPair
  let theirKeyPair: CryptoKeyPair
  let signingKeyPair: CryptoKeyPair

  beforeAll(async () => {
    const keyPairs = await Promise.all([
      {
        privateKey: await rsa.importPrivateKeyBytes(myPrivateKeyBuf),
        publicKey: await rsa.importPublicKeyBytes(myPublicKeyBuf)
      } as CryptoKeyPair,
      rsa.generateKeyPair(),
      rsa.generateSigningKeyPair()
    ])

    ;[myKeyPair, theirKeyPair, signingKeyPair] = keyPairs
  })

  test("generates private/public key pair", () => {
    expect(myKeyPair.privateKey).not.toBeUndefined()
    expect(myKeyPair.publicKey).not.toBeUndefined()
  })

  test("export private jwk", async () => {
    const key = await rsa.exportKeyJWK(myKeyPair.privateKey)
    expect(key).toMatchObject(myPrivateKeyJWK)
  })

  test("export public jwk", async () => {
    const key = await rsa.exportKeyJWK(myKeyPair.publicKey)
    expect(key).toMatchObject(myPublicKeyJWK)
  })

  test("exports jwk", async () => {
    const { privateKey, publicKey } = await rsa.exportKeysJWK(myKeyPair)
    expect(privateKey).toMatchObject(myPrivateKeyJWK)
    expect(publicKey).toMatchObject(myPublicKeyJWK)
  })

  test("exports private key bytes", async () => {
    const keyBuf = await rsa.exportPrivateKeyBytes(myKeyPair.privateKey)
    expectBuffersEqual(keyBuf, myPrivateKeyBuf)
  })

  test("exports public key bytes", async () => {
    const keyBuf = await rsa.exportPublicKeyBytes(myKeyPair.publicKey)
    expectBuffersEqual(keyBuf, myPublicKeyBuf)
  })

  test("exports bytes", async () => {
    const { privateKey, publicKey } = await rsa.exportKeysBytes(myKeyPair)
    expectBuffersEqual(privateKey, myPrivateKeyBuf)
    expectBuffersEqual(publicKey, myPublicKeyBuf)
  })

  test("exports private PEM", async () => {
    const pem = await rsa.exportPrivateKeyPEM(myKeyPair.privateKey)
    expect(pem).toEqual(myPrivateKeyPEM)
  })

  test("exports public PEM", async () => {
    const pem = await rsa.exportPublicKeyPEM(myKeyPair.publicKey)
    expect(pem).toEqual(myPublicKeyPEM)
  })

  test("exports PEM", async () => {
    const { privateKey, publicKey } = await rsa.exportKeysPEM(myKeyPair)
    expect(privateKey).toEqual(myPrivateKeyPEM)
    expect(publicKey).toEqual(myPublicKeyPEM)
  })

  test("import public jwk", async () => {
    const key = await rsa.importPublicKeyJWK(myPublicKeyJWK)
    expect(key).toBeInstanceOf(CryptoKey)
  })

  test("import private jwk", async () => {
    const key = await rsa.importPrivateKeyJWK(myPrivateKeyJWK)
    expect(key).toBeInstanceOf(CryptoKey)
  })

  test("import public pem", async () => {
    const key = await rsa.importPublicKeyPEM(myPublicKeyPEM)
    expect(key).toBeInstanceOf(CryptoKey)
  })

  test("import private key bytes", async () => {
    const key = await rsa.importPrivateKeyBytes(myPrivateKeyBuf)
    expect(key).toBeInstanceOf(CryptoKey)
  })

  test("import public key bytes", async () => {
    const key = await rsa.importPublicKeyBytes(myPublicKeyBuf)
    expect(key).toBeInstanceOf(CryptoKey)
  })

  test("import private pem", async () => {
    const key = await rsa.importPrivateKeyPEM(myPrivateKeyPEM)
    expect(key).toBeInstanceOf(CryptoKey)
  })

  test("encrypt/decrypt data", async () => {
    const data = bytes.getRandomBytes(256)
    const encrypted = await rsa.encrypt(data, myKeyPair.publicKey)
    const decrypted = await rsa.decrypt(encrypted, myKeyPair.privateKey)
    expect(new Uint8Array(decrypted)).toEqual(data)
  })

  test("encrypt/decrypt data fails", async () => {
    const data = bytes.getRandomBytes(256)
    const encrypted = await rsa.encrypt(data, myKeyPair.publicKey)
    await expect(rsa.decrypt(encrypted, theirKeyPair.privateKey)).rejects.toThrow()
  })

  test("import jwk and encrypt/decrypt", async () => {
    const [privateKey, publicKey] = await Promise.all([
      rsa.importPrivateKeyJWK(myPrivateKeyJWK),
      rsa.importPublicKeyJWK(myPublicKeyJWK)
    ])

    const data = bytes.getRandomBytes(256)
    const encrypted = await rsa.encrypt(data, publicKey)
    const decrypted = await rsa.decrypt(encrypted, privateKey)
    expect(new Uint8Array(decrypted)).toEqual(data)
  })

  test("import pem and encrypt/decrypt", async () => {
    const [privateKey, publicKey] = await Promise.all([
      rsa.importPrivateKeyPEM(myPrivateKeyPEM),
      rsa.importPublicKeyPEM(myPublicKeyPEM)
    ])

    const data = bytes.getRandomBytes(256)
    const encrypted = await rsa.encrypt(data, publicKey)
    const decrypted = await rsa.decrypt(encrypted, privateKey)
    expect(new Uint8Array(decrypted)).toEqual(data)
  })

  test("base64 encode encrypted content", async () => {
    const data = bytes.getRandomBytes(256)
    const encrypted = await rsa.encrypt(data, myKeyPair.publicKey)
    const encoded = bytes.b64FromBuf(encrypted)
    const decoded = bytes.bufFromB64(encoded)
    expectBuffersEqual(encrypted, decoded)
  })

  test("sign / verify", async () => {
    const data = bytes.getRandomBytes(256)
    const signature = await rsa.sign(data, signingKeyPair.privateKey)
    expect(signature.byteLength).toBe(512)
    const verified = await rsa.verify({ data, signature }, signingKeyPair.publicKey)
    expect(verified).toBe(true)
  })

  test("wrap / unwrap raw key", async () => {})

  test("wrap / unwrap jwk key", async () => {})

  test("wrap / unwrap private key", async () => {})

  test("wrap / unwrap public key", async () => {})
})
