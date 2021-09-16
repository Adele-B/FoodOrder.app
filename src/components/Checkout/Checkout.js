import useInput from "../../hooks/use-input";

import classes from "./Checkout.module.css";

const isNotEmpty = (value) => value.trim() !== "";
const isPostcode = (value) =>
  value.trim() !== "" && value.length >= 5 && value.length <= 7;

const Checkout = (props) => {
  const {
    value: nameValue,
    isValid: nameIsValid,
    hasError: nameInputHasError,
    valueChangeHandler: nameChangedHandler,
    inputBlurHandler: nameBlurHandler,
    reset: nameReset,
  } = useInput(isNotEmpty);

  const {
    value: streetValue,
    isValid: streetIsValid,
    hasError: streetInputHasError,
    valueChangeHandler: streetChangedHandler,
    inputBlurHandler: streetBlurHandler,
    reset: streetReset,
  } = useInput(isNotEmpty);

  const {
    value: postcodeValue,
    isValid: postcodeIsValid,
    hasError: postcodeInputHasError,
    valueChangeHandler: postcodeChangedHandler,
    inputBlurHandler: postcodeBlurHandler,
    reset: postcodeReset,
  } = useInput(isPostcode);

  const {
    value: cityValue,
    isValid: cityIsValid,
    hasError: cityInputHasError,
    valueChangeHandler: cityChangedHandler,
    inputBlurHandler: cityBlurHandler,
    reset: cityReset,
  } = useInput(isNotEmpty);

  let formIsValid = false;

  if (nameIsValid && streetIsValid && postcodeIsValid && cityIsValid) {
    formIsValid = true;
  }

  const formSubmissionHandler = (event) => {
    event.preventDefault();

    if (!formIsValid) {
      return;
    }

    props.onConfirm({
      name: nameValue,
      street: streetValue,
      postcode: postcodeValue,
      city: cityValue,
    });

    nameReset();
    streetReset();
    postcodeReset();
    cityReset();
  };

  const nameInputClasses = nameInputHasError
    ? `${classes.control} ${classes.invalid}`
    : classes.control;

  const streetInputClasses = streetInputHasError
    ? `${classes.control} ${classes.invalid}`
    : classes.control;

  const postcodeInputClasses = postcodeInputHasError
    ? `${classes.control} ${classes.invalid}`
    : classes.control;

  const cityInputClasses = cityInputHasError
    ? `${classes.control} ${classes.invalid}`
    : classes.control;

  return (
    <form className={classes.form} onSubmit={formSubmissionHandler}>
      <div className={nameInputClasses}>
        <label htmlFor="name">Your Name</label>
        <input
          type="text"
          id="name"
          onChange={nameChangedHandler}
          onBlur={nameBlurHandler}
          value={nameValue}
        />
        {nameInputHasError && (
          <p className="error-text">Please enter a valid name.</p>
        )}
      </div>
      <div className={streetInputClasses}>
        <label htmlFor="street">Street</label>
        <input
          type="text"
          id="street"
          onChange={streetChangedHandler}
          onBlur={streetBlurHandler}
          value={streetValue}
        />
        {streetInputHasError && (
          <p className="error-text">Please enter a valid street.</p>
        )}
      </div>
      <div className={postcodeInputClasses}>
        <label htmlFor="postal">Postal Code</label>
        <input
          type="text"
          id="postal"
          onChange={postcodeChangedHandler}
          onBlur={postcodeBlurHandler}
          value={postcodeValue}
        />
        {postcodeInputHasError && (
          <p className="error-text">Please enter a valid postcode.</p>
        )}
      </div>
      <div className={cityInputClasses}>
        <label htmlFor="city">City</label>
        <input
          type="text"
          id="city"
          onChange={cityChangedHandler}
          onBlur={cityBlurHandler}
          value={cityValue}
        />
        {cityInputHasError && (
          <p className="error-text">Please enter a valid city.</p>
        )}
      </div>
      <div className={classes.actions}>
        <button type="button" onClick={props.onCancel}>
          Cancel
        </button>
        <button className={classes.submit}>Confirm</button>
      </div>
    </form>
  );
};

export default Checkout;
