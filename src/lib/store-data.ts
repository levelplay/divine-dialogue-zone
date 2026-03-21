export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  image: string;
  category: "ticket" | "merch";
  themeId: string;
}

export interface Theme {
  id: string;
  name: string;
  year: number;
  description: string;
  color: string;
}

export const themes: Theme[] = [
  { id: "be-bold", name: "Be Bold", year: 2025, description: "Step into courage and faith with boldness.", color: "hsl(152, 35%, 28%)" },
  { id: "do-good", name: "Do Good", year: 2024, description: "A year of service and compassion.", color: "hsl(38, 75%, 55%)" },
  { id: "rise-up", name: "Rise Up", year: 2023, description: "Rising together in unity and purpose.", color: "hsl(200, 40%, 40%)" },
];

export const products: Product[] = [
  { id: "bb-ticket-elder", name: "Elder Conference Ticket", description: "Full access for elders to the Be Bold conference.", price: 150, image: "🎫", category: "ticket", themeId: "be-bold" },
  { id: "bb-ticket-adult", name: "Adult Conference Ticket", description: "Standard adult admission to the Be Bold conference.", price: 120, image: "🎫", category: "ticket", themeId: "be-bold" },
  { id: "bb-ticket-youth", name: "Youth Conference Ticket", description: "Youth admission (13–25) to the Be Bold conference.", price: 80, image: "🎫", category: "ticket", themeId: "be-bold" },
  { id: "bb-ticket-child", name: "Child Conference Ticket", description: "Children's admission (under 13) to the Be Bold conference.", price: 40, image: "🎫", category: "ticket", themeId: "be-bold" },
  { id: "bb-tshirt", name: "Be Bold T-Shirt", description: "Youth First branded Be Bold t-shirt.", price: 250, image: "👕", category: "merch", themeId: "be-bold" },
  { id: "bb-hoodie", name: "Be Bold Hoodie", description: "Youth First branded Be Bold hoodie.", price: 450, image: "🧥", category: "merch", themeId: "be-bold" },
  { id: "bb-cap", name: "Be Bold Cap", description: "Youth First branded Be Bold cap.", price: 150, image: "🧢", category: "merch", themeId: "be-bold" },
  { id: "dg-ticket-elder", name: "Elder Conference Ticket", description: "Full access for elders to the Do Good conference.", price: 150, image: "🎫", category: "ticket", themeId: "do-good" },
  { id: "dg-ticket-adult", name: "Adult Conference Ticket", description: "Standard adult admission to the Do Good conference.", price: 120, image: "🎫", category: "ticket", themeId: "do-good" },
  { id: "dg-ticket-youth", name: "Youth Conference Ticket", description: "Youth admission to the Do Good conference.", price: 80, image: "🎫", category: "ticket", themeId: "do-good" },
  { id: "dg-tshirt", name: "Do Good T-Shirt", description: "Youth First branded Do Good t-shirt.", price: 250, image: "👕", category: "merch", themeId: "do-good" },
  { id: "ru-ticket-adult", name: "Adult Conference Ticket", description: "Standard adult admission to the Rise Up conference.", price: 120, image: "🎫", category: "ticket", themeId: "rise-up" },
  { id: "ru-ticket-youth", name: "Youth Conference Ticket", description: "Youth admission to the Rise Up conference.", price: 80, image: "🎫", category: "ticket", themeId: "rise-up" },
  { id: "ru-hoodie", name: "Rise Up Hoodie", description: "Youth First branded Rise Up hoodie.", price: 450, image: "🧥", category: "merch", themeId: "rise-up" },
];

export interface CartItem {
  product: Product;
  quantity: number;
}

export interface FeedPost {
  id: string;
  title: string;
  content: string;
  category: "announcement" | "event" | "link";
  date: string;
  linkUrl?: string;
  linkLabel?: string;
}

export const samplePosts: FeedPost[] = [
  { id: "1", title: "Be Bold Conference 2025", content: "Registration is now open for the annual Be Bold conference. Secure your tickets early through our online store.", category: "announcement", date: "2025-06-15" },
  { id: "2", title: "Sunday Service Schedule", content: "First service: 08:00 – 10:00\nSecond service: 10:30 – 12:30\nEvening service: 17:00 – 19:00", category: "event", date: "2025-06-10" },
  { id: "3", title: "National Day of Prayer", content: "Join believers across the nation for a day of prayer and intercession.", category: "link", date: "2025-06-08", linkUrl: "#", linkLabel: "View prayer guide" },
  { id: "4", title: "Youth First Merch Drop", content: "New Be Bold merchandise is available in the online store. T-shirts, hoodies, and caps.", category: "announcement", date: "2025-06-05" },
  { id: "5", title: "Venue Directions — Main Campus", content: "Get directions to the main church campus for upcoming services and events.", category: "link", date: "2025-06-01", linkUrl: "#", linkLabel: "Open in Maps" },
];

export interface Hymn {
  id: number;
  title: string;
  lyrics: string;
}

export const sampleHymns: Hymn[] = [
  { id: 1, title: "Amazing Grace", lyrics: "Amazing grace, how sweet the sound,\nThat saved a wretch like me!\nI once was lost, but now am found,\nWas blind, but now I see.\n\n'Twas grace that taught my heart to fear,\nAnd grace my fears relieved;\nHow precious did that grace appear\nThe hour I first believed." },
  { id: 2, title: "How Great Thou Art", lyrics: "O Lord my God, when I in awesome wonder\nConsider all the worlds Thy hands have made,\nI see the stars, I hear the rolling thunder,\nThy power throughout the universe displayed.\n\nThen sings my soul, my Savior God, to Thee:\nHow great Thou art! How great Thou art!" },
  { id: 3, title: "Blessed Assurance", lyrics: "Blessed assurance, Jesus is mine!\nOh, what a foretaste of glory divine!\nHeir of salvation, purchase of God,\nBorn of His Spirit, washed in His blood.\n\nThis is my story, this is my song,\nPraising my Savior all the day long." },
  { id: 4, title: "Great Is Thy Faithfulness", lyrics: "Great is Thy faithfulness, O God my Father,\nThere is no shadow of turning with Thee;\nThou changest not, Thy compassions, they fail not;\nAs Thou hast been Thou forever wilt be.\n\nGreat is Thy faithfulness!\nGreat is Thy faithfulness!\nMorning by morning new mercies I see." },
  { id: 5, title: "It Is Well With My Soul", lyrics: "When peace like a river attendeth my way,\nWhen sorrows like sea billows roll;\nWhatever my lot, Thou hast taught me to say,\nIt is well, it is well with my soul.\n\nIt is well with my soul,\nIt is well, it is well with my soul." },
  { id: 6, title: "Holy, Holy, Holy", lyrics: "Holy, holy, holy! Lord God Almighty!\nEarly in the morning our song shall rise to Thee;\nHoly, holy, holy! Merciful and mighty!\nGod in three Persons, blessed Trinity!" },
];

export interface PrayerRequest {
  id: string;
  content: string;
  author: string;
  date: string;
  supportCount: number;
}

export const samplePrayers: PrayerRequest[] = [
  { id: "p1", content: "Please pray for healing for my mother who is unwell.", author: "Anonymous", date: "2025-06-14", supportCount: 12 },
  { id: "p2", content: "Pray for the youth conference preparations and all volunteers.", author: "Sister Thandi", date: "2025-06-13", supportCount: 8 },
  { id: "p3", content: "Pray for our nation and its leaders.", author: "Anonymous", date: "2025-06-12", supportCount: 24 },
  { id: "p4", content: "Asking for prayers for my family during this difficult season.", author: "Brother James", date: "2025-06-10", supportCount: 15 },
  { id: "p5", content: "Pray for safe travels for all conference attendees.", author: "Anonymous", date: "2025-06-09", supportCount: 6 },
];

export interface ChurchEvent {
  id: string;
  title: string;
  date: string;
  time: string;
  venue: string;
  description: string;
}

export const sampleEvents: ChurchEvent[] = [
  { id: "e1", title: "Be Bold Conference 2025", date: "2025-07-20", time: "08:00 – 18:00", venue: "Main Campus Auditorium", description: "Annual youth conference with worship, speakers, and fellowship." },
  { id: "e2", title: "Sunday Worship Service", date: "2025-06-22", time: "08:00 – 12:30", venue: "Main Campus", description: "Regular Sunday services — first and second service." },
  { id: "e3", title: "Mid-week Bible Study", date: "2025-06-18", time: "18:30 – 20:00", venue: "Fellowship Hall", description: "Deep dive into the book of Romans." },
  { id: "e4", title: "Youth First Meeting", date: "2025-06-21", time: "14:00 – 16:00", venue: "Youth Centre", description: "Monthly youth gathering with worship and discussion." },
  { id: "e5", title: "National Day of Prayer", date: "2025-06-28", time: "06:00 – 18:00", venue: "Various Locations", description: "A day of prayer and fasting for the nation." },
];
