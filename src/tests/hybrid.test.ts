/**
 * @jest-environment node
 */

import { beforeAll, describe, expect, test } from "@jest/globals"

import * as aes from "~encryption/aes"
import { bufFromB64, decodeBuf, encodeStr, getRandomBytes } from "~encryption/bytes"
import * as hybrid from "~encryption/hybrid"
import * as rsa from "~encryption/rsa"

const privateKeyJWK = {
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
const publicKeyJWK = {
  alg: "RSA-OAEP-256",
  e: "AQAB",
  ext: true,
  key_ops: ["encrypt", "wrapKey"],
  kty: "RSA",
  n: "ujnkct31H-qFk3fOrpFxkyBCYUBQP4A4SN-vWNy0yu-v9TUTpQ8T7F06Z9kft-PiBRZYVZlcWjXzp6Ke5ATaXgLu4P55UD0kKfqm-9bA6dafVfEetAsBEljRh7U7Ydr36KUjdDCBrmPnpPrvaP4MZIERgqaRPNdCYkBgy0K2aFidtH2AY3qCnpNVoMACPvKwnRDr0pLNiu35dbpXqWqkclxIRgQeutAds8EQD347GbQSyR_XCSRYHVIpuPWZAEQC6HDONm8sRZXzeDmtC3Tyc4snQOCs4TaGLkousMw2g4RbdJOUBg85PsrJ8s5Hb3WswPJYC1gaVhPXpVb3tEEUpz2ZjhFhT2JKpojXUbaLXw-fJ-1QebexNUtyu6H5NX4z2kJAJilP4M0PH669_sYRStSD1d1TrwhykPEkyLV17kpvGER56ltrM0lbMbV_kF-IwnSuQlig8OD-UxDSDvz1vn3CU63bxBD6bFT2zwT_uFCzvDsQOCLVxMLg44ReVcvDOfikglVZ_k7Bn2Q3rgNW6uY0UJ7F-jwpiJQ94xbOGcUVSELo6ph7puu5nWp_ABfDjFo3wUYvsnhY6U0CJ-0dkFEGAdTqYRaUM0D9qD-7IzDkMONTprCZiwHPXQX_QryQivUKQ9e5xzfRBub7A8pmJMvI1blw1g6nipcelavQggc"
}
const b64EncodedEncryptedSecret =
  "QK1V5q3MF3ncTapbBexbkoa/0aJZvi9061YNkhO0UJBrY643Ef3Gh9XE9JVGbJyPDedR9SK7x5L8A3YIjsjdNqoX1voUpR8rg2EwTHtwOypZSKK+21FzeT+t/wwuvhoqC/f47lPbOiSidWqw/1UP5ALxzHLlrxkrDMhTnXGmtv/okXbZ0F/LT6f5wunxqqgqy2Q5MiCHYBU5S4Dn8+T9xtlqqlOdrVJab1ZXh2zAjf6poniHdHUz+fAWgFjJ8Je+WGyuRwR9hm5kMuTmQ+ihRNijF5iljRk4MNSBz5PdNkEWEuCHyVcygc8OClB+aBbRp5TxtScdsHj3DupeS80cjADBgvh74QiWlpXSYZ7thsVGK1TytWYZ5J8/yE0K0AEd4/5P9Oj39LWZl5EznOe2FJ41/9pl0m5Puzbwl2H6vG/iZA/b/LFQ5HsPLLXEbBv8hLotcTUjAZ7TIBiOcW3MsVNYjTw7V1dmv7uXtuJPiMLAT+DMPJBttlAubsRtBUJ0mlfeDepRw2JMW7n9Tsef7B9x+LQbuaSLeH0CtBctZxtihvFhPW74mw+V0Wz4rD51YT3Lszzoq3vfQyoouDRaMcYl82tKNqmvtgggCSu93fsP7sudXonQFnDED1WMZgsnSupMlTNv15k7Vxhns36o08jHR1mgd/vNrufPVB+LVUSOynPQIIWmPxyhRObNj12GUQSwlKuRWILg9HAmd2wt64lD98eUc66+gqzEPTA="

describe("hybrid", () => {
  let keyPair: CryptoKeyPair

  beforeAll(async () => {
    keyPair = await rsa.generateKeyPair()
  })

  test("encrypt", async () => {
    const data = getRandomBytes(1000)
    const { encryptedKey, iv, cipherText } = await hybrid.encrypt(data, keyPair.publicKey)
    expect(encryptedKey.byteLength).toEqual(512)
    expect(iv).toHaveLength(12)
    expect(cipherText.byteLength).toBeGreaterThan(0)
  })

  test("encrypt to bytes", async () => {
    const data = getRandomBytes(1000)
    const bytes = await hybrid.encryptToBytes(data, keyPair.publicKey)
    expect(bytes.length).toBeGreaterThan(512 + 12)
  })

  test("encrypt to base64", async () => {
    const data = getRandomBytes(4096)
    const publicKey = await rsa.importPublicKeyJWK(publicKeyJWK)
    const encoded = await hybrid.encryptToB64(data, publicKey)
    const bytes = bufFromB64(encoded)
    expect(bytes.byteLength).toBeGreaterThan(512 + 12)
  })

  test("decryptPayload", async () => {
    const secretText = "shh, this is so secret, bro"
    const data = encodeStr(secretText)
    const encryptedPayload = await hybrid.encrypt(data, keyPair.publicKey)
    const decryptedBuf = await hybrid.decryptPayload(encryptedPayload, keyPair.privateKey)
    const decoded = decodeBuf(decryptedBuf)
    expect(decoded).toEqual(secretText)
  })

  test("decrypt", async () => {
    const secretText = "shh, this is so secret, bro"
    const data = encodeStr(secretText)
    const encryptedPayload = await hybrid.encrypt(data, keyPair.publicKey)
    const combinedBytes = hybrid.encryptedPayloadToBytes(encryptedPayload)
    const decryptedBuf = await hybrid.decrypt(combinedBytes, keyPair.privateKey)
    const decoded = decodeBuf(decryptedBuf)
    expect(decoded).toEqual(secretText)
  })

  test("decrypt from base64", async () => {
    const privateKey = await rsa.importPrivateKeyJWK(privateKeyJWK)
    const decrypted = await hybrid.decryptFromB64(b64EncodedEncryptedSecret, privateKey)
    const decoded = decodeBuf(decrypted)
    expect(decoded).toEqual("balls dicks cocks")
  })

  test("decrypt encrypted key", async () => {
    const secretText = "shh, this is so secret, bro"
    const data = encodeStr(secretText)
    const encryptedPayload = await hybrid.encrypt(data, keyPair.publicKey)
    const decryptedKey = await hybrid.decryptEncryptedKey(encryptedPayload.encryptedKey, keyPair.privateKey)
    expect(decryptedKey).toBeInstanceOf(CryptoKey)
  })

  test("decrypt encrypted key raw", async () => {
    const key = await aes.generateKey(["encrypt", "decrypt"])
    const keyBuf = await aes.exportKeyRaw(key)
    const encryptedKey = await rsa.encrypt(keyBuf, keyPair.publicKey)
    const decryptedKey = await hybrid.decryptEncryptedKey(encryptedKey, keyPair.privateKey)
    const exportedBuf = await aes.exportKeyRaw(decryptedKey)
    expect(new Uint8Array(exportedBuf)).toEqual(new Uint8Array(keyBuf))
  })
})
