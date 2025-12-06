/**
 * RSS 2.0 Types based on official specification
 * @see https://www.rssboard.org/rss-specification
 */

export interface RssEnclosure {
  url: string
  length: number
  type: string
}

export interface RssGuid {
  value: string
  isPermaLink?: boolean
}

export interface RssSource {
  url: string
  value: string
}

export interface RssCategory {
  domain?: string
  value: string
}

export interface RssImage {
  url: string
  title: string
  link: string
  width?: number
  height?: number
  description?: string
}

export interface RssCloud {
  domain: string
  port: number
  path: string
  registerProcedure: string
  protocol: string
}

export interface RssTextInput {
  title: string
  description: string
  name: string
  link: string
}

export interface RssItem {
  /** Title of the item */
  title?: string
  /** URL of the item */
  link?: string
  /** Item synopsis (required if no title) */
  description?: string
  /** Email address of the author */
  author?: string
  /** Include the item in one or more categories */
  category?: RssCategory | RssCategory[]
  /** URL of a page for comments relating to the item */
  comments?: string
  /** Media object attached to the item */
  enclosure?: RssEnclosure | RssEnclosure[]
  /** Unique identifier for the item */
  guid?: RssGuid | string
  /** Publication date */
  pubDate?: string
  /** The RSS channel that the item came from */
  source?: RssSource
}

export interface RssChannel {
  /** Name of the channel */
  title: string
  /** URL to the HTML website corresponding to the channel */
  link: string
  /** Phrase or sentence describing the channel */
  description: string
  /** Language the channel is written in */
  language?: string
  /** Copyright notice */
  copyright?: string
  /** Email address for person responsible for editorial content */
  managingEditor?: string
  /** Email address for person responsible for technical issues */
  webMaster?: string
  /** Publication date for the content in the channel */
  pubDate?: string
  /** Last time the content was changed */
  lastBuildDate?: string
  /** Specify one or more categories */
  category?: RssCategory | RssCategory[]
  /** String indicating the program used to generate the channel */
  generator?: string
  /** URL that points to the documentation for the format */
  docs?: string
  /** Allows processes to register with a cloud */
  cloud?: RssCloud
  /** Number of minutes that indicates how long a channel can be cached */
  ttl?: number
  /** GIF, JPEG or PNG image that can be displayed with the channel */
  image?: RssImage
  /** PICS rating for the channel */
  rating?: string
  /** Specifies a text input box that can be displayed with the channel */
  textInput?: RssTextInput
  /** Hint telling aggregators which hours they can skip */
  skipHours?: number[]
  /** Hint telling aggregators which days they can skip */
  skipDays?: string[]
  /** Array of items */
  item?: RssItem | RssItem[]
}

export interface RssFeed {
  rss: {
    /** RSS version, should be "2.0" */
    version?: string
    channel: RssChannel
  }
}
