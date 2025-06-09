import axios from 'axios';
import { XMLParser } from 'fast-xml-parser';
import { AstroEventItem } from '../types/daily';

const calendarAPI = axios.create({
  baseURL:
    'https://apis.data.go.kr/B090041/openapi/service/AstroEventInfoService',
});

export async function getAstroEvents(
  year: number,
  month: number
): Promise<AstroEventItem[]> {
  try {
    const res = await calendarAPI.get('/getAstroEventInfo', {
      params: {
        solYear: year,
        solMonth: String(month).padStart(2, '0'),
        _type: 'xml',
        ServiceKey: import.meta.env.VITE_CALENDAR_API_KEY,
      },
      responseType: 'text',
    });

    const parser = new XMLParser({ ignoreAttributes: false });
    const jsonData = parser.parse(res.data);

    const items = jsonData?.response?.body?.items?.item;

    if (!items) return [];

    const itemArray = Array.isArray(items) ? items : [items];

    return itemArray.map((item) => ({
      astroEvent: item.astroEvent ?? '',
      astroTitle: item.astroTitle ?? '',
      astroTime: item.astroTime ?? '',
      locdate: Number(item.locdate ?? 0),
    }));
  } catch (error) {
    console.error('astroAPI error:', error);
    return [];
  }
}
