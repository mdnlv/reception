export default interface FormState {
    features: {
        bloodGroup: string
        note: string
        diagnose: string
        birthHeight: number
        birthWeight: number
        weekEmbryonic: number
    }
    allergy: {
        name: string
        degree: string
        fromDate: Date
        note: string
    }
    medIntolerance?: [{
        name: string
        degree: string
        fromDate: Date
    }]
    inspections?: [{
        class: string
        type: string
        startDate: Date
        endDate: Date
        note: string
    }]
}
