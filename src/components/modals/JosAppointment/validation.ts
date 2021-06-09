import * as Yup from "yup";
import {FormikErrors} from "formik";


const validation = Yup.object<FormikErrors<any>>().shape({
    date:   Yup.date().required('Не выбрана дата'),
    patient: Yup.number().required('Не выбран пациент'),
    doctor: Yup.string().required('Не указан врач'),
    organisation: Yup.string().required('Не выбрана организация'),
    specialty: Yup.string().required('Не введена специальность'),
  })
export default validation

