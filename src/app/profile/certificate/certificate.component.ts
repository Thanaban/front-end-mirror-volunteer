import { Component, OnInit, AfterViewInit, ElementRef } from '@angular/core';
import { PDFDocument } from 'pdf-lib';
import { saveAs } from 'file-saver';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';

@Component({
  selector: 'app-certificate',
  templateUrl: './certificate.component.html',
  styleUrls: ['./certificate.component.css'],
})
export class CertificateComponent implements OnInit, AfterViewInit {
  certi_data: any;
  dateForm: any;
  month: any;

  constructor(private elementRef: ElementRef) {}

  ngOnInit(): void {
    let data: any = localStorage.getItem('CERTI');
    this.certi_data = JSON.parse(data);
    console.warn('cer', this.certi_data);
  }

  ngAfterViewInit(): void {
    const element = document.getElementById('element-to-export');
    if (!element) {
      console.log('Element not found');
      return;
    }

    // Load the certificate template
    const template = document.createElement('template');
    template.innerHTML = `<html><body>${element.innerHTML}</body></html>`;

    // Extract the content from the template
    const content = template.content;
    if (!content || !content.firstElementChild) {
      console.log('Unable to find template content');
      return;
    }

    // Replace dynamic data in the template
    const html = content.firstElementChild.innerHTML;
    const populatedHtml = html
      .replace('{{ name }}', this.certi_data?.currentUser?.result?.name)
      .replace('{{ lastname }}', this.certi_data?.currentUser?.result?.lastname)
      .replace(
        '{{ activity_name }}',
        this.certi_data?.currentActivityName?.getEvent?.activity_name
      );

    // Generate PDF from the populated HTML template
    html2canvas(content.firstElementChild as HTMLElement).then((canvas) => {
      const doc = new jsPDF();
      const imgData = canvas.toDataURL('image/png');
      const imgProps = doc.getImageProperties(imgData);
      const pdfWidth = doc.internal.pageSize.getWidth();
      const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;

      doc.addImage(imgData, 'PNG', 0, -10, pdfWidth, pdfHeight);
      doc.save('certificate.pdf');
    });
  }
}
