
import { useTonConnect } from "./useTonConnect";
import { getHttpV4Endpoint } from "@orbs-network/ton-access";
import { useEffect, useState } from "react";
import { TonClient4 } from "ton";

export function useTonClient() {
    const { network } = useTonConnect();
    const [client, setClient] = useState<TonClient4 | null>(null); // Explicitly type the state
    useEffect(() => {
        if (!network) {
            setClient(null);
            return;
        }

        const initializeClient = async () => {
            const endpoint = await getHttpV4Endpoint({ network: "testnet" });
            const newClient = new TonClient4({ endpoint });
            setClient(newClient);
        };

        initializeClient();
    }, [network]); 

    return { client };
}
