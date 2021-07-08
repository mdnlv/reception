import * as Yup from "yup";
import {FormikErrors} from "formik";

import {ValidationType} from "./types";

const validation = Yup.object<FormikErrors<ValidationType>>().shape({
  personal: Yup.object({
    lastName: Yup.string().required('Не введена фамилия пациента'),
    firstName: Yup.string().required('Не введено имя пациента'),
    birthDate: Yup.string().required('Не введена дата рождения'),
    snils: Yup.string().required('Не введен СНИЛС'),
  }),
  passportGeneral: Yup.object({
    passportInfo: Yup.object({
      passportType: Yup.string().required('Не выбран тип документа'),
      serialFirst: Yup.string().required('Не введена серия документа'),
      serialSecond: Yup.string().required('Не введена серия документа'),
      number: Yup.string().required('Не введен номер документа'),
      fromDate: Yup.string().required('Не введена дата выдачи').nullable(),
      givenBy: Yup.string().required('Не введено кем выдан документ'),
    }),
    contacts: Yup.object({
      contacts: Yup.array().of(Yup.object({
        type: Yup.string().required('Не выбран тип телефона'),
        number: Yup.string().when('type', {
          is: value => value === '4' || value === '11',
          then: Yup.string().required('Не введен e-mail').email('Не введен e-mail')
        })
      })),
    }),
    policyOms: Yup.object({
      timeType: Yup.string().required('Не выбран тип времени полиса'),
      from: Yup.string().required('Не задана дата начала действия полиса').nullable(),
      to: Yup.string().required('Не задана дата окончания действия полиса').nullable(),
      serial: Yup.string().required('Не введена серия полиса'),
      number: Yup.string().required('Не введен номер полиса'),
      cmo: Yup.string().required('Не выбрана СМО'),
      type: Yup.string().required('Не выбран тип полиса')
    })
  }),
  socialStatus: Yup.object({
    socialStatus: Yup.array().of(Yup.object({
      class: Yup.string().required('Не выбран класс'),
      statusType: Yup.string().required('Не выбран тип статуса'),
      fromDate: Yup.string().required('Не введена дата начала'),
      endDate: Yup.string().required('Не введена дата окончания'),
      docId: Yup.string().required('Не выбран тип документа')
    })),
  }),
  employment: Yup.object({
    hazardHistory: Yup.array().of(Yup.object({
      hazardDescription: Yup.string().required('Не выбран тип вредности'),
      factor: Yup.string().required('Не выбран фактор')
    }))
  }),
  attachments: Yup.object({
    attachments: Yup.array().of(Yup.object({
      type: Yup.string().required('Не выбран тип прикрепления'),
      lpu: Yup.string().required('Не выбрано ЛПУ'),
      unit: Yup.string().required('Не выбрано подразделение')
    }))
  })
});

export default validation
