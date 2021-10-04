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

Yup.addMethod(Yup.string, 'comparePolicyDates', function (errorMessage) {
  //@ts-ignore
  return this.test('test-compare-policy-dates', errorMessage, function (value: string) {
    //@ts-ignore
    const {path, createError} = this;
    const valueParsed = Date.parse(value);
    //@ts-ignore
    const compareParsed = Date.parse(this.parent.from);
    return compareParsed <= valueParsed || createError({ path, message: errorMessage })
  });
});

const valid = (mask: number) => Yup.object<FormikErrors<ValidationType>>().shape({
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
      contacts: Yup.object({
        contacts: Yup.array().nullable().of(Yup.object({
          type: Yup.string().required('тип телефона'),
          number: Yup.string().when('type', {
            is: value => value === '4' || value === '11',
            then: Yup.string().required('e-mail').email('e-mail')
          }).max(32, "длина номера должна быть максимум 32 символа"),
        })),
      }),
    }),
  }),
  personDocs: Yup.object().when('isUnknown', {
    is: false,
    then: Yup.object({
      documents: Yup.array().of(Yup.object({
        passportType: Yup.string().required('тип документа'),
        serialFirst: Yup.string().required('серия документа'),
        serialSecond: Yup.string()
          .required('серия документа')
          .test(
            'max',
            'длина серии документа должна быть максимум 8 символов',
            function(value) {
              const {serialFirst} = this.parent;
              return serialFirst?.concat(value).length < 9
            }),
        number: Yup.string()
          .required('номер документа')
          .max(16, "длина номера документа должна быть максимум 16 символов"),
        fromDate: Yup.string().required('дата выдачи').nullable(),
        givenBy: Yup.string().required('кем выдан документ'),
      })),
      policies: Yup.array().of(Yup.object({
        timeType: Yup.string().required('вид полиса'),
        from: Yup.string().required('дата начала действия полиса').nullable(),
        to: Yup.string()
          .required('дата окончания действия полиса')
          .nullable()
          .when('from', {
            is: value => value,
            //@ts-ignore
            then: Yup.string().comparePolicyDates('окончание действия полиса раньше начала')
          }),
        enp: Yup.string().test("len", "Неправильно введён номер ЕНП", (val) => {
          const val_length_without_dashes = val?.replace(/-|_/g, "").length;
          console.log(val_length_without_dashes)
          return ((val_length_without_dashes === 16 || val_length_without_dashes === undefined) ? true : false);
        }),
        serial: Yup.string()
          .nullable()
          .required('серия полиса')
          .max(16, "длина серии полиса должна быть максимум 16 символов"),
        number: Yup.string().test("len", "Неправильно введён номер полиса", (val) => {
          const val_length_without_dashes = val?.replace(/-|_/g, "").length;
          return  ((val_length_without_dashes === mask || val_length_without_dashes === undefined || mask === 0) ? true : false);
        }),
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

export default function validation(mask: number) {
  return valid(mask);
}
