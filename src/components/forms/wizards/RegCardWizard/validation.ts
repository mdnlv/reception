import * as Yup from "yup";
import {FormikErrors} from "formik";

import {ValidationType} from "./types";

Yup.addMethod(Yup.string, 'compareWithToday', function (errorMessage) {
  //@ts-ignore
  return this.test('test-compare-with-today', errorMessage, function (value: string) {
    //@ts-ignore
    const {path, createError} = this;
    const valueParsed = Date.parse(value);
    //@ts-ignore
    const todayParsed = Date.parse(new Date());
    return valueParsed < todayParsed || createError({ path, message: errorMessage })
  });
});

const validation = Yup.object<FormikErrors<ValidationType>>().shape({
  isUnknown: Yup.boolean(),
  personal: Yup.object().when('isUnknown', {
    is: false,
    then: Yup.object({
      lastName: Yup.string().required('фамилия пациента'),
      firstName: Yup.string().required('имя пациента'),
      //@ts-ignore
      birthDate: Yup.string().nullable().required('дата рождения').compareWithToday('введена ненаступившая дата рождения'),
      sex: Yup.boolean().nullable().required('пол'),
      snils: Yup.string().when('SNILSMissingReason', {
        is: val => !val,
        then: Yup.string().required('СНИЛС')
          .transform(value => value.replace(/[^0-9]/g, ''))
          .min(11, "значение СНИЛС должно содержать 11 цифр"),
      }),
      SNILSMissingReason: Yup.string(),
    }),
    otherwise: Yup.object({
      sex: Yup.boolean().nullable().required('пол'),
    }),
  }),
  passportGeneral: Yup.object().when('isUnknown', {
    is: false,
    then: Yup.object({
      contacts: Yup.array().nullable().of(Yup.object({
        type: Yup.string().required('тип телефона'),
        number: Yup.string().when('type', {
          is: value => value === '4' || value === '11',
          then: Yup.string().required('e-mail').email('e-mail')
        })
      })),
    }),
  }),
  personDocs: Yup.object().when('isUnknown', {
    is: false,
    then: Yup.object({
      documents: Yup.array().of(Yup.object({
        passportType: Yup.string().required('тип документа'),
        serialFirst: Yup.string().required('серия документа'),
        serialSecond: Yup.string().required('серия документа'),
        number: Yup.string().required('номер документа'),
        fromDate: Yup.string().required('дата выдачи').nullable(),
        givenBy: Yup.string().required('кем выдан документ'),
      })),
      policies: Yup.array().of(Yup.object({
        timeType: Yup.string().required('вид полиса'),
        from: Yup.string().required('дата начала действия полиса').nullable(),
        to: Yup.string().required('дата окончания действия полиса').nullable(),
        serial: Yup.string().nullable().required('серия полиса'),
        number: Yup.string().required('номер полиса'),
        cmo: Yup.string().required('СМО'),
        type: Yup.string().required('тип полиса')
      })),
    }),
  }),
  attachments: Yup.object({
    attachments: Yup.array().of(Yup.object({
      type: Yup.string().required('тип прикрепления'),
      lpu: Yup.string().required('ЛПУ'),
      unit: Yup.string().required('подразделение')
    }))
  })
});

export default validation
