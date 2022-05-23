import { useSuperHeroesData } from "../../hooks/SuperHero/useSuperHeroData";
import { Link } from "react-router-dom";
import { Button } from "@chakra-ui/react";
import SuperHero from "../SuperHero/SuperHero";
import SuperHeroesTable from "../SuperHero/SuperHeroesTable";
import SuperHeroMaterialTable from "../SuperHero/SuperHeroMaterialTable";
const SuperHeroes = () => {
  // const {
  //   isLoading: isLoadingSuperHeroes,
  //   data: superHeroesData,
  //   isError,
  //   error,
  //   refetch,
  //   isFetching,
  // } = useSuperHeroesData();

  // if (isLoadingSuperHeroes) {
  //   return <h2>Loading...</h2>;
  // }

  // if (isError) {
  //   return (
  //     <>
  //       <Button onClick={refetch}>Try connection</Button>
  //       <h2>{error.message}</h2>
  //     </>
  //   );
  // }
  console.log("main render");
  return (
    <>
      {/* <Button onClick={refetch}>Fetch heroes</Button>
      <SuperHero refetch={refetch} /> */}
      <SuperHero />
      {/* <SuperHeroesTable /> */}
      <SuperHeroMaterialTable />
      {/* {superHeroesData.data.map((hero) => {
        return (
          <div key={hero.id}>
            <Link to={`/rq-super-heroes/${hero.id}`}>
              {hero.id} {hero.name}
            </Link>
          </div>
        );
      })} */}
    </>
  );
};

export default SuperHeroes;
