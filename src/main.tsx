import { BrowserRouter } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";
import { TonConnectUIProvider } from "@tonconnect/ui-react";

const manifestUrl = "https://extiint.github.io/TonMiner/tonconnect-manifest.json";

const queryClient = new QueryClient({
  defaultOptions: { queries: { refetchOnWindowFocus: false } },
});

const rootElement = document.getElementById("root") as HTMLElement;
const root = ReactDOM.createRoot(rootElement);

root.render(
  <TonConnectUIProvider manifestUrl={manifestUrl}>
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </QueryClientProvider>
  </TonConnectUIProvider>
);
