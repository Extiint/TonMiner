import { Address } from "ton-core";
import { useJettonContract } from "../hooks/useJettonContract";
import { useTonConnect } from "../hooks/useTonConnect";
import {
  Card,
  FlexBoxCol,
  FlexBoxRow,
  Button,
  Ellipsis,
} from "./styled/styled";

export function Jetton() {
  const {connected, wallet} = useTonConnect()
  const {balance , miner, lasthatch,rewards, buy,sell} = useJettonContract()

  const formatDate = (timestamp: number) => {
    const date = new Date(timestamp * 1000); // Convert Unix timestamp to milliseconds
    return date.toLocaleString(); // Converts to local date and time
  };

  return (
    <Card title="Jetton">
      <FlexBoxCol>
        <h3>TON Miner</h3>
        <FlexBoxRow>
          Wallet
          <Ellipsis>{ wallet ? Address.parse(wallet as string).toString() : "Loading..."}</Ellipsis>
        </FlexBoxRow>
        <FlexBoxRow>
          Contract Balance: {balance} TON
        </FlexBoxRow>
        <FlexBoxRow>
          Your Miners: {Number(miner)}
        </FlexBoxRow>
        <FlexBoxRow>
          Last Hatch: {(formatDate(lasthatch))}
        </FlexBoxRow>
        <FlexBoxRow>
          Rewards: {rewards} TON
        </FlexBoxRow>
        <FlexBoxRow>
        <Button
          disabled={!connected} onClick={buy}>
          Buy Miners
        </Button>
        <Button
          disabled={!connected} onClick={buy}>
          Hatch
        </Button>
        <Button
          disabled={!connected} onClick={sell}>
          Sell Eggs
        </Button>
        </FlexBoxRow>
      </FlexBoxCol>
    </Card>
  );
}
