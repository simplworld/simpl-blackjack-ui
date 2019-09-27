import React from 'react';
import PropTypes from 'prop-types';

import {Button} from 'react-bootstrap';

import {Field, reduxForm} from 'redux-form';

class DecisionForm extends React.Component {

  constructor(props) {
    super(props);
    this.submitForm = this.submitForm.bind(this);
  }

  submitForm(values) {
    this.props.submitDecision(values);
  }

  render() {
    const {error, handleSubmit, submitting, invalid} = this.props;
    return (
      <div className="content-wrapper">
        <form id="testScenarioForm" onSubmit={handleSubmit(this.submitForm)}>

          <div className="form-group">
            <label>Enter a number:</label>
            <Field
              component="input"
              type="number"
              name="operand"
              id="operand"
              required="true"
              step="any"
            />
          </div>

          <div>
            <Button
              type="submit"
              bsClass="btn btn-mr btn-labeled btn-success"
              bsStyle="success"
              disabled={invalid || submitting}
            >Add to Total</Button>
          </div>

          <div>
            {error && <div><p>{error}</p></div>}
          </div>

        </form>
      </div >
    );
  }
}

DecisionForm.propTypes = {
  runuser: PropTypes.object.isRequired,
  initialValues: PropTypes.object.isRequired,

  // redux-form props
  handleSubmit: PropTypes.func,
  invalid: PropTypes.bool,
  submitting: PropTypes.bool,
  error: PropTypes.string,

  // dispatch actions
  submitDecision: PropTypes.func.isRequired
};

export default reduxForm({
  form: 'decisionForm'
})(DecisionForm);
