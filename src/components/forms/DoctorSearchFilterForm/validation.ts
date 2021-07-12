import * as Yup from 'yup';
import {FormikErrors} from "formik";

const validation = Yup.object<FormikErrors<any>>().shape({
    date:   Yup.string().nullable().required('Не выбрана дата'),
    client: Yup.string().nullable().required('Не выбран пациент'),
    person: Yup.string().nullable().required('Не указан врач'),
    idx: Yup.number().required('Не выбран номерок')
  })
export default validation