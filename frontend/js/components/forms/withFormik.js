import { withFormik } from 'formik';


const wrappedWithFormik = options => Component => withFormik({
  handleSubmit: (values, formikBag) => { formikBag.props.onSubmit(values, formikBag); },
  disabled: {},
  ...options,
})(Component);

export default wrappedWithFormik;
