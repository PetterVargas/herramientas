import { CfbfReader } from './cfbf';
import { parsePropertySet, PIDSI, PIDDSI } from './cfbf-properties';

export interface LegacyOfficeMetadata {
  title?: string;
  subject?: string;
  author?: string;
  keywords?: string;
  comments?: string;
  template?: string;
  lastAuthor?: string;
  revisionNumber?: string;
  createTime?: Date;
  lastSavedTime?: Date;
  lastPrinted?: Date;
  pageCount?: number;
  wordCount?: number;
  charCount?: number;
  appName?: string;
  manager?: string;
  company?: string;
}

function asString(v: unknown): string | undefined {
  return typeof v === 'string' && v.length > 0 ? v : undefined;
}

function asNumber(v: unknown): number | undefined {
  return typeof v === 'number' ? v : undefined;
}

function asDate(v: unknown): Date | undefined {
  return v instanceof Date ? v : undefined;
}

export function extractLegacyOfficeMetadata(bytes: Uint8Array): LegacyOfficeMetadata {
  const reader = new CfbfReader(bytes);
  const result: LegacyOfficeMetadata = {};

  const siStream = reader.getStream('\x05SummaryInformation');
  if (siStream) {
    const [section] = parsePropertySet(siStream);
    if (section) {
      const p = section.properties;
      result.title = asString(p.get(PIDSI.TITLE));
      result.subject = asString(p.get(PIDSI.SUBJECT));
      result.author = asString(p.get(PIDSI.AUTHOR));
      result.keywords = asString(p.get(PIDSI.KEYWORDS));
      result.comments = asString(p.get(PIDSI.COMMENTS));
      result.template = asString(p.get(PIDSI.TEMPLATE));
      result.lastAuthor = asString(p.get(PIDSI.LAST_AUTHOR));
      result.revisionNumber = asString(p.get(PIDSI.REVISION_NUMBER));
      result.createTime = asDate(p.get(PIDSI.CREATE_TIME));
      result.lastSavedTime = asDate(p.get(PIDSI.LAST_SAVED_TIME));
      result.lastPrinted = asDate(p.get(PIDSI.LAST_PRINTED));
      result.pageCount = asNumber(p.get(PIDSI.PAGE_COUNT));
      result.wordCount = asNumber(p.get(PIDSI.WORD_COUNT));
      result.charCount = asNumber(p.get(PIDSI.CHAR_COUNT));
      result.appName = asString(p.get(PIDSI.APP_NAME));
    }
  }

  const dsiStream = reader.getStream('\x05DocumentSummaryInformation');
  if (dsiStream) {
    const [section] = parsePropertySet(dsiStream);
    if (section) {
      result.manager = asString(section.properties.get(PIDDSI.MANAGER));
      result.company = asString(section.properties.get(PIDDSI.COMPANY));
    }
  }

  return result;
}
