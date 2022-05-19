import React, { useEffect } from "react";
import { Link, withRouter } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getIndividualMovie, clearSelectedMovie } from "../../slices/movie";
import { getIndividualTvShow, clearSelectedTvShow } from "../../slices/tvshows";
import {
  Image,
  Heading,
  Text,
  Stack,
  StackItem,
  Tag,
  Button,
  Icon,
} from "@chakra-ui/react";
import millify from "millify";
import Controls from "../controls/Controls";

const Movie = (props) => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getIndividualMovie(props.match.params.movieId));
    dispatch(getIndividualTvShow(props.match.params.tvShowId));
    return () => {
      dispatch(clearSelectedTvShow());
      dispatch(clearSelectedMovie());
    };
  }, [dispatch, props.match.params.movieId, props.match.params.tvShowId]);
  const movie = useSelector((state) => state.movie.individualMovie);
  const tvShow = useSelector((state) => state.tvShow.individualTvShow);
  return (
    <>
      {props.match.params.movieId ? (
        Object.keys(movie).length === 0 ? (
          <Stack justifyContent="center" alignItems="center" height="100%">
            <Text color="white" fontSize="xl">
              Loading...
            </Text>
          </Stack>
        ) : (
          <Stack p={4} display="flex" direction="row" bg="black">
            <StackItem flex={1}>
              <Image
                src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                maxW={"unset"}
                height={600}
                zIndex={1}
              />
            </StackItem>
            <StackItem flex={2} textAlign="left">
              <Heading
                as="h2"
                size="lg"
                mb={4}
                color="white"
                display="flex"
                justifyContent="space-between"
              >
                {movie.title} ({movie.release_date?.split("-")[0]})
                <Button
                  variantColor="blue"
                  variant="outline"
                  size="sm"
                  _hover={{
                    bg: "white",
                    color: "black",
                  }}
                  rightIcon={
                    <span class="iconify" data-icon="carbon:add-filled"></span>
                  }
                  onClick={() => {}}
                >
                  Add to List
                </Button>
              </Heading>
              <Text fontSize="sm" color="white">
                {movie.overview}
              </Text>
              <Stack align="center" direction="row" mt={4}>
                {movie.genres.map((genre) => {
                  return (
                    <Tag size="sm" color="black">
                      {genre.name}
                    </Tag>
                  );
                })}
              </Stack>
              {/* release date */}
              <Text fontSize="sm" color="white" fontWeight={400} mt={4}>
                Release Date : {movie.release_date}
              </Text>
              {/* runtime */}
              <Text fontSize="sm" color="white" fontWeight={400} mt={2}>
                Runtime : {movie.runtime} mins
              </Text>
              {/* budget */}
              <Text fontSize="sm" color="white" fontWeight={400} mt={2}>
                Budget : {millify(movie.budget)}
              </Text>
              {/* revenue */}
              <Text fontSize="sm" color="white" fontWeight={400} mt={2}>
                Revenue : {millify(movie.revenue)}
              </Text>
              {/* production companies */}
              <Text fontSize="sm" color="white" fontWeight={400} mt={2}>
                Production Companies :
                <Stack align="center" direction="row" mt={2} bg="white" p={2}>
                  {movie.production_companies.map((company) => {
                    return (
                      <Image
                        src={`https://image.tmdb.org/t/p/w500${company.logo_path}`}
                        maxW={"unset"}
                        //   height={20}
                        width={20}
                        zIndex={1}
                        ml={2}
                      />
                    );
                  })}
                </Stack>
              </Text>
              {/* status */}
              <Text fontSize="sm" color="white" fontWeight={400} mt={2}>
                Status : {movie.status}
              </Text>
              {movie.belongs_to_collection && (
                <Text fontSize="sm" color="white" fontWeight={400} mt={2}>
                  Belongs to :
                  <Stack align="center" direction="row" mt={2}>
                    <Image
                      src={`https://image.tmdb.org/t/p/w500${movie.belongs_to_collection.poster_path}`}
                      maxW={"unset"}
                      height={200}
                      cursor={"pointer"}
                      zIndex={1}
                      onClick={() => {
                        props.history.push(
                          `/collection/${movie.belongs_to_collection.id}`
                        );
                      }}
                    />
                  </Stack>
                  {movie.belongs_to_collection.name}
                </Text>
              )}
              {/* backdrop */}
              <Button
                variantColor="blue"
                mt={4}
                leftIcon={
                  <span class="iconify" data-icon="clarity:play-solid"></span>
                }
              >
                Watch Trailer
              </Button>
              <Button
                variantColor="blue"
                mt={4}
                ml={4}
                leftIcon={
                  <span
                    class="iconify"
                    data-icon="fluent:ticket-diagonal-20-filled"
                  ></span>
                }
              >
                Buy Tickets
              </Button>
              <Button
                variantColor="blue"
                mt={4}
                ml={4}
                leftIcon={
                  <span
                    class="iconify"
                    data-icon="carbon:skip-back-filled"
                  ></span>
                }
                onClick={() => {
                  props.history.goBack();
                }}
              >
                Go Back
              </Button>
            </StackItem>
          </Stack>
        )
      ) : Object.keys(tvShow).length === 0 ? (
        <Stack justifyContent="center" alignItems="center" height="100%">
          <Text color="white" fontSize="xl">
            Loading...
          </Text>
        </Stack>
      ) : (
        <Stack p={4} display="flex" direction="row" bg="black">
          <StackItem flex={1}>
            <Image
              src={`https://image.tmdb.org/t/p/w500${tvShow?.poster_path}`}
              maxW={"unset"}
              height={600}
              zIndex={1}
            />
          </StackItem>
          <StackItem flex={2} textAlign="left">
            <Heading
              as="h2"
              size="lg"
              mb={4}
              color="white"
              display="flex"
              justifyContent="space-between"
            >
              {tvShow?.name} ({tvShow?.first_air_date?.split("-")[0]})
              <Button
                variantColor="blue"
                variant="outline"
                size="sm"
                _hover={{
                  bg: "white",
                  color: "black",
                }}
                rightIcon={
                  <span class="iconify" data-icon="carbon:add-filled"></span>
                }
                onClick={() => {}}
              >
                Add to List
              </Button>
            </Heading>
            <Text fontSize="sm" color="white">
              {tvShow.overview}
            </Text>
            <Stack align="center" direction="row" mt={4}>
              {tvShow.genres.length > 0 &&
                tvShow?.genres.map((genre) => {
                  return (
                    <Tag size="sm" color="black">
                      {genre.name}
                    </Tag>
                  );
                })}
            </Stack>
            {/* release date */}
            <Text fontSize="sm" color="white" fontWeight={400} mt={4}>
              First Air Date : {tvShow.first_air_date}
            </Text>
            <Text fontSize="sm" color="white" fontWeight={400} mt={2}>
              Last Air Date : {tvShow.last_air_date}
            </Text>
            {/* runtime */}
            <Text fontSize="sm" color="white" fontWeight={400} mt={2}>
              Episode Runtime :{" "}
              {tvShow.episode_run_time.length > 1
                ? tvShow.episode_run_time.join("-")
                : tvShow.episode_run_time}{" "}
              mins
            </Text>
            {/* budget */}
            <Text fontSize="sm" color="white" fontWeight={400} mt={2}>
              No of Episodes : {tvShow.number_of_episodes}
            </Text>
            {/* revenue */}
            <Text fontSize="sm" color="white" fontWeight={400} mt={2}>
              No of Seasons : {tvShow.number_of_seasons}
            </Text>
            {/* production companies */}
            <Text fontSize="sm" color="white" fontWeight={400} mt={2}>
              Production Companies :
              <Stack align="center" direction="row" mt={2} bg="white" p={2}>
                {tvShow.production_companies.map((company) => {
                  return (
                    <Image
                      src={`https://image.tmdb.org/t/p/w500${company.logo_path}`}
                      maxW={"unset"}
                      //   height={20}
                      width={20}
                      zIndex={1}
                      ml={2}
                    />
                  );
                })}
              </Stack>
            </Text>
            {/* status */}
            <Text fontSize="sm" color="white" fontWeight={400} mt={2}>
              Status : {tvShow.status}
            </Text>
            <Text fontSize="sm" color="white" fontWeight={400} mt={2}>
              Seasons :
              <Stack
                align="center"
                direction="row"
                mt={2}
                p={2}
                overflow={"scroll hidden"}
                className="movie-list"
              >
                {tvShow.seasons.map((season) => {
                  return (
                    <Stack display="flex" direction="column">
                      <Image
                        src={`https://image.tmdb.org/t/p/w500${season.poster_path}`}
                        maxW={"unset"}
                        width={100}
                        zIndex={1}
                        ml={2}
                        onClick={() => {
                          props.history.push(
                            `/tv-show/${tvShow.id}/season/${season.season_number}`
                          );
                        }}
                        cursor="pointer"
                      />

                      <Text fontSize="sm" color="white" fontWeight={400}>
                        {season.name}
                      </Text>
                    </Stack>
                  );
                })}
              </Stack>
            </Text>
            {/* backdrop */}
            <Button
              variantColor="blue"
              mt={4}
              leftIcon={
                <span class="iconify" data-icon="clarity:play-solid"></span>
              }
            >
              Watch Trailer
            </Button>
            <Button
              variantColor="blue"
              mt={4}
              ml={4}
              leftIcon={
                <span
                  class="iconify"
                  data-icon="fluent:ticket-diagonal-20-filled"
                ></span>
              }
            >
              Buy Tickets
            </Button>
            <Button
              variantColor="blue"
              mt={4}
              ml={4}
              leftIcon={
                <span
                  class="iconify"
                  data-icon="carbon:skip-back-filled"
                ></span>
              }
              onClick={() => {
                props.history.goBack();
              }}
            >
              Go Back
            </Button>
          </StackItem>
        </Stack>
      )}
    </>
  );
};

export default withRouter(Movie);
