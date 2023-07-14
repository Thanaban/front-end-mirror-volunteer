import { Component, OnInit } from '@angular/core';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import * as puppeteer from 'puppeteer';
import { PDFDocument, StandardFonts, rgb } from 'pdf-lib';
import { saveAs } from 'file-saver';

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
    // let data: any = localStorage.getItem('CERTI');
    // this.certi_data = JSON.parse(data);
    // console.warn('cer', this.certi_data.currentUser.result.name);
    // const element = document.getElementById('element-to-export');
    // window.scrollTo(0, 0);
    // if (element?.nodeName) {
    //   html2canvas(element).then((canvas) => {
    //     const doc = new jsPDF();
    //     const imgData = canvas.toDataURL('image/png');
    //     const imgProps = doc.getImageProperties(imgData);
    //     const pdfWidth = doc.internal.pageSize.getWidth();
    //     const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;

    //     doc.addImage(imgData, 'PNG', 0, -10, pdfWidth, pdfHeight);
    //     doc.save('certificate.pdf');
    //   });
    // } else {
    //   console.log('Element not found');
    // }
    this.generatePDF();
  }

  async generatePDF() {
    const html = `<html>
    <body id="element-to-export">
      <!-- <div class="container" > -->
      <div class="top-padding"></div>
      <div class="header">" อาสาสมัคร "</div>
  
      <div class="tagline">
        คือคนที่มีหัวใจอาสา คนที่อยากเห็นสังคมงดงาม<br />
        คนที่แสวงหาความหมายของการมีชีวิตอยู่อย่างมีคุณค่า
      </div>
  
      <div class="ensure">
        มูลนิธิกระจกเงา ขอรับรองว่า {{ certi_data?.currentUser?.result?.name }}
        {{ certi_data?.currentUser?.result?.lastname }}<br />
        ได้เข้าร่วมเป็นอาสาสมัครในกิจกรรม
        {{ certi_data?.currentActivityName?.getEvent?.activity_name }}<br />
        ชื่อกิจกรรม {{ certi_data?.currentActivityName?.getEvent?.activity_name
        }}<br />
        เป็นเวลา 8 ชั่วโมง
      </div>
  
      <div class="content">
        ระหว่างการทำกิจกรรมอาสาสมัครได้ปฏิบัติหน้าที่ด้วยความเสียสละ มีน้ำใจ
        และให้ความ<br />
        ร่วมมือแสดงความมีส่วนร่วมที่สำคัญต่อกระบวนการอาสาสมัครหนุนเสริมเป็นกลไกการขับเคลื่อนสังคม<br />
        ร่วมกับมูลนิธิกระจกเงาได้เป็นอย่างดี
      </div>
  
      <div class="content">
        มูลนิธิกระจกเงา
        ขอขอบคุณท่านที่ได้ร่วมเป็นส่วนหนึ่งในกิจกรรมอาสาสมัครในครั้งนี้ <br />
        ขอให้บทบาทในการเป็น “อาสาสมัคร” ในตัวท่าน
        ได้ต่อยอดเพื่อสร้างประโยชน์ต่อสังคมสืบไป
      </div>
  
      <div class="content">
        ออกให้ ณ วันที่ {{ con_date(certi_data.currentActivityName.date) }}
      </div>
  
      <div class="marquee">Certificate of Arsa</div>
  
      <div class="assignment">This certificate is presented to</div>
  
      <div class="person">Pan</div>
  
      <div class="reason">
        วันที่<br />
        123181
      </div>
      <div class="bottom-padding"></div>
      <!-- </div> -->
    </body>
  </html>
  `;

  try {
    const pdfDoc = await PDFDocument.create();
    const font = await pdfDoc.embedFont(StandardFonts.Helvetica);
    const page = pdfDoc.addPage();
    page.setFont(font);
    page.setFontSize(12);

    // Set the font color
    const fontColor = rgb(0, 0, 0);

    // Calculate the width and height of the text box
    const textWidth = page.getWidth() - 40;
    const textHeight = page.getHeight() - 40;

    // Split the HTML content into lines manually
    const lines = html.split('\n');

    // Calculate the height of the text box based on the number of lines
    const lineHeight = 20;
    const numLines = lines.length;
    const calculatedHeight = numLines * lineHeight;

    // Calculate the y position for vertical alignment
    const adjustedTextHeight = textHeight - calculatedHeight;

    // Draw the HTML content on the PDF page with adjusted height
    lines.forEach((line, index) => {
      const y = adjustedTextHeight + index * lineHeight;
      page.drawText(line, {
        x: 20,
        y,
        maxWidth: textWidth,
        lineHeight,
        size: 12,
        color: fontColor,
      });
    });

    const pdfBytes = await pdfDoc.save();

    // Convert the PDF bytes to a Blob
    const blob = new Blob([pdfBytes], { type: 'application/pdf' });

    // Save the Blob as a file using FileSaver.js
    saveAs(blob, 'certificate.pdf');

    console.log('PDF generated successfully!');
  } catch (error) {
    console.error('Error generating PDF:', error);
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
