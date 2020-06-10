
export interface PersonFeatureItem {
    bloodGroup: string
    note: string
    diagnose: string
    birthHeight: number
    birthWeight: number
    weekEmbryonic: number
}

export interface PersonAllergyItem {
    name: string
    degree: string
    fromDate: Date
    note: string
}

export interface MedIntoleranceItem {
    name: string
    degree: string
    fromDate: Date
}

export interface InspectionItem {
    class: string
    type: string
    startDate: Date
    endDate: Date
    note: string
}

export interface AnthropometricDataItem {
    setDate: Date
    height: number
    weight: number
    chestGirth: number
    waistGirth: number
    dailySendVolume: number
    bodyType: number
}


export default interface FormState {
    features: PersonFeatureItem[]
    allergy: PersonAllergyItem[]
    medIntolerance: MedIntoleranceItem[]
    inspections: InspectionItem[]
    anthropometricDate: AnthropometricDataItem[]
}
