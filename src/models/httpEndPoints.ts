enum Auth {
  signIn = "/token",
  signUp = "/register",
}

enum Category {
  base = "/category",
}

enum Venue {
  base = "/venue/category/",
}

export const EndPoints = {
  auth: Auth,
  category: Category,
  venue: Venue,
};
