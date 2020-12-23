import * as Yup from "yup";
import {FormikErrors} from "formik";

import {ValidationType} from "./types";

const validation = Yup.object<FormikErrors<ValidationType>>().shape({
  personal: Yup.object({
    birthDate: Yup.string().required('Не введена дата рождения'),
    snils: Yup.string().required('Не введен СНИЛС'),
    height: Yup.number().positive('Рост не является положительным значением'),
    weight: Yup.number().positive('Вес не является положительным значением')
  }),
  passportGeneral: Yup.object({
    passportInfo: Yup.object({
      passportType: Yup.string().required('Не выбран тип документа'),
      fromDate: Yup.string().required('Не введена дата выдачи')
    }),
    contacts: Yup.array().of(Yup.object({
      type: Yup.string().required('Не выбран тип телефона'),
      number: Yup.string().when('type', {
        is: value => value === '4' || value === '11',
        then: Yup.string().required('Не введен e-mail').email('Не введен e-mail')
      })
    })),
    policyOms: Yup.object({
      timeType: Yup.string().required('Не выбран тип времени полиса'),
      from: Yup.string().required('Не задана дата начала действия полиса'),
      to: Yup.string().required('Не задана дата окончания действия полиса'),
      cmo: Yup.string().required('Не выбрана СМО'),
      type: Yup.string().required('Не выбран тип полиса')
    })
  }),
  socialStatus: Yup.object({
    socialStatus: Yup.array().of(Yup.object({
      class: Yup.string().required('Не выбран класс'),
      type: Yup.string().required('Не выбран тип статуса'),
      fromDate: Yup.string().required('Не введена дата начала'),
      endDate: Yup.string().required('Не введена дата окончания')
    })),
    trustedDoc: Yup.array().of(Yup.object().shape({
      type: Yup.string().required('Не выбран тип документа')
    }))
  }),
  employment: Yup.object({
    employment: Yup.array().of(Yup.object({
      organization: Yup.string().required('Не введена организация'),
      freeInput: Yup.string().when('organization', {
        is: value => !value,
        then: Yup.string().required('Не введена организация')
      })
    })),
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
