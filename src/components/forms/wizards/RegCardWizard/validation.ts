import * as Yup from "yup";

export default Yup.object({
  personal: Yup.object().shape({
    birthDate: Yup.string().required('Не введена дата рождения')
  }),
  passportGeneral: Yup.object().shape({
    passportInfo: Yup.object().shape({
      passportType: Yup.string().required('Не выбран тип паспорта')
    }),
    contacts: Yup.array().of(Yup.object().shape({
      type: Yup.string().required('Не выбран тип телефона'),
    })),
    policyOms: Yup.object().shape({
      timeType: Yup.string().required('Не выбран'),
      cmo: Yup.string().required('Не выбрана СМО'),
      type: Yup.string().required('Не выбран тип полиса')
    })
  }),
  socialStatus: Yup.object().shape({
    socialStatus: Yup.array().of(Yup.object().shape({
      class: Yup.string().required('Не выбран класс'),
      type: Yup.string().required('Не выбран тип'),
    })),
    trustedDoc: Yup.array().of(Yup.object().shape({
      type: Yup.string().required('Не выбран тип')
    }))
  }),
  employment: Yup.object().shape({
    employment: Yup.array().of(Yup.object().shape({
      organization: Yup.string().required('Не выбрана организация'),
    })),
    hazardHistory: Yup.array().of(Yup.object().shape({
      hazardDescription: Yup.string().required('Не выбран тип вредности'),
      factor: Yup.string().required('Не выбран фактор')
    }))
  }),
  attachments: Yup.object().shape({
    attachments: Yup.array().of(Yup.object().shape({
      type: Yup.string().required('Не выбран тип прикрепления'),
      lpu: Yup.string().required('Не выбрано ЛПУ'),
      unit: Yup.string().required('Не выбрано подразделение')
    }))
  })
});
