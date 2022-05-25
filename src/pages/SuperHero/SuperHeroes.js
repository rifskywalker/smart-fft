import { useSuperHeroesData } from "../../hooks/SuperHero/useSuperHeroData";
import { Link } from "react-router-dom";
import { Button, useDisclosure } from "@chakra-ui/react";
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
  const [actionMenu, setActionMenu] = useState(""); //Add , Edit

  const [rowSelectedForActions, setRowSelectedForActions] = useState(null);

  const [muiTableKey, setMuiTableKey] = useState(0);

  const {
    isOpen: isOpenManagePage,
    onOpen: onOpenManagePage,
    onClose: onCloseManagePage,
  } = useDisclosure();

  return (
    <>
      {/* <Button onClick={refetch}>Fetch heroes</Button>
      <SuperHero refetch={refetch} /> */}
      <Button
        onClick={() => {
          onOpenManagePage();
          setActionMenu("Add");
        }}
      >
        Add
      </Button>
      <SuperHero
        tableRef={tableRef}
        muiTableKey={muiTableKey}
        setMuiTableKey={setMuiTableKey}
        setNameForSearch={setNameForSearch}
        actionMenu={actionMenu}
        isOpenManagePage={isOpenManagePage}
        onOpenManagePage={onOpenManagePage}
        onCloseManagePage={onCloseManagePage}
        rowSelectedForActions={rowSelectedForActions}
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
        actionMenu={actionMenu}
        setActionMenu={setActionMenu}
        isOpenManagePage={isOpenManagePage}
        onOpenManagePage={onOpenManagePage}
        onCloseManagePage={onCloseManagePage}
        rowSelectedForActions={rowSelectedForActions}
        setRowSelectedForActions={setRowSelectedForActions}
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
