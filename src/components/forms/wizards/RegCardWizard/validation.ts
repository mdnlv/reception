import * as Yup from "yup";

export default Yup.object({
  personal: Yup.object({
    birthDate: Yup.string().required('Не введена дата рождения')
  }),
  passportGeneral: Yup.object({
    passportInfo: Yup.object({
      passportType: Yup.string().required('Не выбран тип паспорта')
    }),
    contacts: Yup.array().of(Yup.object({
      type: Yup.string().required('Не выбран тип телефона'),
    })),
    policyOms: Yup.object({
      timeType: Yup.string().required('Не выбран'),
      from: Yup.string().required('Дата не задана'),
      to: Yup.string().required('Дата не задана'),
      cmo: Yup.string().required('Не выбрана СМО'),
      type: Yup.string().required('Не выбран тип полиса')
    })
  }),
  socialStatus: Yup.object({
    socialStatus: Yup.array().of(Yup.object({
      class: Yup.string().required('Не выбран класс'),
      type: Yup.string().required('Не выбран тип'),
    })),
    trustedDoc: Yup.array().of(Yup.object().shape({
      type: Yup.string().required('Не выбран тип')
    }))
  }),
  employment: Yup.object({
    employment: Yup.array().of(Yup.object({
      organization: Yup.string(),
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
