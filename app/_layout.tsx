import { Stack } from "expo-router";
import { verifyInstallation } from 'nativewind';
import "../app/global.css"

export default function RootLayout() {
  verifyInstallation();
  return <Stack />;
}
