"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { CheckCircle, Download, Printer } from "lucide-react";

interface TransferReceiptProps {
  receipt: {
    reference: string;
    amount: number;
    recipientName: string;
    recipientAccountNumber: string;
    description: string;
    timestamp: Date;
  };
  onClose: () => void;
}

export function TransferReceipt({ receipt, onClose }: TransferReceiptProps) {
  const handlePrint = () => {
    window.print();
  };

  const handleDownload = () => {
    const receiptText = `
Transfer Receipt
================

Reference: ${receipt.reference}
Amount: $${receipt.amount.toFixed(2)}
Recipient: ${receipt.recipientName}
Account Number: ${receipt.recipientAccountNumber}
Description: ${receipt.description}
Date: ${receipt.timestamp.toLocaleString()}

Status: Success
    `;

    const blob = new Blob([receiptText], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `receipt-${receipt.reference}.txt`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  return (
    <div className="fixed h-screen w-full top-0 left-0 right-0 bottom-0 flex items-center justify-center bg-background z-50">
      <Card className="w-full max-w-lg mx-auto shadow-lg bg-background">
        <CardHeader className="text-center bg-green-50 dark:bg-green-950/20">
          <div className="flex justify-center mb-4">
            <CheckCircle className="h-16 w-16 text-green-500" />
          </div>
          <CardTitle className="text-green-600 text-2xl">
            Transfer Successful!
          </CardTitle>
          <CardDescription className="text-green-700 dark:text-green-300">
            Your money has been sent successfully
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-4">
            <div className="flex justify-between items-center py-2 border-b border-border/50">
              <span className="text-muted-foreground font-medium">
                Reference:
              </span>
              <span className="font-mono text-sm text-right max-w-[180px] break-all">
                {receipt.reference}
              </span>
            </div>
            <div className="flex justify-between items-center py-2 border-b border-border/50">
              <span className="text-muted-foreground font-medium">Amount:</span>
              <span className="font-semibold text-lg text-green-600">
                ${receipt.amount.toFixed(2)}
              </span>
            </div>
            <div className="flex justify-between items-center py-2 border-b border-border/50">
              <span className="text-muted-foreground font-medium">
                Recipient:
              </span>
              <span className="font-semibold text-right">
                {receipt.recipientName}
              </span>
            </div>
            <div className="flex justify-between items-center py-2 border-b border-border/50">
              <span className="text-muted-foreground font-medium">
                Account Number:
              </span>
              <span className="font-mono text-sm text-right">
                {receipt.recipientAccountNumber}
              </span>
            </div>
            <div className="flex justify-between items-center py-2 border-b border-border/50">
              <span className="text-muted-foreground font-medium">
                Description:
              </span>
              <span className="text-sm text-right max-w-[180px] break-words">
                {receipt.description}
              </span>
            </div>
            <div className="flex justify-between items-center py-2">
              <span className="text-muted-foreground font-medium">Date:</span>
              <span className="text-sm text-right">
                {receipt.timestamp.toLocaleDateString()}
                <br />
                {receipt.timestamp.toLocaleTimeString()}
              </span>
            </div>
          </div>

          <div className="border-t pt-4 space-y-3">
            <div className="flex space-x-3">
              <Button
                variant="outline"
                size="sm"
                onClick={handlePrint}
                className="flex-1"
              >
                <Printer className="h-4 w-4 mr-2" />
                Print
              </Button>
            </div>

            <Button onClick={onClose} className="w-full" size="lg">
              Done
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
