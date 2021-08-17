import * as Yup from "yup";
import {FormikErrors} from "formik";

import {ValidationType} from "./types";

const validation = Yup.object<FormikErrors<ValidationType>>().shape({
  personal: Yup.object({
    isUnknown: Yup.boolean(),
    lastName: Yup.string().when('isUnknown', {
      is: false,
      then: Yup.string().required('Не введена фамилия пациента'),
    }),
    firstName: Yup.string().when('isUnknown', {
      is: false,
      then: Yup.string().required('Не введено имя пациента'),
    }),
    birthDate: Yup.string().when('isUnknown', {
      is: false,
      then: Yup.string().required('Не введена дата рождения'),
    }),
    sex: Yup.number().when('isUnknown', {
      is: true,
      then: Yup.number().required('Не выбран пол'),
    }),
  }),
  passportGeneral: Yup.object({
    contacts: Yup.object({
      contacts: Yup.array().of(Yup.object({
        type: Yup.string().required('Не выбран тип телефона'),
        number: Yup.string().when('type', {
          is: value => value === '4' || value === '11',
          then: Yup.string().required('Не введен e-mail').email('Не введен e-mail')
        })
      })),
    }),
  }),
  personDocs: Yup.object({
    documents: Yup.array().of(Yup.object({
      passportType: Yup.string().required('Не выбран тип документа'),
      serialFirst: Yup.string().required('Не введена серия документа'),
      serialSecond: Yup.string().required('Не введена серия документа'),
      number: Yup.string().required('Не введен номер документа'),
      fromDate: Yup.string().required('Не введена дата выдачи').nullable(),
      givenBy: Yup.string().required('Не введено кем выдан документ'),
    })),
    policies: Yup.array().of(Yup.object({
      timeType: Yup.string().required('Не выбран вид полиса'),
      from: Yup.string().required('Не задана дата начала действия полиса').nullable(),
      to: Yup.string().required('Не задана дата окончания действия полиса').nullable(),
      serial: Yup.string().required('Не введена серия полиса'),
      number: Yup.string().required('Не введен номер полиса'),
      cmo: Yup.string().required('Не выбрана СМО'),
      type: Yup.string().required('Не выбран тип полиса')
    })),
  }),
});

export default validation
