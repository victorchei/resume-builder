import {
  Document, Packer, Paragraph, TextRun, HeadingLevel,
  AlignmentType, BorderStyle, TabStopPosition, TabStopType,
  SectionType,
} from 'docx';
import { writeFileSync } from 'fs';
import { formatDateRange } from '../utils/profile.js';

const COLORS = {
  primary: '1a1a2e',
  accent: '0f3460',
  muted: '666666',
  text: '333333',
};

export async function generateDOCX(data, variant, outputPath) {
  const lang = variant.language || 'en';
  const labels = {
    en: { experience: 'Experience', skills: 'Skills', education: 'Education', languages: 'Languages', projects: 'Projects' },
    uk: { experience: 'Досвід', skills: 'Навички', education: 'Освіта', languages: 'Мови', projects: 'Проєкти' },
  };
  const l = labels[lang] || labels.en;

  const children = [];

  // Header: Name + Title
  if (data.sections.includes('personal')) {
    children.push(
      new Paragraph({
        alignment: AlignmentType.CENTER,
        spacing: { after: 80 },
        children: [new TextRun({ text: data.personal.name, bold: true, size: 36, color: COLORS.primary, font: 'Calibri' })],
      }),
      new Paragraph({
        alignment: AlignmentType.CENTER,
        spacing: { after: 80 },
        children: [new TextRun({ text: data.personal.title, size: 22, color: COLORS.muted, font: 'Calibri' })],
      }),
    );

    // Contacts line
    const contactParts = [];
    if (data.personal.contacts.email) contactParts.push(data.personal.contacts.email);
    if (data.personal.contacts.phone) contactParts.push(data.personal.contacts.phone);
    if (data.personal.contacts.linkedin) contactParts.push(data.personal.contacts.linkedin);
    if (data.personal.location) contactParts.push(data.personal.location);

    if (contactParts.length) {
      children.push(new Paragraph({
        alignment: AlignmentType.CENTER,
        spacing: { after: 200 },
        children: [new TextRun({ text: contactParts.join('  |  '), size: 18, color: COLORS.muted, font: 'Calibri' })],
      }));
    }
  }

  // Summary
  if (data.sections.includes('summary') && data.personal.summary) {
    children.push(new Paragraph({
      spacing: { after: 200 },
      children: [new TextRun({ text: data.personal.summary, italics: true, size: 20, color: COLORS.muted, font: 'Calibri' })],
    }));
  }

  // Experience
  if (data.sections.includes('experience') && data.experience?.length) {
    children.push(sectionHeading(l.experience));
    for (const exp of data.experience) {
      const dateRange = formatDateRange(exp.startDate, exp.endDate, lang);
      children.push(
        new Paragraph({
          spacing: { before: 120, after: 40 },
          children: [
            new TextRun({ text: exp.position, bold: true, size: 21, color: COLORS.primary, font: 'Calibri' }),
            new TextRun({ text: `    ${dateRange}`, size: 18, color: COLORS.muted, font: 'Calibri' }),
          ],
        }),
        new Paragraph({
          spacing: { after: 60 },
          children: [new TextRun({ text: `${exp.company}${exp.location ? ` — ${exp.location}` : ''}`, size: 19, color: COLORS.muted, font: 'Calibri' })],
        }),
      );

      const desc = Array.isArray(exp.description) ? exp.description : (exp.description ? [exp.description] : []);
      for (const bullet of desc) {
        children.push(new Paragraph({
          spacing: { after: 40 },
          bullet: { level: 0 },
          children: [new TextRun({ text: bullet, size: 20, font: 'Calibri' })],
        }));
      }

      if (exp.technologies?.length) {
        children.push(new Paragraph({
          spacing: { after: 80 },
          children: [new TextRun({ text: exp.technologies.join(', '), size: 18, color: COLORS.muted, italics: true, font: 'Calibri' })],
        }));
      }
    }
  }

  // Skills
  if (data.sections.includes('skills') && Object.keys(data.skills).length) {
    children.push(sectionHeading(l.skills));
    for (const [cat, items] of Object.entries(data.skills)) {
      children.push(new Paragraph({
        spacing: { after: 60 },
        children: [
          new TextRun({ text: `${cat}: `, bold: true, size: 20, color: COLORS.accent, font: 'Calibri' }),
          new TextRun({ text: items.join(', '), size: 20, font: 'Calibri' }),
        ],
      }));
    }
  }

  // Education
  if (data.sections.includes('education') && data.education?.length) {
    children.push(sectionHeading(l.education));
    for (const edu of data.education) {
      const dateRange = formatDateRange(edu.startDate, edu.endDate, lang);
      children.push(
        new Paragraph({
          spacing: { before: 100, after: 40 },
          children: [
            new TextRun({ text: `${edu.degree}${edu.field ? ` — ${edu.field}` : ''}`, bold: true, size: 21, color: COLORS.primary, font: 'Calibri' }),
            new TextRun({ text: `    ${dateRange}`, size: 18, color: COLORS.muted, font: 'Calibri' }),
          ],
        }),
        new Paragraph({
          spacing: { after: 80 },
          children: [new TextRun({ text: edu.institution, size: 19, color: COLORS.muted, font: 'Calibri' })],
        }),
      );
    }
  }

  // Languages
  if (data.sections.includes('languages') && data.languages?.length) {
    children.push(sectionHeading(l.languages));
    for (const lng of data.languages) {
      children.push(new Paragraph({
        spacing: { after: 40 },
        children: [
          new TextRun({ text: `${lng.name}: `, bold: true, size: 20, font: 'Calibri' }),
          new TextRun({ text: lng.level, size: 20, font: 'Calibri' }),
        ],
      }));
    }
  }

  // Projects
  if (data.sections.includes('projects') && data.projects?.length) {
    children.push(sectionHeading(l.projects));
    for (const proj of data.projects) {
      children.push(
        new Paragraph({
          spacing: { before: 80, after: 40 },
          children: [
            new TextRun({ text: proj.name, bold: true, size: 21, color: COLORS.primary, font: 'Calibri' }),
            ...(proj.url ? [new TextRun({ text: `  ${proj.url}`, size: 18, color: COLORS.accent, font: 'Calibri' })] : []),
          ],
        }),
        new Paragraph({
          spacing: { after: 60 },
          children: [new TextRun({ text: proj.description || '', size: 20, font: 'Calibri' })],
        }),
      );
    }
  }

  const doc = new Document({
    sections: [{
      properties: {
        page: {
          margin: { top: 720, right: 720, bottom: 720, left: 720 },
        },
      },
      children,
    }],
  });

  const buffer = await Packer.toBuffer(doc);
  writeFileSync(outputPath, buffer);
}

function sectionHeading(text) {
  return new Paragraph({
    spacing: { before: 240, after: 120 },
    border: { bottom: { style: BorderStyle.SINGLE, size: 2, color: COLORS.accent } },
    children: [new TextRun({
      text: text.toUpperCase(),
      bold: true,
      size: 22,
      color: COLORS.accent,
      font: 'Calibri',
      characterSpacing: 60,
    })],
  });
}
