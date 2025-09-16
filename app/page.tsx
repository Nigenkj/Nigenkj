"use client"

import { useState, useEffect } from "react"
import { InvoiceForm } from "@/components/invoice-form"
import { Button } from "@/components/ui/button"
import { FileText, Eye } from "lucide-react"
import { useRouter } from "next/navigation"

export interface InvoiceItem {
  id: string
  description: string
  quantity: number
  rate: number
  amount: number
}

export interface InvoiceData {
  // Company Information
  companyName: string
  companyAddress: string
  companyCity: string
  companyPhone: string
  companyEmail: string
  companyLogo?: string
  currency: string

  // Invoice Details
  invoiceNumber: string
  invoiceDate: string
  dueDate: string
  status: "PAID" | "UNPAID" | "OVERDUE"

  // Client Information
  billToName: string
  billToAddress: string
  billToCity: string
  billToCountry: string

  // Items
  items: InvoiceItem[]

  // Totals
  subtotal: number
  total: number
  amountDue: number

  // Additional Information
  notes: string
  terms: string
  paymentLink?: string
}

export default function InvoiceGenerator() {
  const router = useRouter()
  const [invoiceData, setInvoiceData] = useState<InvoiceData>({
    companyName: "Quantum Labs",
    companyAddress: "Innovation Hub, Tech District",
    companyCity: "Accra, Ghana",
    companyPhone: "+233 XX XXX XXXX",
    companyEmail: "info@quantumlabs.com",
    companyLogo: "/quantum-labs-logo.png",
    currency: "GHS",
    invoiceNumber: "INV-001727",
    invoiceDate: new Date().toISOString().split("T")[0],
    dueDate: new Date(Date.now() + 15 * 24 * 60 * 60 * 1000).toISOString().split("T")[0],
    status: "UNPAID",
    billToName: "Client Name",
    billToAddress: "Client Address",
    billToCity: "Client City",
    billToCountry: "Ghana",
    items: [
      {
        id: "1",
        description: "Data Analytics Consultation",
        quantity: 1,
        rate: 2500.0,
        amount: 2500.0,
      },
      {
        id: "2",
        description: "Machine Learning Model Development",
        quantity: 1,
        rate: 5000.0,
        amount: 5000.0,
      },
    ],
    subtotal: 7500.0,
    total: 7500.0,
    amountDue: 7500.0,
    notes: "Thank you for choosing Quantum Labs for your data innovation needs.",
    terms: "Payment due within 15 days of invoice date.\nLate payments may incur additional charges.",
  })

  useEffect(() => {
    localStorage.setItem("invoiceData", JSON.stringify(invoiceData))
  }, [invoiceData])

  const handlePrint = () => {
    const printContent = document.querySelector(".invoice-print-area")
    if (printContent) {
      const printWindow = window.open("", "_blank")
      if (printWindow) {
        printWindow.document.write(`
          <html>
            <head>
              <title>Invoice ${invoiceData.invoiceNumber}</title>
              <style>
                body { font-family: system-ui, -apple-system, sans-serif; margin: 0; padding: 20px; }
                .invoice-container { max-width: 800px; margin: 0 auto; }
                @media print { body { margin: 0; padding: 0; } }
              </style>
            </head>
            <body>
              <div class="invoice-container">
                ${printContent.innerHTML}
              </div>
            </body>
          </html>
        `)
        printWindow.document.close()
        printWindow.print()
        printWindow.close()
      }
    }
  }

  const handleDownloadPDF = () => {
    // In a real application, you would use a library like jsPDF or Puppeteer
    // For now, we'll trigger the browser's print dialog
    window.print()
  }

  const handlePreview = () => {
    router.push("/preview")
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-cyan-50">
      <div className="container mx-auto py-8 px-4">
        <div className="mb-8 text-center">
          <div className="flex items-center justify-center gap-2 mb-4">
            <FileText className="h-8 w-8 text-blue-600" />
            <h1 className="text-3xl font-bold text-blue-900">Invoice Generator</h1>
          </div>
          <p className="text-gray-600">Create professional invoices and receipts with ease</p>
        </div>

        <div className="max-w-4xl mx-auto space-y-6">
          <InvoiceForm invoiceData={invoiceData} setInvoiceData={setInvoiceData} />

          <div className="flex justify-center">
            <Button onClick={handlePreview} className="bg-blue-600 hover:bg-blue-700 px-8 py-3">
              <Eye className="h-4 w-4 mr-2" />
              Preview & Print Invoice
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
