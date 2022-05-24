import { Button, Input, Text, FormLabel, FormControl } from "@chakra-ui/react";

const SuperHeroSearch = ({ tableRef, nameForSearch, setNameForSearch }) => {
  const handleChange = (event) => setNameForSearch(event.target.value);

  const handleClickSearch = () => {
    return tableRef.current && tableRef.current.onQueryChange();
  };

  return (
    <>
      <FormControl>
        <FormLabel htmlFor="processName">Process Name</FormLabel>

        <Input
          id="processName"
          value={nameForSearch}
          onChange={handleChange}
          placeholder="Process Name"
          // size="sm"
        />
        <Button onClick={handleClickSearch}>Search</Button>
      </FormControl>
    </>
  );
};

export default SuperHeroSearch;
