import { Button } from "@chakra-ui/react";
import Process from "./Process";
import { useSuperHeroesData } from "../../hooks/process/useProcessData";

const Processes = () => {
  const { isLoading, data, isError, error, refetch, isFetching } =
    useSuperHeroesData();

  if (isLoading) {
    return <h2>Loading...</h2>;
  }

  if (isError) {
    return <h2>{error.message}</h2>;
  }

  return (
    <>
      <Process />
    </>
  );
};

export default Processes;
