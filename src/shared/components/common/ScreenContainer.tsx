import { ReactNode } from "react";
import { SafeAreaView } from "react-native-safe-area-context";

interface ScreenContainerProps {
  children: ReactNode;
  noPadding?: boolean;
}

export function ScreenContainer({
  children,
  noPadding = false,
}: ScreenContainerProps) {
  return (
    <SafeAreaView
      edges={["top"]}
      style={{
        flex: 1,
        backgroundColor: "#FAFAFA",
        paddingHorizontal: noPadding ? 0 : 20,
      }}
    >
      {children}
    </SafeAreaView>
  );
}