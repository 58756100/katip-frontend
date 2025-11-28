"use client";

import React, { useRef } from "react";
import { QRCodeCanvas } from "qrcode.react";
import { jsPDF } from "jspdf";
import { Button } from "@/components/ui/button";
import { Clipboard, Download } from "lucide-react";
import Image from "next/image";

interface QRCodeCardProps {
  username: string;
}

export default function QRCodeCard({ username }: QRCodeCardProps) {
  const qrRef = useRef<HTMLCanvasElement>(null);
  const link = `http://localhost:3000/${username}`;

  const copyLink = () => {
    navigator.clipboard.writeText(link).then(() => {
      alert("Link copied to clipboard!");
    });
  };

  const downloadPDF = () => {
    if (!qrRef.current) return;

    const qrDataUrl = qrRef.current.toDataURL("image/png");
    const pdf = new jsPDF();

    // Add QR code only
    pdf.addImage(qrDataUrl, "PNG", 40, 40, 130, 130);

    // Add link text below
    pdf.setFontSize(12);
    pdf.text(link, 40, 180);

    pdf.save(`${username}-qrcode.pdf`);
  };

  return (
    <div className="p-6 bg-white rounded-lg shadow-md space-y-4">
      <div className="flex justify-center">
        <Image src="/logo.svg" alt="Logo" width={100} height={100} />
      </div>
      <h3 className="text-lg font-semibold text-center">Your QR Code</h3>

      <div className="flex justify-center">
        <QRCodeCanvas ref={qrRef} value={link} size={200} />
      </div>

      <p className="text-center text-sm text-muted-foreground truncate">{link}</p>

      <div className="flex justify-center gap-4">
        <Button onClick={copyLink} size="sm" variant="outline">
          <Clipboard className="w-4 h-4 mr-1" /> Copy Link
        </Button>
        <Button onClick={downloadPDF} size="sm">
          <Download className="w-4 h-4 mr-1" /> Download PDF
        </Button>
      </div>
    </div>
  );
}
