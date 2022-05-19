import React, { useEffect } from "react";
import { withRouter } from "react-router-dom";
import { Flex, Heading, Image, Stack, Text, Button } from "@chakra-ui/react";
import Header from "../Header/index";
import MovieList from "./MovieList";
import { useDispatch, useSelector } from "react-redux";
import { getMovies } from "../../slices/movie";
import { getList } from "../../slices/list";
import { getTvShows } from "../../slices/tvshows";

const Account = (props) => {
  const movies = useSelector((state) => state.movie.movies);
  const list = useSelector((state) => state.list.list);
  const { isLoading, tvShows } = useSelector((state) => state.tvShow);
  const user = props?.match?.params?.id;

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getMovies());
    dispatch(getTvShows());
    dispatch(getList(user));
  }, [dispatch]);
  return (
    <>
      {!isLoading ? (
        <>
          <Header />
          <Stack>
            <Image
              src="https://images.unsplash.com/photo-1645921471748-bd014a82a05a?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1367&q=80"
              height={500}
              width={"100%"}
              objectFit="cover"
              zIndex={1}
            />
            {/* name of movie and description */}
            <Stack
              spacing={4}
              columnGap={4}
              justifyContent="center"
              direction="column"
              align={"flex-start"}
              position={"absolute"}
              top={"40%"}
              left={"5%"}
              zIndex={2}
            >
              <Heading as="h2" size="lg" color="black">
                Name of Movie
              </Heading>
              <Text as="h3" size="lg" color="black">
                Description
              </Text>
              <Button
                size="lg"
                onClick={() => {
                  console.log("clicked");
                }}
              >
                Watch Now
              </Button>
            </Stack>
          </Stack>
          {/* movie list */}
          <MovieList title="Your List" data={list} from={"list"} />
          <MovieList
            title="Trending Movies"
            data={movies.length > 0 && movies}
            from={"trending"}
          />
          <MovieList
            title="Trending Tv Shows"
            data={tvShows.length > 0 && tvShows}
            from={"tvShow"}
          />
        </>
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

export default withRouter(Account);
