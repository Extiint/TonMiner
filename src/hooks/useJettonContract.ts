import { useEffect, useState } from "react";
import { Address, fromNano, OpenedContract, toNano } from "ton-core";
import {Test , BuyMiners, SellEggs} from "../../build/Test/tact_Test";
import { useAsyncInitialize } from "./useAsyncInitialize";
import { useTonClient } from "./useTonClient";
import { useTonConnect } from "./useTonConnect";

const sleep = (time: number) => new Promise((resolve) => setTimeout(resolve, time))

export function useJettonContract() {
    const {client} = useTonClient();
    const {wallet, sender} = useTonConnect();
    const [balance, setBalance] = useState(0);
    const [miner, setMiner] = useState(0);
    const [lasthatch, setlastHatch] = useState(0);
    const [rewards, setrewards] = useState(0);
    const [refCode, setRefCode] = useState<string | null>(null);

    const jettonContract = useAsyncInitialize(async()=>{
        if(!client || !wallet) return;
        const queryParams = new URLSearchParams(window.location.search);
        const refCodeFromURL = queryParams.get('refCode') || null;
        setRefCode(refCodeFromURL);
        console.log(refCodeFromURL,"here")
        const contract = Test.fromAddress(Address.parse("EQDqFF0X1sAZYsg4rJ4u7ENrb_7nwQCbv4GOUtFnSib58S7_"))

        return client.open(contract) as OpenedContract<Test>
    }, [client, wallet])


    useEffect(() => {
        let intervalId: ReturnType<typeof setInterval> | null = null; 
        
        async function updateBalance() {
            if (!jettonContract || !wallet) return;
            try {
                const fetchedBalance = await jettonContract.getMybalance();
                const balanceInNano = fromNano(fetchedBalance);
                setBalance(Number(balanceInNano));

                if(Number(balanceInNano) > 0){
                    const address = Address.parse(Address.parse(wallet!).toString());
                    const fetchedMiner = await jettonContract.getHatcheryMiners(address);
                    const lastHatch = await jettonContract.getLastHatch(address);
                    const myeggs = await jettonContract.getGetMyEggs(address);
                    const rewards = await jettonContract.getCalculateEggSell(myeggs);
                    //const ww = await jettonContract.hatchEggs();

                    console.log(rewards)
                    setlastHatch(Number(lastHatch));
                    setMiner(Number(fetchedMiner));
                    setrewards(Number(fromNano(rewards)));
            }
            } catch (error) {
                console.error('Error fetching balance:', error);
            }
        }

        intervalId = setInterval(updateBalance, 2000);  // Update every 5000 ms.

        return () => {
            if (intervalId) clearInterval(intervalId);  // Clear interval on component unmount
        };
    }, [jettonContract, wallet]);

    return {
        refCode,
        balance,
        miner,
        lasthatch,
        rewards,
        buy: () => {
            const message: BuyMiners = {
                $$type: "BuyMiners",
            }

            jettonContract?.send(sender, {
                value: toNano("1")
            }, message)
        },
        sell: () => {
            const message: SellEggs = {
                $$type: "SellEggs",
            }

            jettonContract?.send(sender, {
                value: toNano("0.05")
            }, message)
        }
    }
}