"use client";

import { useState } from "react";
import { TransferForm } from "@/components/transfer-form";
import { TransferReceipt } from "@/components/transfer-receipt";

interface TransferReceipt {
  reference: string;
  amount: number;
  recipientName: string;
  recipientAccountNumber: string;
  description: string;
  timestamp: Date;
}

const SendPage = () => {
  const [receipt, setReceipt] = useState<TransferReceipt | null>(null);

  const handleTransferComplete = (transferReceipt: TransferReceipt) => {
    setReceipt(transferReceipt);
  };

  const handleCloseReceipt = () => {
    setReceipt(null);
  };

  return (
    <div className="container mx-auto py-8">
      <div className="max-w-2xl mx-auto">
        <div className="mb-8 text-center">
          <h1 className="text-3xl font-bold">Send Money</h1>
          <p className="text-muted-foreground mt-2">
            Transfer money to other users securely
          </p>
        </div>

        {receipt ? (
          <TransferReceipt receipt={receipt} onClose={handleCloseReceipt} />
        ) : (
          <TransferForm onTransferComplete={handleTransferComplete} />
        )}
      </div>
    </div>
  );
};

export default SendPage;
