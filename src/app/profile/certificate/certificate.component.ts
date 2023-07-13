import { Component, OnInit } from '@angular/core';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';

@Component({
  selector: 'app-certificate',
  templateUrl: './certificate.component.html',
  styleUrls: ['./certificate.component.css'],
})
export class CertificateComponent {
  dateForm: any;
  month: any;
  certi_data: any;

  ngOnInit(): void {
    let data: any = localStorage.getItem('CERTI');
    this.certi_data = JSON.parse(data);
    console.warn('cer', this.certi_data.currentUser.result.name);
    const element = document.getElementById('element-to-export');
    window.scrollTo(0, 0);
    if (element?.nodeName) {
      html2canvas(element).then((canvas) => {
        const doc = new jsPDF();
        const imgData = canvas.toDataURL('image/png');
        const imgProps = doc.getImageProperties(imgData);
        const pdfWidth = doc.internal.pageSize.getWidth();
        const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;

        doc.addImage(imgData, 'PNG', 0, -10, pdfWidth, pdfHeight);
        doc.save('certificate.pdf');
      });
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
