import { MessageAudioElement, MessageElement, MessageImageElement, MessageTextElement, MessageVideoElement, MessageYoutubeElement, Post, PostData, PostMessage } from '../post.model';

export class PostMapper {
  map(data: PostData): Post {
    return {
      ...data,
      message: this.parseMessage(`${data.message} ${data.attachementUrl ? data.attachementUrl : ''}`)
    }
  }

  private parseMessage(message: string): PostMessage {

    const pictureRegex = /http[s]?:\/\/.+\.(jpeg|png|jpg|gif)/gmi;
    const videoRegex = /http[s]?:\/\/.+\.(mp4|wmv|flv|avi|wav)/gmi;
    const audioRegex = /http[s]?:\/\/.+\.(mp3|ogg|wav)/gmi;
    const youtubeRegex = /(http[s]?:\/\/)?www\.(?:youtube\.com\/\S*(?:(?:\/e(?:mbed))?\/|watch\/?\?(?:\S*?&?v\=))|youtu\.be\/)([a-zA-Z0-9_-]{6,11})/gmi;

    const attachements: MessageElement[] = [];

    const pictureMatche = pictureRegex.exec(message);
    if (pictureMatche) {
      
     let messageImageElement: MessageImageElement = {

      type: 'image',
      url: message
     };
     attachements.push(messageImageElement);
    }

    const videoMatche = videoRegex.exec(message)
    if (videoMatche) {

     let messageVideoElement: MessageVideoElement = {

      type: 'video',
      url: message
     };
     attachements.push(messageVideoElement);
    }

    const audioMatche = audioRegex.exec(message)
    if (audioMatche) {

     let messageAudioElement: MessageAudioElement = {

      type: 'audio',
      url: message
     };
     attachements.push(messageAudioElement);
    }

    const youtubeMatche = youtubeRegex.exec(message)
    if (youtubeMatche) {
    
     let messageYoutubeElement: MessageYoutubeElement = {

      type: 'youtube',
      videoId: youtubeMatche[2]
     };
     attachements.push(messageYoutubeElement);
    }

    return {
      text: {
        type: 'text',
        content: message
      } as MessageTextElement,
      attachements
    };
  }
}
