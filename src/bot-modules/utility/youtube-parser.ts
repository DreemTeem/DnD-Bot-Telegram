import { GaxiosResponse } from 'gaxios';
import { google, youtube_v3 } from 'googleapis';
export class YoutubeParser {

    public static async getLatestYoutubeVideo(channelUrl: string): Promise<any> {
        return google.youtube('v3').playlistItems.list(
            {
                part: ['snippet', 'contentDetails'],
                playlistId: 'UUD6VugMZKRhSyzWEWA9W2fg',
                key: process.env.YT_API_KEY
            }
        ).then((latestVids: GaxiosResponse<youtube_v3.Schema$PlaylistItemListResponse>) => {
            return latestVids.data.items[0].contentDetails.videoId;
        }, (err) => {
            return err;
        });
    }
}