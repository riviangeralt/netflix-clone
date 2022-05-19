import React, { useEffect } from "react";
import { withRouter } from "react-router-dom";
import { Stack, Box } from "@chakra-ui/react";
import Controls from "../controls/Controls";
import { FormProvider, useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import {
  addProfile,
  selectedProfile,
  clearInputs,
  updateProfile,
} from "../../slices/profile";

const NewProfile = (props) => {
  const { isEdit } = props;
  const methods = useForm();
  const dispatch = useDispatch();
  const individualProfile = useSelector(
    (state) => state.profile.individualProfile
  );

  useEffect(() => {
    if (isEdit) {
      dispatch(selectedProfile(props.match.params.id));
    }
    return () => {
      dispatch(clearInputs());
    };
  }, [isEdit]);
  const onSubmit = async (data) => {
    if (isEdit) {
      dispatch(updateProfile({ id: individualProfile._id, update: data }));
    } else {
      dispatch(addProfile(data));
    }
  };
  return (
    <Stack
      spacing={4}
      align="center"
      justifyContent={"center"}
      height={"100%"}
      background="gray.900"
    >
      <Box
        borderRadius={10}
        width={100}
        height={100}
        background={"white"}
        alignItems="center"
        justifyContent={"center"}
        display="flex"
        fontSize={32}
      >
        A
      </Box>
      <FormProvider {...methods}>
        <form
          onSubmit={methods.handleSubmit(onSubmit)}
          style={{ width: "400px" }}
        >
          <Controls.FormInput
            name="name"
            placeholder="Name"
            autoComplete="off"
            control={methods.control}
            register={methods.register}
            rules={{
              required: "This field is required",
              minLength: {
                value: 3,
                message: "Name must be at least 3 characters",
              },
            }}
            error={methods.formState.errors}
            color="white"
            defaultValue={isEdit ? individualProfile.name : ""}
          />
          <Box mt={4}>
            <Controls.FormButton
              type="submit"
              color="white"
              bg="blue.500"
              _hover={{ bg: "blue.600" }}
              _active={{ bg: "blue.700" }}
            >
              Submit
            </Controls.FormButton>
          </Box>
        </form>
      </FormProvider>
    </Stack>
  );
};

export default withRouter(NewProfile);
