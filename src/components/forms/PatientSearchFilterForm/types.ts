export interface FormState {
    disabilities: {
        docType: string
        startDate: Date
        endDate: Date
        serial: string
        number: string
        disabilityReason: string
    }
    authorAndDate: {
        isAuthor: boolean
        isLastChangedDate: boolean
        author: string
        createdDate: Date
    }
    lpuAndDoctor: {
        unit: string
        specialization: string
        state: string
        doctor: string
        insuranceMark: string
    }
    personalData: {
        ageFrom: number
        ageTo: number
        birthYear: number
        birthMonth: number
        hasAddress: boolean
    }
    outsideInd: {
        type: string
        ind: string
    }
    preventiveMeasures: {
        type: string
        year: number
        quarter: number
    }
    acceptRpfPeriod: {
        date: Date
        unprovedRpf: boolean
        oncologyForm: boolean
    }
    lpuAttachment: {
        organization: string
    }
}

type PartialFormState = Partial<FormState>

export default PartialFormState
