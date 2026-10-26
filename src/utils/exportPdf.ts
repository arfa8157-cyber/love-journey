export interface PdfExportOptions {
  recipientName: string;
  elementId?: string;
}

export async function exportLoveLetterPdf({
  recipientName,
  elementId = 'printable-love-letter'
}: PdfExportOptions): Promise<{ success: boolean; message: string }> {
  try {
    const element = document.getElementById(elementId);
    if (!element) {
      throw new Error(`Export container #${elementId} not found`);
    }

    // Dynamic import for optimal initial bundle size and split chunking
    const html2pdfModule = await import('html2pdf.js');
    const html2pdf = html2pdfModule.default;

    // Sanitize filename to prevent invalid file characters
    const safeName = (recipientName || 'beloved').replace(/[^a-zA-Z0-9_\u0600-\u06FF-]/g, '_');
    const filename = `Love-Letter-${safeName}.pdf`;

    const opt = {
      margin: [10, 10, 10, 10] as [number, number, number, number],
      filename: filename,
      image: { type: 'jpeg' as const, quality: 0.98 },
      html2canvas: {
        scale: 2,
        useCORS: true,
        letterRendering: true,
        logging: false,
        backgroundColor: '#ffffff'
      },
      jsPDF: {
        unit: 'mm' as const,
        format: 'a4' as const,
        orientation: 'portrait' as const
      },
      pagebreak: {
        mode: ['avoid-all', 'css', 'legacy']
      }
    };

    await html2pdf().from(element).set(opt).save();

    return {
      success: true,
      message: `PDF exported successfully as ${filename}!`
    };
  } catch (err: any) {
    console.error('PDF generation error:', err);
    return {
      success: false,
      message: err?.message || 'Could not generate PDF. Please try again or use browser print.'
    };
  }
}
