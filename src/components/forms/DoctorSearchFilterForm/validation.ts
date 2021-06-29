import * as Yup from 'yup';

export default Yup.object().shape({
  tempInvalidReasonId: Yup.number(),
});
