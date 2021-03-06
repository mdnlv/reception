export default interface FormState {
    quotas: [{
        id: string
        step: number
        ticketNumber: number
        num: number
        status: string
        date: Date
        lpu: string
        registrationDate: Date
        endDate: Date
        note: string
        division: string
        mkb: string
        appeal: string
    }]
    surgery: [{
        date: Date
        time: string
        type: string
        lpu: string
        agent: string
        position: string
        fullName: string
        note: string
    }]
}
