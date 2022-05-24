import { useSuperHeroesData } from "../../hooks/SuperHero/useSuperHeroData";
import { Link } from "react-router-dom";
import { Button } from "@chakra-ui/react";
import SuperHero from "../SuperHero/SuperHero";
import SuperHeroesTable from "../SuperHero/SuperHeroesTable";
import SuperHeroMaterialTable from "../SuperHero/SuperHeroMaterialTable";
import SuperHeroSearch from "../SuperHero/SuperHeroSearch";

import { createRef, useState } from "react";
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
  // console.log("main render");

  const tableRef = createRef();
  const [nameForSearch, setNameForSearch] = useState("");

  const [muiTableKey, setMuiTableKey] = useState(0);
  return (
    <>
      {/* <Button onClick={refetch}>Fetch heroes</Button>
      <SuperHero refetch={refetch} /> */}
      <SuperHero
        tableRef={tableRef}
        muiTableKey={muiTableKey}
        setMuiTableKey={setMuiTableKey}
        setNameForSearch={setNameForSearch}
      />
      <br /> <br />
      <SuperHeroSearch
        tableRef={tableRef}
        nameForSearch={nameForSearch}
        setNameForSearch={setNameForSearch}
      />
      {/* <SuperHeroesTable /> */}
      <br /> <br />
      <SuperHeroMaterialTable
        tableRef={tableRef}
        nameForSearch={nameForSearch}
        muiTableKey={muiTableKey}
        setMuiTableKey={setMuiTableKey}
        setNameForSearch={setNameForSearch}
      />
      {/* {superHeroesData.data.map((hero) => {
        return (
          <div key={hero.id}>
            <Link to={`/rq-super-heroes/${hero.id}`}>
              {hero.id} {hero.nameForSearch}
            </Link>
          </div>
        );
      })} */}
    </>
  );
};

export default SuperHeroes;
