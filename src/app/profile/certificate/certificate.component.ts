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
    <html>
    <body id="element-to-export">
      <!-- <div class="container" > -->
      <div class="top-padding"></div>
      <div class="header">" อาสาสมัคร "</div>
  
      <div class="tagline">
        คือคนที่มีหัวใจอาสา คนที่อยากเห็นสังคมงดงาม<br />
        คนที่แสวงหาความหมายของการมีชีวิตอยู่อย่างมีคุณค่า
      </div>
  
      <div class="ensure">
        มูลนิธิกระจกเงา ขอรับรองว่า {{ certi_data?.currentUser?.result?.name }}  <br />
        ได้เข้าร่วมเป็นอาสาสมัครในกิจกรรม <br />
        ชื่อกิจกรรม <br />
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
        ออกให้ ณ วันที่ {{certi_data.currentActivityName.date }}
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
