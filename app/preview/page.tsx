"use client"

import { useState, useEffect } from "react"
import { InvoicePreview } from "@/components/invoice-preview"
import { Button } from "@/components/ui/button"
import { FileText, Download, ArrowLeft, Edit } from "lucide-react"
import { useRouter } from "next/navigation"
import type { InvoiceData } from "../page"

export default function InvoicePreviewPage() {
  const router = useRouter()
  const [invoiceData, setInvoiceData] = useState<InvoiceData | null>(null)

  useEffect(() => {
    const savedData = localStorage.getItem("invoiceData")
    if (savedData) {
      setInvoiceData(JSON.parse(savedData))
    } else {
      // If no data, redirect to form
      router.push("/")
    }
  }, [router])

  const handlePrint = () => {
    window.print()
  }

  const handleDownloadPDF = () => {
    window.print()
  }

  const handleBackToForm = () => {
    router.push("/")
  }

  if (!invoiceData) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-cyan-50 flex items-center justify-center">
        <div className="text-center">
          <FileText className="h-12 w-12 text-blue-600 mx-auto mb-4" />
          <p className="text-gray-600">Loading invoice data...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-cyan-50">
      <div className="no-print bg-white border-b border-gray-200 sticky top-0 z-10">
        <div className="container mx-auto py-4 px-4">
          <div className="flex items-center justify-between">
            <Button
              onClick={handleBackToForm}
              variant="outline"
              className="border-blue-200 text-blue-700 hover:bg-blue-50 bg-transparent"
            >
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Form
            </Button>

            <div className="flex gap-2">
              <Button
                onClick={handleBackToForm}
                variant="outline"
                className="border-blue-200 text-blue-700 hover:bg-blue-50 bg-transparent"
              >
                <Edit className="h-4 w-4 mr-2" />
                Edit Invoice
              </Button>
              <Button onClick={handlePrint} className="bg-blue-600 hover:bg-blue-700">
                <FileText className="h-4 w-4 mr-2" />
                Print Invoice
              </Button>
              <Button
                onClick={handleDownloadPDF}
                variant="outline"
                className="border-blue-200 text-blue-700 hover:bg-blue-50 bg-transparent"
              >
                <Download className="h-4 w-4 mr-2" />
                Download PDF
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto py-8 px-4">
        <div className="max-w-4xl mx-auto">
          <InvoicePreview invoiceData={invoiceData} />
        </div>
      </div>
    </div>
  )
}
