import { Component,OnInit } from '@angular/core';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';


@Component({
  selector: 'app-certificate',
  templateUrl: './certificate.component.html',
  styleUrls: ['./certificate.component.css']
})
export class CertificateComponent {

  certi_data :any

  ngOnInit(): void {
    let data: any = localStorage.getItem('CERTI');
    this.certi_data = JSON.parse(data);
    console.warn('cer' ,this.certi_data.currentUser.name)
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
        doc.save('example.pdf');
      });
    } else {
      console.log('Element not found');
    }
  }
  generatePDF() {
    
  }
}
