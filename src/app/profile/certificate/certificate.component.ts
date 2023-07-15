import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { saveAs } from 'file-saver';
import { PDFDocument, rgb, StandardFonts, TextAlignment } from 'pdf-lib';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';

@Component({
  selector: 'app-certificate',
  templateUrl: './certificate.component.html',
  styleUrls: ['./certificate.component.css'],
})
export class CertificateComponent implements OnInit {

  dateForm: any;
  month: any;
  certi_data: any;
  test:string = 'หกาสหาดว้า'
  @ViewChild('elementToExport', { static: true }) elementToExport!: ElementRef;

  ngOnInit(): void {
    let data: any = localStorage.getItem('CERTI');
    this.certi_data = JSON.parse(data);
    console.warn('cer', this.certi_data);
    setTimeout(() => {
      this.generatePDF();
    }, 0);
  }

  generatePDF(): void {
    const elementToExport = this.elementToExport.nativeElement;

    html2canvas(elementToExport).then((canvas) => {
      const fileWidth = 210;
      const fileHeight = (canvas.height * fileWidth) / canvas.width;
      const FILE_URI = canvas.toDataURL('image/png');

      const PDF = new jsPDF('p', 'mm', 'a4');
      const position = 0;

      PDF.addImage(FILE_URI, 'PNG', 0, -6.5, fileWidth, fileHeight);

      const filename = this.certi_data.currentUser.result.name + '_certificate.pdf';
      const pdfBytes = PDF.output('arraybuffer');
      const blob = new Blob([pdfBytes], { type: 'application/pdf' });
      saveAs(blob, filename);

    });
  }

  con_date(d: any) {
    d = d.split('-');
    this.month = d[1];
    if (d[1] == '04') {
      d[1] = 'เมษายน';
    } else if (d[1] == '05') {
      d[1] = 'พฤษภาคม';
    } else if (d[1] == '06') {
      d[1] = 'มิถุนายน';
    } else if (d[1] == '07') {
      d[1] = 'กรกฎาคม';
    } else if (d[1] == '08') {
      d[1] = 'สิงหาคม';
    } else if (d[1] == '09') {
      d[1] = 'กันยายน';
    } else if (d[1] == '10') {
      d[1] = 'ตุลาคม';
    } else if (d[1] == '11') {
      d[1] = 'พฤศจิกายน';
    } else if (d[1] == '12') {
      d[1] = 'ธันวาคม';
    } else if (d[1] == '01') {
      d[1] = 'มกราคม';
    } else if (d[1] == '02') {
      d[1] = 'กุมภาพันธ์';
    } else if (d[1] == '03') {
      d[1] = 'มีนาคม';
    }

    d[0] = parseInt(d[0]) + 543;
    this.dateForm = d.reverse().join(' ');
    return this.dateForm;
  }
}
  // async generatePDF(): Promise<void> {
  //   const pdfDoc = await PDFDocument.create();
  //   const page = pdfDoc.addPage();
  //   const { width, height } = page.getSize();
  //   const margin = 50;

  //   const content = `
  //   <html>
  //   <body id="element-to-export">
  //     <!-- <div class="container" > -->
  //     <div class="top-padding"></div>
  //     <div class="header">" อาสาสมัคร "</div>

  //     <div class="tagline">
  //       คือคนที่มีหัวใจอาสา คนที่อยากเห็นสังคมงดงาม<br />
  //       คนที่แสวงหาความหมายของการมีชีวิตอยู่อย่างมีคุณค่า
  //     </div>

  //     <div class="ensure">
  //       มูลนิธิกระจกเงา ขอรับรองว่า {{ certi_data?.currentUser?.result?.name }}  <br />
  //       ได้เข้าร่วมเป็นอาสาสมัครในกิจกรรม <br />
  //       ชื่อกิจกรรม <br />
  //       เป็นเวลา 8 ชั่วโมง
  //     </div>

  //     <div class="content">
  //       ระหว่างการทำกิจกรรมอาสาสมัครได้ปฏิบัติหน้าที่ด้วยความเสียสละ มีน้ำใจ
  //       และให้ความ<br />
  //       ร่วมมือแสดงความมีส่วนร่วมที่สำคัญต่อกระบวนการอาสาสมัครหนุนเสริมเป็นกลไกการขับเคลื่อนสังคม<br />
  //       ร่วมกับมูลนิธิกระจกเงาได้เป็นอย่างดี
  //     </div>

  //     <div class="content">
  //       มูลนิธิกระจกเงา
  //       ขอขอบคุณท่านที่ได้ร่วมเป็นส่วนหนึ่งในกิจกรรมอาสาสมัครในครั้งนี้ <br />
  //       ขอให้บทบาทในการเป็น “อาสาสมัคร” ในตัวท่าน
  //       ได้ต่อยอดเพื่อสร้างประโยชน์ต่อสังคมสืบไป
  //     </div>

  //     <div class="content">
  //       ออกให้ ณ วันที่ {{certi_data.currentActivityName.date }}
  //     </div>

  //     <div class="marquee">Certificate of Arsa</div>

  //     <div class="assignment">This certificate is presented to</div>

  //     <div class="person">Pan</div>

  //     <div class="reason">
  //       วันที่<br />
  //       123181
  //     </div>
  //     <div class="bottom-padding"></div>
  //     <!-- </div> -->
  //   </body>
  // </html>
  //   `;

  //   const AngsanaNewBoldItalicBase64 = '...'; // Base64-encoded string of the font file

  //   // Load the font from the base64-encoded string
  //   const customFontBytes = Uint8Array.from(atob(AngsanaNewBoldItalicBase64), (c) => c.charCodeAt(0));
  //   const customFont = await pdfDoc.embedFont(customFontBytes);

  //   const drawTextOptions = {
  //     font: customFont,
  //     size: 12,
  //     color: rgb(0, 0, 0),
  //     alignment: TextAlignment.Left,
  //   };

  //   const lines = content.split('\n').length;
  //   const lineHeight = drawTextOptions.size * 1.2; // Adjust line spacing as needed

  //   const startY = height - margin;
  //   let y = startY - (lines - 1) * lineHeight;

  //   const contentLines = content.split('\n');
  //   for (let line of contentLines) {
  //     page.drawText(line, {
  //       ...drawTextOptions,
  //       x: margin,
  //       y,
  //     });

  //     y -= lineHeight;
  //   }

  //   const pdfBytes = await pdfDoc.save();

  //   const blob = new Blob([pdfBytes], { type: 'application/pdf' });
  //   saveAs(blob, 'certificate.pdf');
  // }

