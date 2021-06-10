import {RootState} from "../../store";
import {createSelector} from "reselect";

const deferredSelector = (state: RootState) => state.deferredCalls
const persons = (state: RootState) => state.rb.rbPersons
const orgs = (state: RootState) => state.rb.rbOrgStructure
const specialties = (state: RootState) => state.rb.rbSpecialities

export const detailedDeferredCalls = createSelector([orgs, persons, deferredSelector,specialties], (orgs, persons, calls,specialties) => {


  return calls.queue.map(item => {
      let person, org,specialty

      if(orgs.length > 0){
          org = orgs.find(org => org.id === item.orgId)
      }
      specialty = specialties.find(({id})=>id===item.specialityId)

      return {
          key: item.id,
          code: item.clientId,
          createdDate: item.createdDate,
          fullName: item.fullName,
          comment: item.comment,
          maxDate: item.maxDate,
          person: item.person,
          netrica: item.netrica,
          org: org ? org.name : '',
          contact: item.contact,
          birthday: item.birthday,
          specialty: specialty?.name
      }
  })
})
