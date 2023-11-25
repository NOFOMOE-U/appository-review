import PDFKit from 'pdfkit';
import { CollaborationOptions, StickyNote } from "./collaboration-and-interaction/colab-document-interfaces";

interface CustomPDFDocument extends PDFKit.PDFDocument {
    addOutlines(outlines: any[]): void;
    addParagraphs(paragraphs: string[]): void;
    addFlowCharts(flowCharts: string[]): void;
    addPlanningCharts(planningCharts: string[]): void;
    addDatabaseDiagrams(databaseDiagrams: string[]): void;
    addFooter(collaborationOptions: CollaborationOptions, footer?: string): void;
    addStickyNotes(collaborationOptions: CollaborationOptions, notes?: StickyNote[]): void;
  }
  