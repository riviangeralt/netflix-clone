import React from "react";
import { Input } from "@chakra-ui/react";
import { Controller, useFormContext } from "react-hook-form";

const FormInput = (props) => {
  const {
    control,
    name,
    placeholder,
    disabled,
    readOnly,
    invalid,
    error,
    rules,
    defaultValue,
    variant,
    size,
    fullWidth,
    register,
    onChange,
  } = props;
  const methods = useFormContext();
  return (
    <>
      <Controller
        name={name}
        control={control}
        error={error}
        rules={rules}
        register={register}
        defaultValue={defaultValue}
        render={(newProps) => {
          return (
            <Input
              {...newProps}
              {...props}
              isDisabled={disabled || false}
              isFullWidth={fullWidth}
              isInvalid={invalid || false}
              isReadOnly={readOnly || false}
              size={size || "md"}
              variant={variant || "outline"}
              placeholder={placeholder}
              onChange={
                onChange
                  ? onChange
                  : (e) => {
                      methods.setValue(name, e.target.value);
                      methods.clearErrors(name);
                    }
              }
            />
          );
        }}
      />
      {error && <p className="errInfo">{error[name]?.message}</p>}
    </>
  );
};
export default FormInput;
