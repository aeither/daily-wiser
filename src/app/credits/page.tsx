"use client";

import ConvertToken from "@/components/convert-token";
import { CreditPurchaseComponent } from "@/components/credit-purchase";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useState } from "react";

export default function CreditManagementPage() {
  const [activeTab, setActiveTab] = useState("purchase");

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-6">Credit Management</h1>
      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="purchase">Purchase Credits</TabsTrigger>
          <TabsTrigger value="convert">Convert Tokens</TabsTrigger>
        </TabsList>
        <TabsContent value="purchase">
          <CreditPurchaseComponent />
        </TabsContent>
        <TabsContent value="convert">
          <ConvertToken />
        </TabsContent>
      </Tabs>
    </div>
  );
}
