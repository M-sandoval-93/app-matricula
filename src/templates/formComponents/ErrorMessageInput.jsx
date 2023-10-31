const ErrorMessageInput = ({ touched, errors, value }) => {
  return touched[value] && errors[value] ? (
    <p className="text-red-800">{errors[value]}</p>
  ) : null;
};

export default ErrorMessageInput;
