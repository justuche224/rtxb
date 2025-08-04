"use client";

import { useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  Send,
  FileText,
  ArrowUpDown,
  Bitcoin,
  CreditCard,
  Receipt,
  MessageSquare,
  TrendingUp,
  DollarSign,
  Users,
  BarChart3,
  Mail,
  Globe,
  Loader,
  X,
} from "lucide-react";

const ServiceButton = ({
  href,
  icon: Icon,
  title,
  description,
  onLoading,
}: {
  href: string;
  icon: React.ComponentType<{ className?: string }>;
  title: string;
  description?: string;
  onLoading?: () => void;
}) => {
  if (href === "/dashboard/send") {
    return (
      <Link
        href={href}
        className="flex flex-col items-center justify-center p-4 bg-white rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-all duration-200 hover:scale-105 group"
      >
        <div className="w-12 h-12 bg-blue-600 rounded-xl flex items-center justify-center mb-3 group-hover:bg-blue-700 transition-colors">
          <Icon className="h-6 w-6 text-white" />
        </div>
        <span className="text-sm font-medium text-gray-900 text-center">
          {title}
        </span>
        {description && (
          <span className="text-xs text-gray-500 text-center mt-1">
            {description}
          </span>
        )}
      </Link>
    );
  }

  return (
    <button
      onClick={onLoading}
      className="flex flex-col items-center justify-center p-4 bg-white rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-all duration-200 hover:scale-105 group"
    >
      <div className="w-12 h-12 bg-blue-600 rounded-xl flex items-center justify-center mb-3 group-hover:bg-blue-700 transition-colors">
        <Icon className="h-6 w-6 text-white" />
      </div>
      <span className="text-sm font-medium text-gray-900 text-center">
        {title}
      </span>
      {description && (
        <span className="text-xs text-gray-500 text-center mt-1">
          {description}
        </span>
      )}
    </button>
  );
};

const LoadingOverlay = ({ onCancel }: { onCancel: () => void }) => {
  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center">
      <div className="bg-white rounded-2xl p-8 shadow-2xl max-w-sm mx-4">
        <div className="text-center">
          <div className="mb-4">
            <Loader className="animate-spin h-12 w-12 text-blue-600 mx-auto" />
          </div>
          <h3 className="text-lg font-semibold text-gray-900 mb-2">
            Loading Service
          </h3>
          <p className="text-gray-600 mb-6">
            Please wait while we prepare this feature for you...
          </p>
          <Button onClick={onCancel} variant="outline" className="w-full">
            <X className="h-4 w-4 mr-2" />
            Cancel
          </Button>
        </div>
      </div>
    </div>
  );
};

export function ServicesGrid() {
  const [isLoading, setIsLoading] = useState(false);

  const handleServiceClick = () => {
    setIsLoading(true);
  };

  const handleCancelLoading = () => {
    setIsLoading(false);
  };

  return (
    <>
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-4 mb-8">
        <ServiceButton
          href="/dashboard/wire-transfer"
          icon={Globe}
          title="Wire Transfer"
          onLoading={handleServiceClick}
        />
        <ServiceButton
          href="/dashboard/local-transfer"
          icon={ArrowUpDown}
          title="Local Transfer"
          onLoading={handleServiceClick}
        />
        <ServiceButton
          href="/dashboard/send"
          icon={Send}
          title="Internal Transfer"
        />
        <ServiceButton
          href="/dashboard/buy-crypto"
          icon={Bitcoin}
          title="Buy Crypto"
          onLoading={handleServiceClick}
        />
        <ServiceButton
          href="/dashboard/pay-bills"
          icon={Receipt}
          title="Pay Bills"
          onLoading={handleServiceClick}
        />
        <ServiceButton
          href="/dashboard/add-beneficiary"
          icon={Users}
          title="Add Beneficiary"
          onLoading={handleServiceClick}
        />
        <ServiceButton
          href="/dashboard/card-deposit"
          icon={CreditCard}
          title="Card Deposit"
          onLoading={handleServiceClick}
        />
        <ServiceButton
          href="/dashboard/crypto-deposit"
          icon={Bitcoin}
          title="Crypto Deposit"
          onLoading={handleServiceClick}
        />
        <ServiceButton
          href="/dashboard/check-deposit"
          icon={FileText}
          title="Check Deposit"
          onLoading={handleServiceClick}
        />
        <ServiceButton
          href="/dashboard/savings-statement"
          icon={FileText}
          title="Savings Statement"
          onLoading={handleServiceClick}
        />
        <ServiceButton
          href="/dashboard/checking-statement"
          icon={BarChart3}
          title="Checking Statement"
          onLoading={handleServiceClick}
        />
        <ServiceButton
          href="/dashboard/alerts"
          icon={Mail}
          title="Blue Alerts"
          onLoading={handleServiceClick}
        />
        <ServiceButton
          href="/dashboard/loans"
          icon={DollarSign}
          title="Blue Loans"
          onLoading={handleServiceClick}
        />
        <ServiceButton
          href="/dashboard/investments"
          icon={TrendingUp}
          title="Blue Investments"
          onLoading={handleServiceClick}
        />
        <ServiceButton
          href="/dashboard/support"
          icon={MessageSquare}
          title="Blue Support"
          onLoading={handleServiceClick}
        />
      </div>

      {isLoading && <LoadingOverlay onCancel={handleCancelLoading} />}
    </>
  );
}
