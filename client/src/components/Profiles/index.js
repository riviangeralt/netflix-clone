import React from "react";
import { Link, withRouter } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Box, Stack, Heading, StackItem } from "@chakra-ui/react";
import { AddIcon, EditIcon } from "@chakra-ui/icons";
import { getProfiles } from "../../slices/profile";
import { useEffect, useState } from "react";
import instance from "../../api";
import Controls from "../controls/Controls";

const Profiles = (props) => {
  const profiles = useSelector((state) => state.profile.profiles);
  const token = useSelector((state) => state.auth.token);
  const dispatch = useDispatch();
  const [manage, setManage] = useState(false);

  useEffect(() => {
    if (token) {
      instance.defaults.headers.common["Authorization"] = token;
    }
    dispatch(getProfiles());
  }, [dispatch]);
  return (
    <Stack
      spacing={4}
      columnGap={4}
      justifyContent="center"
      height={"100%"}
      direction="column"
      background="gray.900"
      align={"center"}
    >
      <Heading
        as="h2"
        size="lg"
        color="white"
        position={"absolute"}
        top={"30%"}
      >
        Who's Watching?
      </Heading>
      <Stack
        spacing={4}
        align="center"
        justifyContent={"center"}
        height={"100%"}
        direction="row"
      >
        {profiles.map((profile) => {
          return (
            <Box
              key={profile._id}
              borderRadius={10}
              width={100}
              height={100}
              background={"white"}
              alignItems="center"
              justifyContent={"center"}
              display="flex"
              fontSize={32}
              cursor="pointer"
              onClick={() => {
                if (manage) {
                  props.history.push(`/manage/${profile._id}`);
                } else {
                  props.history.push(`/account/${profile._id}`);
                }
              }}
            >
              {manage ? <EditIcon /> : profile.name[0]}
            </Box>
          );
        })}
        {profiles.length < 5 && (
          <Box
            borderRadius={10}
            width={100}
            height={100}
            background={"white"}
            alignItems="center"
            justifyContent={"center"}
            display="flex"
            fontSize={32}
            cursor={["pointer"]}
            onClick={() => {
              props.history.push("/new-profile");
            }}
          >
            <AddIcon />
          </Box>
        )}
      </Stack>
      <Box position={"absolute"} bottom={"30%"}>
        <Controls.FormButton
          color="white"
          bg="blue.500"
          _hover={{ bg: "blue.600" }}
          _active={{ bg: "blue.700" }}
          onClick={() => {
            setManage(!manage);
          }}
        >
          Manage Profiles
        </Controls.FormButton>
      </Box>
    </Stack>
  );
};

export default withRouter(Profiles);
