import * as Yup from "yup";

export default Yup.object({
  // personal: Yup.object().shape({
  //   snils: Yup.mixed().test(
  //     'personal.snils',
  //     'Неправильное контрольное число',
  //     (value) => {
  //       const valueInt = value ? value.replace(/-/g, "").replace(/\s/g, "") : '';
  //       let sum = 0;
  //       let checkDigit = 0;
  //
  //       for (let i = 0; i < 9; i++) {
  //         sum += parseInt(valueInt[i]) * (9 - i);
  //       }
  //       if (sum < 100) {
  //         checkDigit = sum;
  //       } else if (sum > 101) {
  //         checkDigit = sum % 101;
  //         if (checkDigit === 100) {
  //           checkDigit = 0
  //         }
  //       }
  //
  //       return checkDigit === parseInt(valueInt.slice(-2))
  //     }
  //   )
  // }),
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
