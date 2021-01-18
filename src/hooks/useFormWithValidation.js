import { useState, useCallback } from 'react';

export function useFormWithValidation() {
  const [values, setValues] = useState({});
  const [errors, setErrors] = useState({});
  const [isValid, setIsValid] = useState({});

  const handleChange = (event) => {
    const target = event.target;
    const {name, value} = event.target;
    setValues({...values, [name]: value});
    setIsValid(target.closest("form").checkValidity());
  };

  const handleInput = (event) => {
    const {name, value, validity, validationMessage} = event.target;
    setValues({...values, [name]: value});
    setIsValid({...isValid, [name]: validity.valid});
    setErrors({...errors, [name]: validationMessage });
  };

  const resetForm = useCallback(
    (newValues = {}, newErrors = {}, newIsValid = false) => {
      setValues(newValues);
      setErrors(newErrors);
      setIsValid(newIsValid);
    },
    [setValues, setErrors, setIsValid]
  );

  return { values, setValues, handleChange, handleInput, errors, isValid, resetForm };
}


