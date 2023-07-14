import { Component, OnInit } from '@angular/core';
import { PDFDocument } from 'pdf-lib';
import { saveAs } from 'file-saver';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import * as puppeteer from 'puppeteer';

@Component({
  selector: 'app-certificate',
  templateUrl: './certificate.component.html',
  styleUrls: ['./certificate.component.css'],
})
export class CertificateComponent implements OnInit {
  certi_data: any;
  dateForm: any;
  month: any;
  name: string = ''; // Initialize the name property

  constructor() {
    // Optionally, you can initialize the name property in the constructor
    this.name = '';
  }

  ngOnInit(): void {
    let data: any = localStorage.getItem('CERTI');
    this.certi_data = JSON.parse(data);
    this.name = this.certi_data?.currentUser?.result?.name;
    console.warn('cer', this.certi_data);
    const element = document.getElementById('element-to-export');
    window.scrollTo(0, 0);
    if (element) {
      // Load the certificate template
      const template = document.createElement('template');
      template.innerHTML = element.innerHTML;

      const firstChild = template.content.firstElementChild;
      if (firstChild) {
        // Replace dynamic data in the template
        const html = firstChild.innerHTML;
        const populatedHtml = html.replace('{{ name }}', this.name)
          .replace('{{ lastname }}', this.certi_data?.currentUser?.result?.lastname)
          .replace('{{ activity_name }}', this.certi_data?.currentActivityName?.getEvent?.activity_name);

        // Create a new element to hold the populated HTML
        const populatedElement = document.createElement('div');
        populatedElement.innerHTML = populatedHtml;

        // Pass the populated element to html2canvas
        html2canvas(populatedElement).then((canvas) => {
          const doc = new jsPDF();
          const imgData = canvas.toDataURL('image/png');
          const imgProps = doc.getImageProperties(imgData);
          const pdfWidth = doc.internal.pageSize.getWidth();
          const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;

          doc.addImage(imgData, 'PNG', 0, -10, pdfWidth, pdfHeight);
          doc.save('certificate.pdf');
        });
      } else {
        console.log('Template content not found');
      }
    } else {
      console.log('Element not found');
    }
  }

  con_date(d: any) {
    d = d.split('-');
    this.month = d[1];
    if (d[1] == '04') {
      d[1] = 'เม.ย';
    } else if (d[1] == '05') {
      d[1] = 'พ.ค';
    } else if (d[1] == '06') {
      d[1] = 'มิ.ย';
    } else if (d[1] == '07') {
      d[1] = 'ก.ค';
    } else if (d[1] == '08') {
      d[1] = 'ส.ค';
    } else if (d[1] == '09') {
      d[1] = 'ก.ย';
    } else if (d[1] == '10') {
      d[1] = 'ต.ค';
    } else if (d[1] == '11') {
      d[1] = 'พ.ย';
    } else if (d[1] == '12') {
      d[1] = 'ธ.ค';
    } else if (d[1] == '01') {
      d[1] = 'ม.ค';
    } else if (d[1] == '02') {
      d[1] = 'ก.พ';
    } else if (d[1] == '03') {
      d[1] = 'มี.ค';
    }

    d[0] = parseInt(d[0]) + 543;
    this.dateForm = d.reverse().join(' ');
    return this.dateForm;
  }
}
