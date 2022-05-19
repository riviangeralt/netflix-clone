import React, { useEffect } from "react";
import Controls from "../controls/Controls";
import { withRouter } from "react-router-dom";
import { Stack, StackItem, useToast } from "@chakra-ui/react";
import { FormProvider, useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { login } from "../../slices/login";

const Login = (props) => {
  const methods = useForm();
  const dispatch = useDispatch();
  const toast = useToast();
  const isAuthenticated = useSelector((state) => state.auth.isLoggedIn);
  const token = useSelector((state) => state.auth.token);
  const status = useSelector((state) => state.auth.status);
  const message = useSelector((state) => state.auth.message);

  useEffect(() => {
    if (isAuthenticated) {
      props.history.push("/profiles");
      //setting authorization header
    }
  }, [isAuthenticated, token, props.history]);

  const onSubmit = async (data) => {
    dispatch(login(data));
    toast({
      title: message,
      // description: "We've created your account for you.",
      status: status,
      duration: 9000,
      isClosable: true,
    });
  };
  return (
    <Stack
      direction="row"
      spacing={4}
      align="center"
      justifyContent={"center"}
      height={"100%"}
    >
      <FormProvider {...methods}>
        <form
          onSubmit={methods.handleSubmit(onSubmit)}
          style={{ width: "400px" }}
        >
          <Stack>
            <Controls.FormInput
              name="email"
              placeholder="Email"
              autoComplete="off"
              control={methods.control}
              register={methods.register}
              rules={{
                required: "This field is required",
                pattern: {
                  //email validation
                  value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
                  message: "Invalid email address",
                },
              }}
              error={methods.formState.errors}
              color="white"
            />
          </Stack>
          <Stack>
            <Controls.FormInput
              name="password"
              type="password"
              placeholder="Password"
              autoComplete="off"
              control={methods.control}
              register={methods.register}
              rules={{
                required: "This field is required",
                minLength: {
                  value: 4,
                  message: "Password must be at least 4 characters long",
                },
              }}
              error={methods.formState.errors}
              color="white"
            />
          </Stack>
          <Stack
            justifyContent="space-between"
            direction="row"
            align={"center"}
          >
            <StackItem flex={1}>
              <Controls.FormButton
                text="Login"
                type="submit"
                fullWidth={true}
              />
            </StackItem>
            <StackItem flex={0.5} color="white">
              Or
            </StackItem>
            <StackItem flex={1}>
              <Controls.FormButton
                text="Sign up"
                onClick={() => props.history.push("/signup")}
                fullWidth={true}
              />
            </StackItem>
          </Stack>
        </form>
      </FormProvider>
    </Stack>
  );
};

export default withRouter(Login);
