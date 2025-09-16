"use client"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Plus, Trash2 } from "lucide-react"
import type { InvoiceData, InvoiceItem } from "@/app/page"

interface InvoiceFormProps {
  invoiceData: InvoiceData
  setInvoiceData: (data: InvoiceData) => void
}

export function InvoiceForm({ invoiceData, setInvoiceData }: InvoiceFormProps) {
  const updateField = (field: keyof InvoiceData, value: any) => {
    setInvoiceData({ ...invoiceData, [field]: value })
  }

  const addItem = () => {
    const newItem: InvoiceItem = {
      id: Date.now().toString(),
      description: "",
      quantity: 1,
      rate: 0,
      amount: 0,
    }
    const newItems = [...invoiceData.items, newItem]
    updateField("items", newItems)
    calculateTotals(newItems)
  }

  const updateItem = (id: string, field: keyof InvoiceItem, value: any) => {
    const updatedItems = invoiceData.items.map((item) => {
      if (item.id === id) {
        const updatedItem = { ...item, [field]: value }
        if (field === "quantity" || field === "rate") {
          updatedItem.amount = updatedItem.quantity * updatedItem.rate
        }
        return updatedItem
      }
      return item
    })
    updateField("items", updatedItems)
    calculateTotals(updatedItems)
  }

  const removeItem = (id: string) => {
    const filteredItems = invoiceData.items.filter((item) => item.id !== id)
    updateField("items", filteredItems)
    calculateTotals(filteredItems)
  }

  const calculateTotals = (items: InvoiceItem[]) => {
    const subtotal = items.reduce((sum, item) => sum + item.amount, 0)
    setInvoiceData((prev) => ({
      ...prev,
      subtotal,
      total: subtotal,
      amountDue: subtotal,
    }))
  }

  return (
    <div className="space-y-6">
      {/* Company Information */}
      <Card>
        <CardHeader>
          <CardTitle className="text-blue-900">Company Information</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <Label htmlFor="companyName">Company Name</Label>
            <Input
              id="companyName"
              value={invoiceData.companyName}
              onChange={(e) => updateField("companyName", e.target.value)}
            />
          </div>
          <div>
            <Label htmlFor="companyAddress">Address</Label>
            <Input
              id="companyAddress"
              value={invoiceData.companyAddress}
              onChange={(e) => updateField("companyAddress", e.target.value)}
            />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="companyCity">City</Label>
              <Input
                id="companyCity"
                value={invoiceData.companyCity}
                onChange={(e) => updateField("companyCity", e.target.value)}
              />
            </div>
            <div>
              <Label htmlFor="companyPhone">Phone</Label>
              <Input
                id="companyPhone"
                value={invoiceData.companyPhone}
                onChange={(e) => updateField("companyPhone", e.target.value)}
              />
            </div>
          </div>
          <div>
            <Label htmlFor="companyEmail">Email</Label>
            <Input
              id="companyEmail"
              type="email"
              value={invoiceData.companyEmail}
              onChange={(e) => updateField("companyEmail", e.target.value)}
            />
          </div>
        </CardContent>
      </Card>

      {/* Invoice Details */}
      <Card>
        <CardHeader>
          <CardTitle className="text-blue-900">Invoice Details</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="invoiceNumber">Invoice Number</Label>
              <Input
                id="invoiceNumber"
                value={invoiceData.invoiceNumber}
                onChange={(e) => updateField("invoiceNumber", e.target.value)}
              />
            </div>
            <div>
              <Label htmlFor="status">Status</Label>
              <Select value={invoiceData.status} onValueChange={(value) => updateField("status", value)}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="UNPAID">Unpaid</SelectItem>
                  <SelectItem value="PAID">Paid</SelectItem>
                  <SelectItem value="OVERDUE">Overdue</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          <div className="grid grid-cols-3 gap-4">
            <div>
              <Label htmlFor="invoiceDate">Invoice Date</Label>
              <Input
                id="invoiceDate"
                type="date"
                value={invoiceData.invoiceDate}
                onChange={(e) => updateField("invoiceDate", e.target.value)}
              />
            </div>
            <div>
              <Label htmlFor="dueDate">Due Date</Label>
              <Input
                id="dueDate"
                type="date"
                value={invoiceData.dueDate}
                onChange={(e) => updateField("dueDate", e.target.value)}
              />
            </div>
            <div>
              <Label htmlFor="currency">Currency</Label>
              <Select value={invoiceData.currency} onValueChange={(value) => updateField("currency", value)}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="GHS">Ghana Cedis (GHS)</SelectItem>
                  <SelectItem value="USD">US Dollar (USD)</SelectItem>
                  <SelectItem value="EUR">Euro (EUR)</SelectItem>
                  <SelectItem value="GBP">British Pound (GBP)</SelectItem>
                  <SelectItem value="NGN">Nigerian Naira (NGN)</SelectItem>
                  <SelectItem value="ZAR">South African Rand (ZAR)</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Bill To Information */}
      <Card>
        <CardHeader>
          <CardTitle className="text-blue-900">Bill To</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <Label htmlFor="billToName">Client Name</Label>
            <Input
              id="billToName"
              value={invoiceData.billToName}
              onChange={(e) => updateField("billToName", e.target.value)}
            />
          </div>
          <div>
            <Label htmlFor="billToAddress">Address</Label>
            <Input
              id="billToAddress"
              value={invoiceData.billToAddress}
              onChange={(e) => updateField("billToAddress", e.target.value)}
            />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="billToCity">City</Label>
              <Input
                id="billToCity"
                value={invoiceData.billToCity}
                onChange={(e) => updateField("billToCity", e.target.value)}
              />
            </div>
            <div>
              <Label htmlFor="billToCountry">Country</Label>
              <Input
                id="billToCountry"
                value={invoiceData.billToCountry}
                onChange={(e) => updateField("billToCountry", e.target.value)}
              />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Items */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center justify-between text-blue-900">
            Items
            <Button onClick={addItem} size="sm" className="bg-blue-600 hover:bg-blue-700">
              <Plus className="h-4 w-4 mr-2" />
              Add Item
            </Button>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {invoiceData.items.map((item) => (
            <div key={item.id} className="grid grid-cols-12 gap-2 items-end">
              <div className="col-span-5">
                <Label>Description</Label>
                <Input
                  value={item.description}
                  onChange={(e) => updateItem(item.id, "description", e.target.value)}
                  placeholder="Item description"
                />
              </div>
              <div className="col-span-2">
                <Label>Qty</Label>
                <Input
                  type="number"
                  value={item.quantity}
                  onChange={(e) => updateItem(item.id, "quantity", Number.parseFloat(e.target.value) || 0)}
                  min="0"
                  step="0.01"
                />
              </div>
              <div className="col-span-2">
                <Label>Rate</Label>
                <Input
                  type="number"
                  value={item.rate}
                  onChange={(e) => updateItem(item.id, "rate", Number.parseFloat(e.target.value) || 0)}
                  min="0"
                  step="0.01"
                />
              </div>
              <div className="col-span-2">
                <Label>Amount</Label>
                <Input type="number" value={item.amount.toFixed(2)} readOnly className="bg-muted" />
              </div>
              <div className="col-span-1">
                <Button variant="outline" size="sm" onClick={() => removeItem(item.id)} className="w-full">
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            </div>
          ))}
        </CardContent>
      </Card>

      {/* Additional Information */}
      <Card>
        <CardHeader>
          <CardTitle className="text-blue-900">Additional Information</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <Label htmlFor="notes">Notes</Label>
            <Textarea
              id="notes"
              value={invoiceData.notes}
              onChange={(e) => updateField("notes", e.target.value)}
              placeholder="Payment instructions, thank you message, etc."
            />
          </div>
          <div>
            <Label htmlFor="terms">Terms & Conditions</Label>
            <Textarea
              id="terms"
              value={invoiceData.terms}
              onChange={(e) => updateField("terms", e.target.value)}
              placeholder="Payment terms, late fees, etc."
            />
          </div>
          <div>
            <Label htmlFor="paymentLink">Payment Link (Optional)</Label>
            <Input
              id="paymentLink"
              value={invoiceData.paymentLink || ""}
              onChange={(e) => updateField("paymentLink", e.target.value)}
              placeholder="https://payment-link.com"
            />
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
