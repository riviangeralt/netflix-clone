import React, { useEffect } from "react";
import { withRouter } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getShowEpisode } from "../../slices/tvshows";
import { Stack, StackItem, Text, Image, Heading } from "@chakra-ui/react";

const Episode = (props) => {
  const dispatch = useDispatch();
  const { isLoading, episode } = useSelector((state) => state.tvShow);
  const { tvId, season: seasonNo, episode: episodeNo } = props.match.params;
  useEffect(() => {
    dispatch(getShowEpisode({ tvId, seasonNo, episodeNo }));
    return () => {
      // dispatch(clearShowEpisode());
    };
  }, [dispatch, tvId, seasonNo, episodeNo]);
  return (
    <>
      {!isLoading ? (
        <Stack p={4} display="flex" direction="row" columnGap={3} bg="black">
          <StackItem flex={1}>
            <Image
              src={`https://image.tmdb.org/t/p/w500/${episode.still_path}`}
              objectFit="cover"
              zIndex={1}
            />
          </StackItem>
          <StackItem flex={2} textAlign="left">
            <Heading as="h2" size="lg" color="white">
              {episode.name}
            </Heading>
            <Text color="white">{episode.overview}</Text>
            {episode?.guest_stars.map((guest) => (
              <Stack display={"inline-block"} margin={2}>
                <Image
                  src={`https://image.tmdb.org/t/p/w500/${guest.profile_path}`}
                  height={100}
                  width={100}
                  borderRadius={"50%"}
                  objectFit="cover"
                  zIndex={1}
                />
                <Text color="white">{guest.name}</Text>
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

export default withRouter(Episode);
