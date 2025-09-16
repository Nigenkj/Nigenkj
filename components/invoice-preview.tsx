"use client"

import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import type { InvoiceData } from "@/app/page"
import Image from "next/image"

interface InvoicePreviewProps {
  invoiceData: InvoiceData
}

export function InvoicePreview({ invoiceData }: InvoicePreviewProps) {
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
    })
  }

  const formatCurrency = (amount: number) => {
    const currencySymbols: { [key: string]: string } = {
      GHS: "₵",
      USD: "$",
      EUR: "€",
      GBP: "£",
      NGN: "₦",
      ZAR: "R",
    }
    const symbol = currencySymbols[invoiceData.currency] || invoiceData.currency
    return `${symbol}${amount.toFixed(2)}`
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "PAID":
        return "bg-green-100 text-green-800"
      case "OVERDUE":
        return "bg-red-100 text-red-800"
      default:
        return "bg-yellow-100 text-yellow-800"
    }
  }

  const paymentInfo = `Payment Info:
Account Name: Nigel Agordorku
Payment Type: Telecel Cash
Momo Number: 020 584 0240

or

Account Name: Nigel Agordorku
Payment Type: Bank Transfer
Bank Name: Standard Chartered Bank - Accra H. Street.
Account Number: 0103505108100`

  const combinedNotes = invoiceData.notes ? `${invoiceData.notes}\n\n${paymentInfo}` : paymentInfo

  return (
    <Card className="invoice-print-area p-6 bg-white shadow-lg print-page">
      {/* Header with Quantum Labs branding */}
      <div className="flex justify-between items-start mb-6">
        <div className="flex items-center gap-3">
          <div className="w-16 h-16">
            <Image
              src="/quantum-labs-logo.png"
              alt="Quantum Labs Logo"
              width={64}
              height={64}
              className="object-contain"
            />
          </div>
          <div>
            <h1 className="text-xl font-bold text-blue-900">{invoiceData.companyName}</h1>
            <p className="text-xs text-cyan-600 font-medium">INNOVATE WITH DATA</p>
            <p className="text-xs text-gray-600">{invoiceData.companyAddress}</p>
          </div>
        </div>
        <div className="text-right">
          <h2 className="text-2xl font-bold text-blue-900 mb-1">INVOICE</h2>
          <p className="text-xs font-medium text-gray-700">#{invoiceData.invoiceNumber}</p>
          <Badge className={getStatusColor(invoiceData.status)}>{invoiceData.status}</Badge>
        </div>
      </div>

      {/* Company and Client Information */}
      <div className="grid grid-cols-2 gap-6 mb-6">
        <div>
          <h3 className="font-semibold text-blue-900 mb-1">{invoiceData.companyName}</h3>
          <p className="text-xs text-gray-600">{invoiceData.companyAddress}</p>
          <p className="text-xs text-gray-600">{invoiceData.companyCity}</p>
          <p className="text-xs text-gray-600">{invoiceData.companyEmail}</p>
          <p className="text-xs text-gray-600">{invoiceData.companyPhone}</p>
        </div>
        <div className="text-right">
          <h3 className="font-semibold text-blue-900 mb-1">Bill To:</h3>
          <p className="text-xs font-medium text-gray-800">{invoiceData.billToName}</p>
          <p className="text-xs text-gray-600">{invoiceData.billToAddress}</p>
          <p className="text-xs text-gray-600">{invoiceData.billToCity}</p>
          <p className="text-xs text-gray-600">{invoiceData.billToCountry}</p>
          <div className="mt-3 space-y-1">
            <p className="text-xs">
              <span className="font-medium text-gray-800">Invoice Date:</span> {formatDate(invoiceData.invoiceDate)}
            </p>
            <p className="text-xs">
              <span className="font-medium text-gray-800">Due Date:</span> {formatDate(invoiceData.dueDate)}
            </p>
          </div>
        </div>
      </div>

      {/* Items Table with Quantum Labs blue theme */}
      <div className="mb-6">
        <table className="w-full text-xs">
          <thead>
            <tr className="bg-gradient-to-r from-blue-900 to-blue-700 text-white">
              <th className="text-left py-2 px-3 font-medium">#</th>
              <th className="text-left py-2 px-3 font-medium">Item</th>
              <th className="text-center py-2 px-3 font-medium">Qty</th>
              <th className="text-right py-2 px-3 font-medium">Rate</th>
              <th className="text-right py-2 px-3 font-medium">Amount</th>
            </tr>
          </thead>
          <tbody>
            {invoiceData.items.map((item, index) => (
              <tr key={item.id} className="border-b border-gray-200 hover:bg-blue-50">
                <td className="py-2 px-3">{index + 1}</td>
                <td className="py-2 px-3">{item.description}</td>
                <td className="py-2 px-3 text-center">{item.quantity}</td>
                <td className="py-2 px-3 text-right">{formatCurrency(item.rate)}</td>
                <td className="py-2 px-3 text-right font-medium">{formatCurrency(item.amount)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Totals with blue accent */}
      <div className="flex justify-end mb-6">
        <div className="w-48 space-y-1">
          <div className="flex justify-between py-1">
            <span className="font-medium text-gray-700 text-xs">Sub Total</span>
            <span className="text-gray-800 text-xs">{formatCurrency(invoiceData.subtotal)}</span>
          </div>
          <div className="flex justify-between py-1 border-t border-gray-200">
            <span className="font-medium text-gray-700 text-xs">Total</span>
            <span className="font-bold text-gray-800 text-xs">{formatCurrency(invoiceData.total)}</span>
          </div>
          <div className="flex justify-between py-2 bg-gradient-to-r from-blue-100 to-cyan-50 px-3 rounded border-l-4 border-blue-600">
            <span className="font-bold text-blue-900 text-xs">Amount Due</span>
            <span className="font-bold text-sm text-blue-900">{formatCurrency(invoiceData.amountDue)}</span>
          </div>
        </div>
      </div>

      <div className="space-y-3">
        <div>
          <h4 className="font-semibold text-blue-900 mb-1 text-xs">Note:</h4>
          <p className="text-xs text-gray-600 whitespace-pre-line leading-relaxed">{combinedNotes}</p>
        </div>
        {invoiceData.terms && (
          <div>
            <h4 className="font-semibold text-blue-900 mb-1 text-xs">Terms & Conditions:</h4>
            <p className="text-xs text-gray-600 whitespace-pre-line">{invoiceData.terms}</p>
          </div>
        )}
      </div>
    </Card>
  )
}
