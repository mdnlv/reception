import Patient from "../../../types/data/Patient";
import {KladrDocType} from "../../../reduxStore/slices/registrationCard/types";
import {KladrItem, PrefixKladrItem} from "../wizards/RegCardWizard/pages/PassportGeneral/sections/Address/types";

export type FormProps = {
    patient: Patient;
    kladr: PrefixKladrItem[];
    isLoadingKladr: boolean;
    isLoadingKladrStreets: boolean;
};

export default interface FormState {
    code: string
    fullName: string
    birthDate: Date
    gender: string
    registration: string
    livingAddress: string
    birthPlace: string
    phone: string
    snils: string
    attachment: string
    passport: string
    oms: string
    doc: string
    features: string
    workPlace: string
    workSpecialization: string
}
