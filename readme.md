# Unofficial Autochess VNG API
This is a REST Api for fetch **heroes**, **classes**, and **races** data from
[autochess vng](https://autochessvng.com).

> Please note that this is unofficial API

<div align="left">
<img src="https://img.shields.io/badge/Node.js-43853D?style=plastic&logo=node.js&logoColor=white" alt="NodeJs" />
<img src="https://img.shields.io/static/v1?message=KoaJs&color=black&style=plastic&label=&logo=javascript" alt="KoaJs" />
<img src="https://img.shields.io/badge/redis-CC0000.svg?style=plastic&logo=redis&logoColor=white" alt="redis" />
<img src="https://img.shields.io/badge/Jest-C21325?style=plastic&logo=jest&logoColor=white" alt="Jest" />
</div>

# Root Endpoint
```md
https://autochess-vng-api.didadadida93.xyz
```

## Endpoints

#### GET `/heroes`
This endpoint will return a response that contain heroes object.
```js
// response body
[
  {
    id: 1,                             // hero's id
    title: "God of War",               // hero's title
    name: "Ares",                      // hero's name
    quality: "Common",                 // hero's quality
    cost: 1,                           // hero's cost
    races: [                           // hero's races
      {
        synergies: [
          "...",
          "...",
          "..."
        ],
        name: "Divinity",
        icon: "https://..."
      },
      // ... rest of hero's race
    ],
    class: {                           // hero's class detail
      synergies: [
        "...",
        "...",
        "..."
      ],
      name: "Warrior",
      icon: "https://..."
    },
    stats: {
      hp: [650, 1300, 2600],           // hero's hp for star 1, 2, 3
      armor: [5, 5, 5],                // hero's armor for star 1, 2, 3
      magicResistence: [0, 0, 0],      // hero's magic resistance for star 1, 2, 3
      atk: [0, 0, 0],                  // hero's attack for star 1, 2, 3
      atkRate: [0.0, 0.0, 0.0],        // hero's attack rate for star 1, 2, 3
      atkRange: [1, 1, 1]              // hero's attack range for star 1, 2, 3
    },
    ability: {
      name: "Godshield",               // hero's ability name
      picture: "https://....",         // hero's ability picture
      descriptions: [
        "Reduces physical damage ...", // hero's ability description for star 1
        "Reduces physical damage ...", // hero's ability description for star 2
        "Reduces physical damage ..."  // hero's ability description for star 3
      ]
    },
    picture: [
      "https://...",                   // hero's picture for star 1
      "https://...",                   // hero's picture for star 2
      "https://..."                    // hero's picture for star 3
    ]
  },
  // ... rest of hero
]
```

#### GET `/classes`
This endpoint will return a response that contain classes object.
```js
// response body
[
  {
    id: 1,                           // class's id
    name: "Warrior",                 // class's name
    synergies: [                     // description of class synergie
      "(3) All allied warrior ...",
      "(6) All allied warrior ...",
      "(9) All allied warrior ..."
    ],
    icon: "https://..."              // class's icon
  },
  // ... rest of class
]
```

#### GET `/races`
This endpoint will return a response that contain classes object.
```js
// response body
[
  {
    id: 1,                          // race's id
    name: "Human",                  // race's name
    synergies: [                    // description of race synergie
      "(2) All allied humans ...",
      "(4) All allied humans ...",
      "(6) All allied humans ..."
    ],
    icon: "https://..."             // race's icon
  },
  // ... rest of race
]
```

# Rate limit
To avoid so many request, every `ip` will be limited to sent **120 requests** within **1 day**.
So if you already reach your rate limit, please change your `ip` or wait for **1 day**.

You can track how much points left for your `ip` and when it reset by accessing `RateLimit-Remaining` and `RateLimit-Reset` respectively on `response` header.  
If you already reach your limit, you can check when it reset by accessing `RateLimit-Reset` on `response` header.
> The `RateLimit-Reset` time is set to UTC+0.
