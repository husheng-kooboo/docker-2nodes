validationInfo = [
    'Voornaam is een verplicht veld.',
    'Achternaam is een verplicht veld.',
    'Postcode is een verplicht veld.',
    'Huisnummer is een verplicht veld.',
    'Om te registeren dien je akkoord te gaan met de algemene voorwaarden'
]

accountInfo = {
    email: `test${(new Date()).valueOf()}@test.com`,
    gender: 'male',
    firstName: 'leon',
    lastName: 'shane',
    telephone: '0201234567',
    postcode: '6511KL',
    houseNum: '25',
    houseNumExtension: '25',
    street: 'Broerstraat',
    city: 'Nijmegen',
    country: 'NL'
}

registeredAccountInfo = {
    email: 'testa7@test.com',
    password: '123456',
    gender: 'male',
    firstName: 'shane',
    lastName: 'leon',
    telephone: '0201234567',
    postcode: '1012PA',
    houseNum: '99',
    houseNumExtension: '99',
    street: 'Kalverstraat',
    city: 'Amsterdam',
    country: 'NL'
}

module.exports = {
    validationInfo,
    accountInfo,
    registeredAccountInfo
}