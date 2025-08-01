"use server";

import db from "@/db";
import { user, accountInfo, balance, transaction } from "@/db/schema";
import { eq, desc } from "drizzle-orm";
import { serverAuth } from "@/lib/server-auth";

export async function getUserAccountInfo() {
  const currentUser = await serverAuth();
  if (!currentUser) {
    throw new Error("Not authenticated");
  }

  const userWithAccountInfo = await db
    .select({
      id: user.id,
      name: user.name,
      email: user.email,
      accountNumber: accountInfo.accountNumber,
      balanceAmount: balance.amount,
      currency: balance.currency,
    })
    .from(user)
    .leftJoin(accountInfo, eq(user.id, accountInfo.userId))
    .leftJoin(balance, eq(user.id, balance.userId))
    .where(eq(user.id, currentUser.id))
    .limit(1);

  return userWithAccountInfo[0] || null;
}

export async function getUserTransactions() {
  const currentUser = await serverAuth();
  if (!currentUser) {
    throw new Error("Not authenticated");
  }

  const transactions = await db
    .select({
      id: transaction.id,
      type: transaction.type,
      amount: transaction.amount,
      currency: transaction.currency,
      status: transaction.status,
      description: transaction.description,
      reference: transaction.reference,
      createdAt: transaction.createdAt,
      senderId: transaction.senderId,
      senderName: user.name,
    })
    .from(transaction)
    .leftJoin(user, eq(transaction.senderId, user.id))
    .where(eq(transaction.userId, currentUser.id))
    .orderBy(desc(transaction.createdAt));

  return transactions;
}
