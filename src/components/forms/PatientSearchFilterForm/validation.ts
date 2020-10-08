import * as Yup from 'yup';

export default Yup.object({
  tempInvalidReasonId: Yup.number().required(
    'Введите причину нетрудоспособности',
  ),
});
