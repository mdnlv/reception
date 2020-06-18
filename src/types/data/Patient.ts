

export default interface Patient {
    fullName: string
    birthDate: Date
    code: string
    quotes: string[]
    medicalAttachment: string
    doc: string
    policyOMC: string
    regAddress: string
    livingAddress: string
    employment?: string
    phone?: Map<string, string>[]
    birthPlace?: string
    note?: string
    eisAcceptDate?: Date
    misRegDate?: Date
    medExamination: Date
}
