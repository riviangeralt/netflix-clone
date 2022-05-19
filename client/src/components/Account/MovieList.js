import React, { useState } from "react";
import { Heading, Image, Stack, Avatar } from "@chakra-ui/react";
import { useDispatch } from "react-redux";
import { AddIcon, DeleteIcon } from "@chakra-ui/icons";
import { withRouter } from "react-router-dom";
import { listHandler } from "../../slices/list";

const MovieList = (props) => {
  const { title, data, from } = props;
  const dispatch = useDispatch();
  const [hover, setHover] = useState(false);
  const [movieIndex, setMovieIndex] = useState(null);
  const profile = props.match.params.id;
  return (
    <>
      {data.length > 0 ? (
        <Stack
          spacing={4}
          align="flex-start"
          justifyContent={"center"}
          direction="column"
          pt={6}
          px={4}
          pb={4}
          bg="black"
        >
          <Heading as="h2" size="lg" color="white" mb={4}>
            {title}
          </Heading>
          <Stack
            spacing={4}
            align="center"
            justifyContent={"flex-start"}
            columnGap={1}
            direction="row"
            overflowX={["scroll"]}
            width={"100%"}
            className="movie-list"
          >
            {data?.length > 0
              ? data.map((movie, index) => {
                  return (
                    <>
                      <Stack position={"relative"}>
                        <Image
                          src={`https://image.tmdb.org/t/p/w500${
                            from !== "list"
                              ? movie.poster_path
                              : movie.moviePoster
                          }`}
                          maxW={"unset"}
                          width={200}
                          zIndex={1}
                          cursor={
                            hover && movieIndex === index
                              ? "pointer"
                              : "default"
                          }
                          onClick={() => {
                            props.history.push(
                              from === "tvShow"
                                ? `/tv/${movie.id}`
                                : from !== "list"
                                ? `/movie/${movie.id}`
                                : `/movie/${movie.movieId}`
                            );
                          }}
                          onMouseEnter={() => {
                            setMovieIndex(index);
                            setHover(true);
                          }}
                          onMouseLeave={() => {
                            setMovieIndex(null);
                            setHover(false);
                          }}
                        />
                        {hover && movieIndex === index ? (
                          <Stack
                            display={"flex"}
                            width={250}
                            justifyContent={"center"}
                            position="absolute"
                            bottom={0}
                            left={0}
                            zIndex={3}
                            p={4}
                            onMouseEnter={() => {
                              setHover(true);
                              setMovieIndex(index);
                            }}
                          >
                            <Avatar
                              icon={
                                from !== "list" ? <AddIcon /> : <DeleteIcon />
                              }
                              size={"sm"}
                              cursor={"pointer"}
                              color={"black"}
                              bg={"white"}
                              onClick={() => {
                                dispatch(
                                  listHandler({
                                    id: profile,
                                    movie: {
                                      movieName:
                                        from !== "list"
                                          ? movie.title
                                          : movie.movieName,
                                      movieId:
                                        from !== "list"
                                          ? movie.id
                                          : movie.movieId,
                                      moviePoster:
                                        from !== "list"
                                          ? movie.poster_path
                                          : movie.moviePoster,
                                    },
                                  })
                                );
                              }}
                            />
                          </Stack>
                        ) : null}
                      </Stack>
                    </>
                  );
                })
              : null}
          </Stack>
        </Stack>
      ) : null}
    </>
  );
};

export default withRouter(MovieList);
