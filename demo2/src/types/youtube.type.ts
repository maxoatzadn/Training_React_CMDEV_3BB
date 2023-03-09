export interface YoutubeResponse {
  youtubes: Youtube[];
  error: boolean;
  error_msg: string;
}

export interface Youtube {
  id: string;
  title: string;
  subtitle: string;
  avatar_image: string;
  youtube_image: string;
}
