import {RootState} from "../../store";
import {createSelector} from "reselect";

const deferredSelector = (state: RootState) => state.deferredCalls
const persons = (state: RootState) => state.rb.rbPersons
const orgs = (state: RootState) => state.rb.rbOrganisations

export const detailedDeferredCalls = createSelector([orgs, persons, deferredSelector], (orgs, persons, calls) => {

    console.log(calls,'**')


  return calls.queue.map(item => {
      let person, org;
      if(persons.length > 0){
          person = persons.find(person => person.id === item.personId)
      }

      if(orgs.length > 0){
          org = orgs.find(org => org.id === item.id)
      }

      return {
          key: item.id,
          fullName: item.fullName,
          person: person ? `${person.lastName} ${person.firstName}` : '',
          netrica: item.netrica,
          org: org ? org.shortName : '',
          contact: item.contact
      }
  })
})
