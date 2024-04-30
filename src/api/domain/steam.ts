export interface Player {
  steamid: number;
  communityvisibilitystate: number;
  profilestate: number;
  personaname: string;
  commentpermission: number;
  profileurl: string;
  avatar: string;
  avatarmedium: string;
  avatarfull: string;
  avatarhash: string;
  lastlogoff: number;
  personastate: number;
  realname: string;
  primaryclanid: string;
  timecreated: number;
  personastateflags: number;
};

export interface Game {
  appid: number;
  name: string;
  playtime_2weeks: number;
  playtime_forever: number;
  img_icon_url: string;
  playtime_windows_forever: number;
  playtime_mac_forever: number;
  playtime_linux_forever: number;
  playtime_deck_forever: number;
};

export type SteamResponse<T> = {
  response: T
};

export type SteamProfileResponse = SteamResponse<{
  players: Player[];
}>;

export type SteamGamesResponse = SteamResponse<{
  total_count: number;
  games: Game[];
}>;
