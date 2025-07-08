export interface GalleryArtwork {
  id: string;
  title: string;
  artist: string;
  style: string;
  imageUrl: string;
  description: string;
}

export const homeGalleryArtworks: GalleryArtwork[] = [
  {
    id: '1',
    title: '梦幻森林',
    artist: 'AI Artist',
    style: 'Watercolor',
    imageUrl: '/gallery/1.jpg',
    description: '温暖的森林小屋，水彩风格'
  },
  {
    id: '2', 
    title: '海边灯塔',
    artist: 'AI Artist',
    style: 'Line Art',
    imageUrl: '/gallery/2.jpg',
    description: '孤独的海边灯塔，线条艺术风格'
  },
  {
    id: '3',
    title: '山间古寺',
    artist: 'AI Artist', 
    style: 'Ghibli Style',
    imageUrl: '/gallery/3.jpg',
    description: '古老的山间寺庙，吉卜力风格'
  },
  {
    id: '4',
    title: '城市夜景',
    artist: 'AI Artist',
    style: 'Pixel Art', 
    imageUrl: '/gallery/4.jpg',
    description: '繁华的城市夜景，像素艺术'
  },
  {
    id: '5',
    title: '沙漠绿洲',
    artist: 'AI Artist',
    style: 'Oil Paint',
    imageUrl: '/gallery/5.jpg',
    description: '美丽的沙漠绿洲色彩'
  },
  {
    id: '6',
    title: '雪村小镇',
    artist: 'AI Artist',
    style: 'Pencil Sketch',
    imageUrl: '/gallery/6.jpg',
    description: '宁静的雪村景色'
  },
  {
    id: '7',
    title: '花园咖啡厅',
    artist: 'AI Artist',
    style: 'Cartoon',
    imageUrl: '/gallery/7.jpg',
    description: '温馨的花园咖啡厅'
  },
  {
    id: '8',
    title: '星空下的湖泊',
    artist: 'AI Artist',
    style: 'Realistic',
    imageUrl: '/gallery/8.jpg',
    description: '星空下宁静的湖泊'
  },
  {
    id: '9',
    title: '竹林小径',
    artist: 'AI Artist',
    style: 'Watercolor',
    imageUrl: '/gallery/9.jpg',
    description: '幽静的竹林小径'
  },
  {
    id: '10',
    title: '古堡远景',
    artist: 'AI Artist',
    style: 'Cartoon',
    imageUrl: '/gallery/10.png',
    description: '山顶上的古老城堡'
  },
  {
    id: '11',
    title: '樱花飞舞',
    artist: 'AI Artist',
    style: 'Line Art',
    imageUrl: '/gallery/11.png',
    description: '樱花盛开的春日景色'
  },
  {
    id: '12',
    title: '海底世界',
    artist: 'AI Artist',
    style: 'Sketch',
    imageUrl: '/gallery/12.png',
    description: '梦幻的海底世界'
  }
]; 