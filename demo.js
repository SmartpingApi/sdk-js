import SmartpingNodeApi from './lib/node/smartping-api.modern.js';
import { XMLParser } from 'fast-xml-parser';

const smartping = new SmartpingNodeApi('SW399', 'Sy2zMFb91P');
const demo = await smartping.findClubsByDepartment(16);
// console.log(demo);

const parser = new XMLParser();
const xml = parser.parse(demo.toString());
delete xml['?xml']
console.log(xml);
