import "./App.css";
import styled from "styled-components";
import { Button, FlexBoxCol, FlexBoxRow } from "./components/styled/styled";
import { CHAIN, TonConnectButton , TonConnectUIProvider , THEME} from "@tonconnect/ui-react";
import SimpleGame from './components/SimpleGame';
import { Jetton } from "./components/Jetton";
import "@twa-dev/sdk"
import WebApp from "@twa-dev/sdk";
import { useEffect } from "react";

const StyledApp = styled.div`
  background-color: #e8e8e8;
  color: black;

  @media (prefers-color-scheme: dark) {
    background-color: #222;
    color: white;
  }
  min-height: 100vh;
  padding: 20px 20px;
`;

const AppContainer = styled.div`
  max-width: 900px;
  margin: 0 auto;
`;

function App() {

  const showAlert = () => {
    WebApp.showAlert(`Hey there! You are currently on ${WebApp.platform}`);
  };

  useEffect(() => {
    WebApp.expand();
  }, []);

  return (
    <TonConnectUIProvider
          manifestUrl="https://extiint.github.io/TonMiner/tonconnect-manifest.json"
          uiPreferences={{ theme: THEME.DARK }}
          walletsListConfiguration={{
            includeWallets: [
              {
                appName: "safepalwallet",
                name: "SafePal",
                imageUrl: "https://s.pvcliping.com/web/public_image/SafePal_x288.png",
                aboutUrl: "https://www.safepal.com/download",
                jsBridgeKey: "safepalwallet",
                platforms: ["ios", "android", "chrome", "firefox"]
              },
              {
                appName: "tonwallet",
                name: "TON Wallet",
                imageUrl: "https://wallet.ton.org/assets/ui/qr-logo.png",
                aboutUrl: "https://chrome.google.com/webstore/detail/ton-wallet/nphplpgoakhhjchkkhmiggakijnkhfnd",
                universalLink: "https://wallet.ton.org/ton-connect",
                jsBridgeKey: "tonwallet",
                bridgeUrl: "https://bridge.tonapi.io/bridge",
                platforms: ["chrome", "android"]
              }
            ]
          }}
          actionsConfiguration={{
              twaReturnUrl: 'https://t.me/DemoDappWithTonConnectBot/demo'
          }}
      >
         <div style={{
            position: 'absolute',
            top: '10px',
            left: '50%',
            transform: 'translateX(-50%)'
        }}>
            <TonConnectButton />
        </div>
        <div className="full-screen">
            <SimpleGame />
        </div>

         
    </TonConnectUIProvider>
  );
}

export default App;
