import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { AlertProvider } from "./providers";

import RouterApp from "./router";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <AlertProvider.default>
      <RouterApp />
    </AlertProvider.default>
  </QueryClientProvider>
);

export default App;
