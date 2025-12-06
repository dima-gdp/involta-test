import { XMLParser } from 'fast-xml-parser'

export function parseXml(xml: string): unknown {
  const parser = new XMLParser({
    ignoreAttributes: false,
    attributeNamePrefix: '',
  })

  return parser.parse(xml)
}
