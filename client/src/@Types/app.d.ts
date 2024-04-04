interface IUserProfile {
  _id?: string;
  avatar?: string;
  username: string;
  email: string;
  password: string;
  full_name: string;
  created_at?: string;
  updated_at?: string;
}

interface IProduct {
  _id?: string;
  image: string;
  name: string;
  description: string;
  price: number;
  stock: number;
  category: string;
}

interface IReview {
  _id?: string;
  title: string;
  content: string;
  rating: number;
}
