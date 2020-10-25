import forge from 'node-forge'

const AES_KEY = process.env.AES_KEY || '4c6f72656d20697073756d20646f6c6f'

export function decrypt(str: string): string {
    const trim = str.trim()
    const decode = Buffer.from(trim, 'base64')

    const ivData = decode.slice(0, 16)
    const ivParameterSpec = forge.util.createBuffer(ivData)

    const keyData = Buffer.from(AES_KEY, 'utf-8').slice(0, 16)

    const secretKeySpec = forge.util.createBuffer(keyData)

    const instance = forge.cipher.createDecipher('AES-CBC', secretKeySpec)
    instance.start({ iv: ivParameterSpec })
    instance.update(forge.util.createBuffer(decode.slice(16, decode.length)))
    instance.finish()
    const decrypted = instance.output.toString()

    const reversedBase64EncodedResult = decrypted.split('').reverse().join('')
    const reversedResult = Buffer.from(reversedBase64EncodedResult, 'base64').toString()
    const result = reversedResult.split('').reverse().join('')
    return result
}
