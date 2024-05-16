import { useEffect, useState } from "react";
import { Address, fromNano, OpenedContract, toNano } from "ton-core";
import {DiamonDash , BuyPickAxe } from "../../buildContract/DiamondDash/tact_DiamonDash";
import { useAsyncInitialize } from "./useAsyncInitialize";
import { useTonClient } from "./useTonClient";
import { useTonConnect } from "./useTonConnect";
import { useLocation } from "react-router-dom";

export function useJettonContract() {
    const {client} = useTonClient();
    const {wallet, sender} = useTonConnect();
    const [balance, setBalance] = useState(0);
    const [userbalance, setUserbalance] = useState(0);

    const [miner, setMiner] = useState(0);
    const [lasthatch, setlastHatch] = useState(0);
    const [rewards, setrewards] = useState(0);
    const [refCode, setRefCode] = useState<string | null>(null);

    let isSync = false;
    const { search } = useLocation();
    

    const jettonContract = useAsyncInitialize(async()=>{
        
    console.log(search,"log")
        if(!client || !wallet) return;
        const queryParams = new URLSearchParams(search);
        const startParam = queryParams.get('tgWebAppStartParam');
        console.log('Extracted Code:', startParam);  // This should log 'my_code'
        setRefCode(startParam);
        const contract = DiamonDash.fromAddress(Address.parse("EQAeRDReVfFAbqu-Nm-hfy1iAis8dheHuMmyHrXfrXmszWwu"))
        return client.open(contract) as OpenedContract<DiamonDash>
    }, [client, wallet])


    useEffect(() => {

        let intervalId: ReturnType<typeof setInterval> | null = null; 
        
        async function updateBalance() {
            if (!jettonContract || !wallet || !client) return;
            try {
                if (isSync){return;}
                isSync = true;
                const address = Address.parse(Address.parse(wallet!).toString());

                const fetchedBalance = await jettonContract.getMybalance();
                const latestBlock = (await client.getLastBlock()).last.seqno;
                const balance = await client.getAccount(latestBlock,address);
                setUserbalance(Number(fromNano(balance.account.balance.coins)));
                const balanceInNano = fromNano(fetchedBalance);
                setBalance(Number(balanceInNano));

                if(Number(balanceInNano) > 0){
                  
                    console.log("reached")
                    const [fetchedMiner, lastHatch, myeggs] = await Promise.all([
                        jettonContract.getLastCheck(address),
                        jettonContract.getLastCheck(address),
                        jettonContract.getLastCheck(address),
                    ]);
                    
                    const rewards = await jettonContract.getLastCheck(address);
                    //const ww = await jettonContract.hatchEggs();
                    isSync = false;
                    setlastHatch(Number(lastHatch));
                    setMiner(Number(fetchedMiner));
                    setrewards(Number(fromNano(rewards)));
            }
            } catch (error) {
                console.error('Error fetching balance:', error);
                isSync = false;
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
        userbalance,
        miner,
        lasthatch,
        rewards,
        buy: (number: bigint) => {
            const message: BuyPickAxe = {
                $$type: "BuyPickAxe",
                ref: number
            }

            jettonContract?.send(sender, {
                value: toNano("1")
            }, message)
        },
        sell: () => {
            jettonContract?.send(sender, {
                value: toNano("0.05")
            }, "Withdraw")
        }
    }
}