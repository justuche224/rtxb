"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { getUserByAccountNumber, initiateTransfer } from "@/actions/user";
import { Loader2, CheckCircle, XCircle } from "lucide-react";

interface Recipient {
  id: string;
  name: string;
  email: string;
  accountNumber: string;
  balanceAmount: string;
}

interface TransferReceipt {
  reference: string;
  amount: number;
  recipientName: string;
  recipientAccountNumber: string;
  description: string;
  timestamp: Date;
}

interface TransferFormProps {
  onTransferComplete: (receipt: TransferReceipt) => void;
}

export function TransferForm({ onTransferComplete }: TransferFormProps) {
  const [accountNumber, setAccountNumber] = useState("");
  const [amount, setAmount] = useState("");
  const [description, setDescription] = useState("");
  const [recipient, setRecipient] = useState<Recipient | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleAccountNumberChange = async (value: string) => {
    setAccountNumber(value);
    setRecipient(null);
    setError("");
    setSuccess("");

    if (value.length >= 8) {
      setLoading(true);
      try {
        const recipientData = await getUserByAccountNumber(value);
        setRecipient(recipientData as Recipient);
        setSuccess(`Found recipient: ${recipientData.name}`);
      } catch (err) {
        setError(err instanceof Error ? err.message : "An error occurred");
      } finally {
        setLoading(false);
      }
    }
  };

  const handleTransfer = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!recipient || !amount || parseFloat(amount) <= 0) {
      setError("Please enter a valid amount");
      return;
    }

    setLoading(true);
    setError("");
    setSuccess("");

    try {
      const receipt = await initiateTransfer(
        accountNumber,
        parseFloat(amount),
        description || `Transfer to ${recipient.name}`
      );

      setSuccess("Transfer completed successfully!");
      onTransferComplete(receipt);

      setAccountNumber("");
      setAmount("");
      setDescription("");
      setRecipient(null);
    } catch (err) {
      setError(err instanceof Error ? err.message : "An error occurred");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card className="w-full max-w-md mx-auto">
      <CardHeader>
        <CardTitle>Send Money</CardTitle>
        <CardDescription>
          Transfer money to another user by entering their account number
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleTransfer} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="accountNumber">Account Number</Label>
            <Input
              id="accountNumber"
              type="text"
              placeholder="Enter account number"
              value={accountNumber}
              onChange={(e) => handleAccountNumberChange(e.target.value)}
              disabled={loading}
            />
            {loading && (
              <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                <Loader2 className="h-4 w-4 animate-spin" />
                <span>Looking up recipient...</span>
              </div>
            )}
          </div>

          {recipient && (
            <Alert>
              <CheckCircle className="h-4 w-4" />
              <AlertDescription>
                Recipient: <strong>{recipient.name}</strong>
              </AlertDescription>
            </Alert>
          )}

          {error && (
            <Alert variant="destructive">
              <XCircle className="h-4 w-4" />
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}

          {success && (
            <Alert>
              <CheckCircle className="h-4 w-4" />
              <AlertDescription>{success}</AlertDescription>
            </Alert>
          )}

          <div className="space-y-2">
            <Label htmlFor="amount">Amount</Label>
            <Input
              id="amount"
              type="number"
              placeholder="Enter amount"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              disabled={loading || !recipient}
              min="0"
              step="0.01"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="description">Description (Optional)</Label>
            <Input
              id="description"
              type="text"
              placeholder="Transfer description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              disabled={loading}
            />
          </div>

          <Button
            type="submit"
            className="w-full"
            disabled={
              loading || !recipient || !amount || parseFloat(amount) <= 0
            }
          >
            {loading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Processing...
              </>
            ) : (
              "Send Money"
            )}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}
