import {RootState} from "../../store";
import {createSelector} from "reselect";

const deferredSelector = (state: RootState) => state.deferredCalls
const persons = (state: RootState) => state.rb.rbPersons
const orgs = (state: RootState) => state.rb.rbOrgStructure
const specialties = (state: RootState) => state.rb.rbSpecialities
const statuses = (state: RootState) => state.rb.rbDeferredQueueStatus

export const detailedDeferredCalls = createSelector([orgs, persons, deferredSelector,specialties,statuses], (orgs, persons, calls,specialties,statuses) => {


  return calls.queue.map(item => {
      let person, org,specialty,status

      if(orgs.length > 0){
          org = orgs.find(org => org.id === item.orgId)
      }
      specialty = specialties.find(({id})=>id===item.specialityId)
      status = statuses.find(({id})=>id===item.status)


      return {
          key: item.id,
          code: item.clientId,
          createdDate: item.createdDate,
          fullName: item.fullName,
          comment: item.comment,
          maxDate: item.maxDate,
          person: item.person,
          netrica: item.netrica,
          status: status?.name,
          org: org ? org.name : '',
          contact: item.contact,
          birthday: item.birthday,
          specialty: specialty?.name
      }
  })
})
