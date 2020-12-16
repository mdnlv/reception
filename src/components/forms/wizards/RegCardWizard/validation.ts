import * as Yup from "yup";

export default Yup.object({
  personal: Yup.object().shape({
    snils: Yup.mixed().test(
      'personal.snils',
      'Неправильное контрольное число',
      (value) => {
        const valueInt = value ? value.replace(/-/g, "").replace(/\s/g, "") : '';
        let sum = 0;
        let checkDigit = 0;

        for (let i = 0; i < 9; i++) {
          sum += parseInt(valueInt[i]) * (9 - i);
        }
        if (sum < 100) {
          checkDigit = sum;
        } else if (sum > 101) {
          checkDigit = sum % 101;
          if (checkDigit === 100) {
            checkDigit = 0
          }
        }

        return checkDigit === parseInt(valueInt.slice(-2))
      }
    )
  }),
  passportGeneral: Yup.object().shape({
    passportInfo: Yup.object().shape({
      passportType: Yup.string().required('Не выбран тип паспорта')
    }),
    policyOms: Yup.object().shape({
      timeType: Yup.string().required('Не выбран тип полиса'),
      cmo: Yup.string().required('Не выбрана СМО'),
      type: Yup.string().required('Не выбран тип полиса')
    })
  })
});
