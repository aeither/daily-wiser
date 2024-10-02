"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { apiReact } from "@/trpc/react";
import {
  TOPUP_CONTRACT_ABI,
  TOPUP_CONTRACT_ADDRESS,
} from "@/utils/constants/topup";
import { format } from "date-fns";
import { useEffect, useState } from "react";
import { formatEther, parseEther } from "viem";
import {
  useAccount,
  useConnect,
  useWaitForTransactionReceipt,
  useWriteContract,
} from "wagmi";

const CREDITS_PER_ETH = 10000;

export default function Component() {
  const [credits, setCredits] = useState(100);
  const { isConnected, chain } = useAccount();
  const { connect, connectors } = useConnect();
  const utils = apiReact.useUtils();

  const { writeContract, data: hash, isPending } = useWriteContract();
  const {
    data: receipt,
    isSuccess,
    isLoading: isWaiting,
  } = useWaitForTransactionReceipt({ hash });
  const { mutate: extractEventAction } = apiReact.user.extractEvent.useMutation(
    {
      async onSuccess() {
        await utils.user.getPurchaseHistory.invalidate();
        await utils.user.getUser.invalidate();
      },
    }
  );

  const nativeCurrencySymbol = chain?.nativeCurrency.symbol || "ETH";

  useEffect(() => {
    if (isSuccess && receipt && hash) {
      extractEventAction({ txHash: hash });
    }
  }, [isSuccess, receipt, hash, extractEventAction]);

  const calculateCost = (credits: number) =>
    Number.parseFloat(
      formatEther((BigInt(credits) * BigInt(1e18)) / BigInt(CREDITS_PER_ETH))
    );

  const handleBuyCredits = async () => {
    if (!isConnected) {
      connect({ connector: connectors[0] });
      return;
    }

    const cost = calculateCost(credits);
    await writeContract({
      address: TOPUP_CONTRACT_ADDRESS,
      abi: TOPUP_CONTRACT_ABI,
      functionName: "topUpCredits",
      args: [],
      value: parseEther(cost.toString()),
    });
  };

  return (
    <div className="flex flex-col md:flex-row">
      <div className="flex flex-col items-center justify-center w-full p-8 space-y-4 md:w-1/2">
        <h2 className="text-2xl font-bold text-center">
          How many credits would you like to purchase?
        </h2>
        <p className="text-center text-muted-foreground">
          Calculate your credit cost
        </p>
        <div className="flex items-center space-x-2">
          <Input
            type="number"
            value={credits}
            onChange={(e) => setCredits(Number(e.target.value))}
            className="w-24 text-center border-2 border-blue-500 rounded-md"
          />
          <span>credits</span>
        </div>
        <div className="text-4xl font-bold text-center text-primary">
          {calculateCost(credits).toFixed(6)} {nativeCurrencySymbol}
        </div>
        <p className="text-center text-muted-foreground">one time</p>
        <Button
          className="w-full max-w-xs bg-red-600 hover:bg-red-700"
          onClick={handleBuyCredits}
          disabled={isPending || isWaiting}
        >
          {isWaiting
            ? "Processing..."
            : isConnected
              ? "BUY CREDITS"
              : "Connect Wallet"}
        </Button>
        {isSuccess && (
          <p className="text-green-500">Credits purchased successfully!</p>
        )}
      </div>
      <div className="flex flex-col items-center justify-center w-full p-8 md:w-1/2">
        <PricingTable nativeCurrencySymbol={nativeCurrencySymbol} />
        <PurchaseHistoryTable nativeCurrencySymbol={nativeCurrencySymbol} />
      </div>
    </div>
  );
}

function PricingTable({
  nativeCurrencySymbol,
}: { nativeCurrencySymbol: string }) {
  const pricingData = [1000, 5000, 10000, 50000, 100000];
  return (
    <>
      <h2 className="text-2xl font-bold mb-4">Pricing</h2>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Credits</TableHead>
            <TableHead>Cost in {nativeCurrencySymbol}</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {pricingData.map((credits) => (
            <TableRow key={credits}>
              <TableCell>{credits.toLocaleString()}</TableCell>
              <TableCell>
                {(credits / CREDITS_PER_ETH).toFixed(2)} {nativeCurrencySymbol}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </>
  );
}

function PurchaseHistoryTable({
  nativeCurrencySymbol,
}: { nativeCurrencySymbol: string }) {
  const { address, isConnected } = useAccount();
  const { data: purchaseHistory } = apiReact.user.getPurchaseHistory.useQuery(
    { address: address as string },
    { enabled: isConnected && !!address }
  );

  return (
    <>
      <h2 className="text-2xl font-bold mb-4">Purchase History</h2>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Date</TableHead>
            <TableHead>Credits</TableHead>
            <TableHead>Cost ({nativeCurrencySymbol})</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {purchaseHistory?.map((purchase, index) => (
            <TableRow key={index}>
              <TableCell>
                {purchase.purchasedAt &&
                  format(new Date(purchase.purchasedAt), "yyyy-MM-dd HH:mm:ss")}
              </TableCell>
              <TableCell>{purchase.creditsReceived}</TableCell>
              <TableCell>
                {formatEther(BigInt(purchase.ethPaid))} {nativeCurrencySymbol}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </>
  );
}
