import React from "react";
import { NumberInput, NumberInputField } from "@chakra-ui/react";
import { Controller, useFormContext } from "react-hook-form";

const FormNumberInput = (props) => {
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
        defaultValue={defaultValue}
        render={(newProps) => {
          return (
            <NumberInput
              {...newProps}
              {...props}
              isDisabled={disabled || false}
            >
              <NumberInputField
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
            </NumberInput>
          );
        }}
      />
      {error && <p className="errInfo">{error[name]?.message}</p>}
    </>
  );
};

export default FormNumberInput;
