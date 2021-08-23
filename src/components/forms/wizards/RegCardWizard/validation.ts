import * as Yup from "yup";
import {FormikErrors} from "formik";

import {ValidationType} from "./types";

Yup.addMethod(Yup.string, 'compareWithToday', function (errorMessage) {
  return this.test('test-compare-with-today', errorMessage, function (value: string) {
    const {path, createError} = this;
    const valueParsed = Date.parse(value);
    const todayParsed = Date.parse(new Date());
    return valueParsed < todayParsed || createError({ path, message: errorMessage })
  });
});

const validation = Yup.object<FormikErrors<ValidationType>>().shape({
  isUnknown: Yup.boolean(),
  personal: Yup.object().when('isUnknown', {
    is: false,
    then: Yup.object({
      lastName: Yup.string().required('Не введена фамилия пациента'),
      firstName: Yup.string().required('Не введено имя пациента'),
      birthDate: Yup.string().required('Не введена дата рождения').compareWithToday('бла бла введена ненаступившая дата'),
      sex: Yup.boolean().nullable().required('Не выбран пол'),
      snils: Yup.string().required('Не введен СНИЛС')
        .transform(value => value.replace(/[^0-9]/g, ''))
        .min(11, "Бла бла значение должно содержать 11 цифр"),
    }),
    otherwise: Yup.object({
      sex: Yup.boolean().nullable().required('Не выбран пол'),
    }),
  }),
  passportGeneral: Yup.object().when('isUnknown', {
    is: false,
    then: Yup.object({
      contacts: Yup.array().nullable().of(Yup.object({
        type: Yup.string().required('Не выбран тип телефона'),
        number: Yup.string().when('type', {
          is: value => value === '4' || value === '11',
          then: Yup.string().required('Не введен e-mail').email('Не введен e-mail')
        })
      })),
    }),
  }),
  personDocs: Yup.object().when('isUnknown', {
    is: false,
    then: Yup.object({
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
  }),
});

export default validation
