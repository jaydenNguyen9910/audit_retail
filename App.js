import { SafeAreaView } from "react-native";

import RootStack from "./navigators/RootStack";

export default function App() {
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <RootStack />
    </SafeAreaView>
  );
}
