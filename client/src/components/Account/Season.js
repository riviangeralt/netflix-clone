import React, { useEffect, useState } from "react";
import { withRouter } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  Stack,
  Heading,
  Text,
  StackItem,
  Image,
  filter,
} from "@chakra-ui/react";
import { getShowSeason, clearShowSeason } from "../../slices/tvshows";
import Controls from "../controls/Controls";
import { useForm, FormProvider } from "react-hook-form";

const Season = (props) => {
  const dispatch = useDispatch();
  const methods = useForm();
  const { isLoading, season } = useSelector((state) => state.tvShow);
  const [filteredEpisodes, setFilteredEpisodes] = useState([]);
  const { tvId, season: seasonNo } = props.match.params;
  useEffect(() => {
    dispatch(getShowSeason({ tvId, seasonNo }));
    // if (filteredEpisodes.length === 0) {
    setFilteredEpisodes(season?.episodes);
    // }
    return () => {
      dispatch(clearShowSeason());
    };
  }, [dispatch, tvId, seasonNo]);
  useEffect(() => {}, [filteredEpisodes]);
  const searchEpisode = (data) => {
    console.log(data);
    if (data) {
      const filtered = season?.episodes?.filter(
        (episode) =>
          episode.name.toLowerCase().includes(data.toLowerCase()) ||
          episode.overview.toLowerCase().includes(data.toLowerCase())
      );
      setFilteredEpisodes(filtered);
    } else if (data === "") {
      setFilteredEpisodes(season?.episodes);
    }
  };
  return (
    <>
      {!isLoading && Object.keys(season).length !== 0 ? (
        <Stack p={4} display="flex" direction="row" columnGap={3} bg="black">
          <StackItem flex={1}>
            <Image
              src={`https://image.tmdb.org/t/p/w500/${season.poster_path}`}
              height={600}
              width={"100%"}
              objectFit="cover"
              zIndex={1}
            />
          </StackItem>
          <StackItem flex={2} textAlign="left">
            <Stack direction="row" justifyContent={"space-between"}>
              <Heading as="h2" size="lg" color="white">
                {season.name}
              </Heading>
              <Stack>
                <Controls.FormInput
                  name="season"
                  label="Season"
                  placeholder="Search Episode"
                  control={methods.control}
                  register={methods.register}
                  error={methods.formState.errors}
                  width={200}
                  color="white"
                  right={0}
                  onChange={(e) => {
                    searchEpisode(e.target.value);
                  }}
                  autoComplete="off"
                />
              </Stack>
            </Stack>

            {/* episodes */}
            <Stack
              spacing={4}
              columnGap={4}
              display={"grid"}
              gridTemplateColumns={"repeat(auto-fit, minmax(200px, 1fr))"}
              mt={4}
            >
              {filteredEpisodes !== undefined
                ? filteredEpisodes.map((episode) => (
                    <StackItem key={episode.id}>
                      <Image
                        src={`https://image.tmdb.org/t/p/w500/${episode.still_path}`}
                        height={200}
                        width={"100%"}
                        objectFit="cover"
                        zIndex={1}
                        cursor={"pointer"}
                        onClick={() => {
                          props.history.push(
                            `/tv/${tvId}/season/${seasonNo}/episode/${episode.episode_number}`
                          );
                        }}
                      />
                      <Heading as="h4" size="md" color="white" mt={2}>
                        {episode.episode_number} - {episode.name}
                      </Heading>
                      <Text as="h4" size="lg" color="white">
                        {episode.overview.substring(0, 100)}
                        ...{" "}
                      </Text>
                    </StackItem>
                  ))
                : season?.episodes?.map((episode) => (
                    <StackItem key={episode.id}>
                      <Image
                        src={`https://image.tmdb.org/t/p/w500/${episode.still_path}`}
                        height={200}
                        width={"100%"}
                        objectFit="cover"
                        zIndex={1}
                        cursor={"pointer"}
                        onClick={() => {
                          props.history.push(
                            `/tv/${tvId}/season/${seasonNo}/episode/${episode.episode_number}`
                          );
                        }}
                      />
                      <Heading as="h4" size="md" color="white" mt={2}>
                        {episode.episode_number} - {episode.name}
                      </Heading>
                      <Text as="h4" size="lg" color="white">
                        {episode.overview.substring(0, 100)}
                        ...{" "}
                      </Text>
                    </StackItem>
                  ))}
            </Stack>
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

export default withRouter(Season);
