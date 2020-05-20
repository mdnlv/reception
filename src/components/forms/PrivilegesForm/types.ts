export default interface FormState {
    invalidity: [{
        isSomat: boolean
        fromDate: Date
        unlimited: boolean
        group: string
        nextDate: Date
        workPlace: string
        lossCapacityDegree: string
        firstly: boolean
        isHospital: boolean
        note: string
    }]
    privileges: [{
        type: string
        fromDate: Date
        toDate: Date
        endReason: string
    }]
}
