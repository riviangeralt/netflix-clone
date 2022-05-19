import React from "react";
import { Button } from "@chakra-ui/react";

const FormButton = (props) => {
  const {
    text,
    onClick,
    disabled,
    loading,
    variant,
    leftIcon,
    rightIcon,
    fullWidth,
    loadingText,
    size,
    colorScheme,
    type,
  } = props;
  return (
    <Button
      colorScheme={colorScheme || "blue"}
      isDisabled={disabled || false}
      isFullWidth={fullWidth}
      isLoading={loading}
      leftIcon={leftIcon || null}
      loadingText={loadingText || null}
      rightIcon={rightIcon || null}
      size={size || "md"}
      variant={variant || "solid"}
      onClick={onClick}
      type={type || "button"}
    >
      {text || props.children}
    </Button>
  );
};

export default FormButton;
