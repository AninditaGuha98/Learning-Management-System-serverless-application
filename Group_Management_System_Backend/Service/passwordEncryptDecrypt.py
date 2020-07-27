
def passwordEncrypt(password):
    encrypt = ''
    for value in password:
        value = (ord(value) + 15)
        if value - 15 == 32:
            value = 32
        elif value > ord('z'):
            value -= 26
        elif value < ord('a'):
            value += 26
        value = chr(value)
        encrypt = encrypt + value
    print(encrypt)
    return (encrypt)


def passwordDecrypt(password):
    decrypt=''
    for value in password:
        value = (ord(value) - 15)
        if value + 15 == 32:
            value = 32
        elif value > ord('z'):
            value -= 26
        elif value < ord('a'):
            value += 26
        value = chr(value)
        decrypt = decrypt + value
    print(decrypt)
    return (decrypt)
