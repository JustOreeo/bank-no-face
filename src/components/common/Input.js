const fixedInputClass="rounded-input"

const Input = ({
    handleChange,
    value,
    labelText,
    labelFor,
    id,
    name,
    type,
    isRequired=false,
    placeholder,
}) => {
    return(
      <div className="my-5">
        <label htmlFor={labelFor} className="sr-only">
          {labelText}
        </label>
        <input
          onChange={handleChange}
          value={value}
          id={id}
          name={name}
          type={type}
          className={fixedInputClass}
          placeholder={placeholder}
        />
      </div>
    )
}

export default Input;
