import React, { useEffect } from "react";
import { withRouter } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Stack, Text, Image, StackItem, Heading } from "@chakra-ui/react";
import { getMovieCollection } from "../../slices/movie";

const Collection = (props) => {
  const { collectionId } = props.match.params;
  const dispatch = useDispatch();
  const { isLoading, collection } = useSelector((state) => state.movie);
  useEffect(() => {
    dispatch(getMovieCollection(collectionId));
  }, [dispatch, collectionId]);
  return (
    <>
      {!isLoading ? (
        <Stack p={4} display="flex" direction="row" columnGap={3} bg="black">
          <StackItem flex={1}>
            <Image
              src={`https://image.tmdb.org/t/p/w500/${collection?.poster_path}`}
              objectFit="cover"
              zIndex={1}
            />
          </StackItem>
          <StackItem flex={2} textAlign="left">
            <Heading as="h2" size="lg" color="white">
              {collection?.name}
            </Heading>
            <Text color="white">{collection?.overview}</Text>
            {collection?.parts.map((part) => (
              <Stack display={"inline-block"} margin={2}>
                <Image
                  src={`https://image.tmdb.org/t/p/w500/${part.poster_path}`}
                  //   height={100}
                  width={200}
                  //   borderRadius={"50%"}
                  objectFit="cover"
                  cursor="pointer"
                  zIndex={1}
                  onClick={() => {
                    props.history.push(`/movie/${part.id}`);
                  }}
                />
                <Text color="white">{part.title}</Text>
              </Stack>
            ))}
          </StackItem>
        </Stack>
      ) : (
        <Stack justifyContent="center" alignItems="center" height="100%">
          <Text color="white" fontSize="xl">
            Loading...
          </Text>
        </Stack>
      )}
    </>
  );
};

export default withRouter(Collection);
