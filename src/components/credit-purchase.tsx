"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { topUpContractAddresses } from "@/config";
import { apiReact } from "@/trpc/react";
import { TOPUP_CONTRACT_ABI } from "@/utils/constants/topup";
import { format } from "date-fns";
import { useEffect, useState } from "react";
import { formatEther, parseEther } from "viem";
import {
  useAccount,
  useChainId,
  useConnect,
  useWaitForTransactionReceipt,
  useWriteContract,
} from "wagmi";

const CREDITS_PER_ETH = 10000;

export function CreditPurchaseComponent() {
  const [credits, setCredits] = useState(100);
  const { isConnected, chain } = useAccount();
  const { connect, connectors } = useConnect();
  const utils = apiReact.useUtils();
  const chainId = useChainId();

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
    if (isSuccess && receipt && hash && chain) {
      extractEventAction({
        txHash: hash,
        chainId: chain.id,
      });
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
      address: topUpContractAddresses[chainId],
      abi: TOPUP_CONTRACT_ABI,
      functionName: "topUpCredits",
      args: [],
      value: parseEther(cost.toString()),
    });
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="grid gap-8 md:grid-cols-2">
        <Card className="w-full">
          <CardHeader>
            <CardTitle>Purchase Credits</CardTitle>
            <CardDescription>Calculate your credit cost</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center space-x-2">
                <Input
                  type="number"
                  value={credits}
                  onChange={(e) => setCredits(Number(e.target.value))}
                  className="w-24 text-center"
                />
                <span>credits</span>
              </div>
              <div className="text-4xl font-bold text-primary">
                {calculateCost(credits).toFixed(6)} {nativeCurrencySymbol}
              </div>
              <p className="text-sm text-muted-foreground">One-time payment</p>
            </div>
          </CardContent>
          <CardFooter>
            <Button
              className="w-full bg-primary hover:bg-primary/90"
              onClick={handleBuyCredits}
              disabled={isPending || isWaiting}
            >
              {isWaiting
                ? "Processing..."
                : isConnected
                  ? "Buy Credits"
                  : "Connect Wallet"}
            </Button>
          </CardFooter>
        </Card>

        <div className="space-y-8">
          <PricingTable nativeCurrencySymbol={nativeCurrencySymbol} />
          <PurchaseHistoryTable nativeCurrencySymbol={nativeCurrencySymbol} />
        </div>
      </div>
    </div>
  );
}

function PricingTable({
  nativeCurrencySymbol,
}: { nativeCurrencySymbol: string }) {
  const pricingData = [1000, 5000, 10000, 50000, 100000];
  return (
    <Card>
      <CardHeader>
        <CardTitle>Pricing</CardTitle>
      </CardHeader>
      <CardContent>
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
                  {(credits / CREDITS_PER_ETH).toFixed(2)}{" "}
                  {nativeCurrencySymbol}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
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
    <Card>
      <CardHeader>
        <CardTitle>Purchase History</CardTitle>
      </CardHeader>
      <CardContent>
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
                    format(
                      new Date(purchase.purchasedAt),
                      "yyyy-MM-dd HH:mm:ss"
                    )}
                </TableCell>
                <TableCell>{purchase.creditsReceived}</TableCell>
                <TableCell>
                  {formatEther(BigInt(purchase.ethPaid))} {nativeCurrencySymbol}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}
