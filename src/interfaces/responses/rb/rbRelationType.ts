export default interface RbRelationTypeResponse {
    code: string,
    createDatetime?: string,
    createPerson_id?: string,
    id : number,
    isBackwardDonation: number,
    isBackwardEpidemic: number,
    isBackwardGenetic: number,
    isBackwardRepresentative: number,
    isDirectDonation: number,
    isDirectEpidemic: number,
    isDirectGenetic: number,
    isDirectRepresentative: number,
    leftName:string,
    leftSex:number,
    modifyDatetime?: string,
    modifyPerson_id?: string,
    netrica_Code: string,
    regionalCode:string ,
    regionalReverseCode: string,
    rightName: string,
    rightSex: number
  }
  