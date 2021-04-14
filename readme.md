# Unofficial Autochess VNG API
This is a REST Api for fetch **heroes**, **classes**, and **races** data from
[autochess vng](https://autochessvng.com).

> Please note that this is unofficial API

# Root Endpoint
```md
https://autochess-vng-api.didadadida93.xyz
```

## Endpoints

#### GET `/heroes`
This endpoint will return `hero` object. The `hero` object have several properties
```ts
// response object
type Response = Array<hero>

// hero object

type hero = {
  id: number
  title: string
  name: string
  quality: string
  cost: number
  races: Array<string>
  class: string
  stats: Stats
  ability: Ability
  pictures: Array<string>
}

type Stats = {
  hp: Array<number>
  armor: Array<number>
  magicResistence: Array<number>
  atk: Array<number>
  atkRate: Array<number>
  atkRange: Array<number>
}

type Ability = {
  name: string
  picture: string,
  descriptions: Array<string>
}
```

#### GET `/classes`
This endpoint will return `class` object. The `class` object have several properties
```ts
// response object
type Response = Array<class_>

// class_ object

type class_ = {
  id: number,
  name: string,
  synergies: Array<string>
}
```

#### GET `/races`
This endpoint will return `race` object. The `race` object have several properties
```ts
// response object
type Response = Array<race>

// race object

type race = {
  id: number,
  name: string,
  synergies: Array<string>
}
```

# Rate limit
To avoid so many request, every `ip` will be limited to sent **120 requests** within **1 day**.
So if you already reach your rate limit, please change your `ip` or wait for **1 day**.

You can track how much points left for your `ip` and when it reset by accessing `RateLimit-Remaining` and `RateLimit-Reset` respectively on `response` header.  
If you already reach your limit, you can check when it reset by accessing `RateLimit-Reset` on `response` header.

