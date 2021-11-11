import * as Yup from "yup";
import {FormikErrors} from "formik";

import {ValidationType} from "./types";

Yup.addMethod(Yup.string, 'compareWithToday', function (errorMessage) {
  // @ts-ignore
  return this.test('test-compare-with-today', errorMessage, function (value: string) {
    // @ts-ignore
    const {path, createError} = this;
    const valueParsed = Date.parse(value);
    const todayParsed = Date.parse((new Date()).toString());
    return valueParsed < todayParsed || createError({ path, message: errorMessage })
  });
});

Yup.addMethod(Yup.string, 'comparePolicyDates', function (errorMessage) {
  // @ts-ignore
  return this.test('test-compare-policy-dates', errorMessage, function (value: string) {
    // @ts-ignore
    const {path, createError} = this;
    const valueParsed = Date.parse(value);
    // @ts-ignore
    const compareParsed = Date.parse(this.parent.from);
    return compareParsed < valueParsed || createError({ path, message: errorMessage })
  });
});

Yup.addMethod(Yup.string, 'compareStatusDates', function (errorMessage) {
  // @ts-ignore
  return this.test('test-compare-status-dates', errorMessage, function (value: string) {
    // @ts-ignore
    const {path, createError} = this;
    const valueParsed = Date.parse(value);
    // @ts-ignore
    const compareParsed = Date.parse(this.parent.fromDate);
    return compareParsed < valueParsed || createError({ path, message: errorMessage })
  });
});

const validation = Yup.object<FormikErrors<ValidationType>>().shape({
  personal: Yup.object({
    lastName: Yup.string().required('фамилия пациента'),
    firstName: Yup.string().required('имя пациента'),
    sex: Yup.boolean().nullable().required('пол'),
    // @ts-ignore
    birthDate: Yup.string().required('дата рождения').compareWithToday('введена ненаступившая дата'),
    snils: Yup.string().required('СНИЛС')
      .transform(value => value.replace(/[^0-9]/g, ''))
      .min(11, "значение СНИЛС должно содержать 11 цифр"),
  }),
  passportGeneral: Yup.object({
    contacts: Yup.object({
      contacts: Yup.array().of(Yup.object({
        type: Yup.string().required('тип телефона'),
        number: Yup.string().when('type', {
          is: value => value === '4' || value === '11',
          then: Yup.string().required('e-mail').email('e-mail')
        })
      })),
    }),
  }),
  personDocs: Yup.object({
    documents: Yup.array().of(Yup.object({
      passportType: Yup.string().required('тип документа'),
      serialFirst: Yup.string().required('серия документа'),
      serialSecond: Yup.string().required('серия документа'),
      number: Yup.string().required('номер документа'),
      fromDate: Yup.string().required('дата выдачи')
        // @ts-ignore
        .nullable().compareWithToday('введена ненаступившая дата'),
      givenBy: Yup.string().required('кем выдан документ'),
    })),
    policies: Yup.array().of(Yup.object({
      timeType: Yup.string().required('вид полиса'),
      from: Yup.string().required('дата начала действия полиса')
        .nullable()
        // @ts-ignore
        .compareWithToday('введена ненаступившая дата'),
      to: Yup.string().required('дата окончания действия полиса')
        .nullable()
        // @ts-ignore
        .comparePolicyDates('окончание действия полиса раньше начала'),
      serial: Yup.string().required('серия полиса'),
      number: Yup.string().required('номер полиса'),
      cmo: Yup.string().required('СМО'),
      type: Yup.string().required('тип полиса')
    })),
  }),
  socialStatus: Yup.object({
    socialStatus: Yup.array().of(Yup.object({
      class: Yup.string().required('класс'),
      statusType: Yup.string().required('тип статуса'),
      // @ts-ignore
      fromDate: Yup.string().required('дата начала').compareWithToday('введена ненаступившая дата'),
      // @ts-ignore
      endDate: Yup.string().required('дата окончания').compareStatusDates('окончание действия статуса раньше начала'),
      document: Yup.object({
        passportType: Yup.string().required('тип документа'),
        fromDate: Yup.string().required('дата выдачи').nullable(),
      }),
    })),
  }),
  employment: Yup.object({
    hazardHistory: Yup.array().of(Yup.object({
      hazardDescription: Yup.string().required('тип вредности'),
      factor: Yup.string().required('фактор')
    }))
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
