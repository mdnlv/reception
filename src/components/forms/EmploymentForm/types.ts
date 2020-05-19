export default interface FormState {
    employments: [
        {
            organization: string
            position: string
            experience: number
            inn: string
            ogrn: string
        }
    ]
    employmentOcvad: {
        number: string
        description: string
        address: string
    }
    hazardHistory: [{
        hazardDescription: string
        exp: number
    }]
    hazard: {
        hazardDescription: string
        exp: number
    }

}
