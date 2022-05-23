import { Text } from "@chakra-ui/react";

const Dashboard = () => {
  return (
    <div className="dashboard">
      <Text
        bgGradient="linear(to-l, #7928CA, #FF0080)"
        bgClip="text"
        fontSize="6xl"
        fontWeight="extrabold"
      >
        Welcome to Smart FFT
      </Text>
    </div>
  );
};

export default Dashboard;
