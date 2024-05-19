import { useEffect, useState } from "react";
import { Address, fromNano, OpenedContract, toNano } from "ton-core";
import {DiamonDash , BuyPickAxe , Reinvest} from "../../build/DiamondDash/tact_DiamonDash";
import { useAsyncInitialize } from "./useAsyncInitialize";
import { useTonClient } from "./useTonClient";
import { useTonConnect } from "./useTonConnect";
import { useLocation } from "react-router-dom";
import { User } from "../../build/DiamondDash/tact_DiamonDash";
import axios from 'axios';

const instance = axios.create({
  timeout: 10000, // Increase timeout to 10 seconds
});
export function useJettonContract() {
    const {client} = useTonClient();
    const {wallet, sender} = useTonConnect();
    const [balance, setBalance] = useState(0);
    const [level, setLevel] = useState(0)
    const [hash, sethash] = useState(0)
    const [roi, setroi] = useState(0)
    const [penalty, setPenalty] = useState(0);
    const [upgradewen, setUpgradewen] = useState(0);
    const [mycode, setMycode] = useState<number | string>('0000'); 
    const [promorewards, setPromorewards] = useState<bigint | null>(null);  

    const [userbalance, setUserbalance] = useState(0);
    const [userAddress, setuserAddress] = useState('');
    const [canStart, setcanStart] = useState(false);

    const [stats, setStats] = useState<User | null>(null); 
    const [rewards, setrewards] = useState(0);
    const [refCode, setRefCode] = useState<string | null>('https://t.me/diamondDashBot/?start=');

    let isSync = false;
    const { search } = useLocation();
    

    const jettonContract = useAsyncInitialize(async()=>{
        console.log("check1")
        try{

        const queryParams = new URLSearchParams(search);
        const startParam = queryParams.get('tgWebAppStartParam');
        if (startParam) {
            const [refCode, myCode] = startParam.split('_');
            setRefCode('https://t.me/diamondDashBot/?start=' + myCode);
            console.log('Ref Code:', refCode);
            console.log('My Code:', myCode);
        }
        if(!client || !wallet) return;
        console.log("check1 entered")
        const contract = DiamonDash.fromAddress(Address.parse("EQANEaznqpfPnJWyJ0gVjgOq_waPKyzPxFxNC_EtpHnJZdFT"))
        return client.open(contract) as OpenedContract<DiamonDash>
    } catch(error){
        console.log(error)
    }
    }, [client, wallet])

    useEffect(() => {
        let intervalId: ReturnType<typeof setInterval> | null = null;
        async function updateBalance() {
            if (!jettonContract || !wallet || !client) return;
            try {
                if (isSync) return;
                isSync = true;
    
                const address = Address.parse(Address.parse(wallet!).toString());
                setuserAddress(Address.parse(wallet!).toString());
    
                const fetchedBalance = await jettonContract.getMybalance();
                const balanceInNano = fromNano(fetchedBalance);
                setBalance(Number(balanceInNano));
                console.log("try")
                if (address) {
                    const latestBlock = (await client.getLastBlock()).last.seqno;
    
                    const [balance, promo, currRewards, stats] = await Promise.all([
                        client.getAccount(latestBlock, address),
                        jettonContract.getLastCheck(address),
                        jettonContract.getGetRewards(address),
                        jettonContract.getBalanceOff(address)
                    ]);
    
                    setUserbalance(Number(fromNano(balance.account.balance.coins)));
    
                    if (stats) {
                        setStats(stats);
                        setrewards(Number(fromNano(currRewards)));
                        setLevel(Number(stats?.level));
                        sethash(Number(fromNano(stats?.deposit)));
                        setroi(Number(stats?.roi) / 10);
                        setPenalty(Number(stats?.penalty) / 10);
                        setUpgradewen(Number(stats?.upCheck));
                        setMycode(Number(stats?.prom_code));
    
                        if (stats.prom_code) {
                            const toWithdraw = await jettonContract.getPromoRewards(stats.prom_code);
                            setPromorewards(((toWithdraw)));
                            console.log(toWithdraw, "rewards");
                        }
                    }
                    isSync = false;
                }
                console.log("try2")

            } catch (error) {
                console.error('Error fetching balance:', error);
                isSync = false; 
                updateBalance();
                setcanStart(true);
            }
        }
    
        intervalId = setInterval(updateBalance, 5000);  // Update every 3000 ms.
    
        return () => {
            if (intervalId) clearInterval(intervalId);
        };
    }, [jettonContract, wallet, client]);

    return {
        refCode,
        balance,
        promorewards,
        userAddress,
        userbalance,
        stats,
        level,
        rewards,
        hash,
        roi,
        penalty,
        upgradewen,
        canStart,
        mycode,
        buy: (value: bigint, number: bigint) => {
            const message: BuyPickAxe = {
                $$type: "BuyPickAxe",
                ref: number
            }

            jettonContract?.send(sender, {
                value: toNano(value)
            }, message)
        },
        reinvest: () => {
            const message: Reinvest = {
                $$type: "Reinvest",
                code: BigInt(0),
                amount: BigInt(0)
            }

            jettonContract?.send(sender, {
                value: toNano("0.05")
            }, message)
        },
        sell: () => {
            jettonContract?.send(sender, {
                value: toNano("0.05")
            }, "Withdraw")
        },
        upgrade: () => {
            jettonContract?.send(sender, {
                value: toNano("0.05")
            }, "Upgrade")
        },
        withdrawrewards: () => {
            jettonContract?.send(sender, {
                value: toNano("0.05")
            }, "Upgrade")
        }
    }
}