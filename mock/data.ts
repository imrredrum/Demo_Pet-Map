import { Place } from '@/domain/place/schema'
import { Category, Tag } from '@/domain/tag/schema'

const MOCK_CATEGORIES: Category[] = [
  { id: '1', name: '縣市地區' },
  { id: '2', name: '餐廳類型' },
  { id: '3', name: '友善標籤' },
] as const

const TAG_CATEGORIES: Tag[] = [
  { id: '1', name: '台北市', categoryId: '1' },
  { id: '2', name: '高雄市', categoryId: '1' },
  { id: '3', name: '歐陸餐廳', categoryId: '2' },
  { id: '4', name: '中式餐廳', categoryId: '2' },
  { id: '5', name: '日式餐廳', categoryId: '2' },
  { id: '6', name: '義式餐廳', categoryId: '2' },
  { id: '7', name: '美式餐廳', categoryId: '2' },
  { id: '8', name: '素食餐廳', categoryId: '2' },
  { id: '9', name: '咖啡廳', categoryId: '2' },
  { id: '10', name: '甜點店', categoryId: '2' },
  { id: '11', name: '水', categoryId: '3' },
  { id: '12', name: '必須牽繩', categoryId: '3' },
  { id: '13', name: '放寵物推車(袋)', categoryId: '3' },
  { id: '14', name: '可停車', categoryId: '3' },
  { id: '15', name: '可落地', categoryId: '3' },
  { id: '16', name: '可上椅', categoryId: '3' },
  { id: '17', name: '寵物餐', categoryId: '3' },
  { id: '18', name: '禮貌袋', categoryId: '3' },
] as const

const PLACES_MATERIAL: Omit<Place, 'latitude' | 'longitude'>[] = [
  {
    id: '1',
    placeId: '1',
    name: '喬的義百種料理',
    address: '807高雄市三民區達仁里撫順街53號',
    tagIds: ['3', '11', '12', '13', '14'],
    cover: null,
    album: [],
    phoneNumber: '073222539',
    score: 5,
  },
  {
    id: '2',
    placeId: '2',
    name: '慢活的普普',
    address: '800高雄市新興區成功里林森一路230號和六合一路交叉口',
    tagIds: ['11', '15', '16'],
    cover: null,
    album: [],
    phoneNumber: '073222539',
    score: 4,
  },
  {
    id: '3',
    placeId: '3',
    name: '初覓手作餐坊',
    address: '800高雄市新興區開平里洛陽街68號',
    tagIds: ['15', '16', '18', '14'],
    cover: null,
    album: [],
    phoneNumber: '073222539',
    score: 4,
  },
  {
    id: '4',
    placeId: '4',
    name: '腦波小姐的廚房',
    address: '807高雄市三民區建東里建國三路213號',
    tagIds: ['17', '11', '15', '16', '18', '14'],
    cover: null,
    album: [],
    phoneNumber: '073222539',
    score: 4,
  },
  {
    id: '5',
    placeId: '5',
    name: 'TO DAY 致日子咖啡｜寵物友善 漢口店',
    address: '807高雄市三民區安邦里漢口街200號',
    tagIds: ['17', '11', '15', '16', '18', '14'],
    cover: null,
    album: [],
    phoneNumber: '073222539',
    score: 4,
  },
] as const

export { MOCK_CATEGORIES, TAG_CATEGORIES, PLACES_MATERIAL }
