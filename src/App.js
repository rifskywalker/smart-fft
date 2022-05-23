//Chakra UI
import { ChakraProvider, Container } from "@chakra-ui/react";
import theme from "./theme/theme";

import MainRoutes from "./routes/Routes";
import Sidebar from "./layout/Sidebar";
import Header from "./layout/Header";

function App() {
  return (
    <ChakraProvider theme={theme}>
      {/* <Container> */}
      <Header />
      <Sidebar />
      <MainRoutes />
      {/* </Container> */}
    </ChakraProvider>
  );
}

export default App;
