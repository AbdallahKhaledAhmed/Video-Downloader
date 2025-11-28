export interface YtDlpResponse {
  id: string;
  title: string;
  fulltitle: string;
  description: string;
  thumbnail: string;
  thumbnails: YtDlpThumbnail[];

  // Channel / Uploader Info
  channel: string;
  channel_id: string;
  channel_url: string;
  channel_follower_count: number | null;
  uploader: string;
  uploader_id: string;
  uploader_url: string;
  creators: string[] | null;

  // Metadata
  upload_date: string; // YYYYMMDD
  timestamp: number;
  release_timestamp: number | null;
  release_year: number | null;
  duration: number;
  duration_string: string;
  view_count: number;
  like_count: number | null;
  comment_count: number | null;
  average_rating: number | null;
  age_limit: number;
  webpage_url: string;
  webpage_url_basename: string;
  webpage_url_domain: string;
  original_url: string;
  categories: string[];
  tags: string[];

  // Status
  playable_in_embed: boolean;
  live_status: "is_live" | "was_live" | "not_live";
  is_live: boolean;
  was_live: boolean;
  availability: string | null;

  // Technical
  formats: YtDlpFormat[];
  _format_sort_fields?: string[];

  // Captions & Chapters
  automatic_captions?: Record<string, YtDlpCaption[]>;
  subtitles?: Record<string, YtDlpCaption[]>;
  chapters: YtDlpChapter[] | null;
  heatmap: any | null; // Often null, typically array of data points

  // Selected Format Info (The format yt-dlp chose as "best" by default)
  format_id: string;
  format: string;
  format_note: string;
  ext: string;
  protocol: string;
  vcodec: string;
  acodec: string;
  width: number | null;
  height: number | null;
  resolution: string;
  fps: number | null;
  dynamic_range: string | null;
  aspect_ratio: number | null;
  filesize: number | null;
  filesize_approx: number | null;
  tbr: number | null;
  abr: number | null;
  vbr: number | null;
  asr: number | null;
  audio_channels: number | null;

  // Tool Metadata
  extractor: string;
  extractor_key: string;
  _type: string; // e.g., 'video'
  _version: YtDlpVersion;
  _filename?: string;
  filename?: string;
  epoch: number;
}

export interface YtDlpFormat {
  format_id: string;
  format: string;
  format_note?: string;
  url: string;
  ext: string;
  protocol: string;

  // Audio/Video Codecs
  acodec: string | "none"; // 'none' if video only
  vcodec: string | "none"; // 'none' if audio only

  // Quality Stats
  width: number | null;
  height: number | null;
  fps: number | null;
  rows?: number; // For storyboard formats
  columns?: number; // For storyboard formats
  resolution: string;
  aspect_ratio: number | null;
  dynamic_range?: string | null;

  // Bitrates
  tbr: number | null; // Total Bitrate
  abr: number | null; // Audio Bitrate
  vbr: number | null; // Video Bitrate
  asr: number | null; // Audio Sampling Rate
  audio_channels?: number | null;

  // File info
  filesize: number | null;
  filesize_approx: number | null;

  // Advanced
  container?: string;
  downloader_options?: {
    http_chunk_size?: number;
  };
  http_headers: Record<string, string>;
  fragments?: YtDlpFragment[];

  // Preferences
  source_preference?: number;
  quality?: number;
  has_drm?: boolean;
  language?: string | null;
  language_preference?: number;
  preference?: number | null;
}

export interface YtDlpFragment {
  url: string;
  duration: number;
}

export interface YtDlpThumbnail {
  id: string;
  url: string;
  preference: number;
  width?: number;
  height?: number;
  resolution?: string;
}

export interface YtDlpCaption {
  url: string;
  ext: string; // e.g., 'json3', 'srv1', 'vtt'
  name: string; // Display name
}

export interface YtDlpChapter {
  start_time: number;
  end_time: number;
  title: string;
}

export interface YtDlpVersion {
  version: string;
  current_git_head: string | null;
  release_git_head: string | null;
  repository: string;
}
