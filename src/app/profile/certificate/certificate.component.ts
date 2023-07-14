import { Component, OnInit } from '@angular/core';
import { saveAs } from 'file-saver';
import { PDFDocument, rgb, StandardFonts } from 'pdf-lib';

@Component({
  selector: 'app-certificate',
  templateUrl: './certificate.component.html',
  styleUrls: ['./certificate.component.css'],
})
export class CertificateComponent implements OnInit {
  certi_data: any;
  dateForm: any;
  month: any;

  ngOnInit(): void {
    let data: any = localStorage.getItem('CERTI');
    this.certi_data = JSON.parse(data);
    console.warn('cer', this.certi_data);
    this.generatePDF();
  }

  async generatePDF(): Promise<void> {
    const pdfDoc = await PDFDocument.create();
    const page = pdfDoc.addPage();
    const { width, height } = page.getSize();
    const margin = 50;

    const content = `
      <!-- your HTML template here -->
    `;

    const drawTextOptions = {
      font: await pdfDoc.embedFont(StandardFonts.HelveticaBold),
      size: 12,
      textColor: rgb(0, 0, 0),
    };

    page.drawText(content, {
      ...drawTextOptions,
      x: margin,
      y: height - margin,
      maxWidth: width - 2 * margin,
      lineHeight: 15,
      wordBreaks: [' '],
    });

    const pdfBytes = await pdfDoc.save();

    const blob = new Blob([pdfBytes], { type: 'application/pdf' });
    saveAs(blob, 'certificate.pdf');
  }
}
