# github-contributions-api

### Disclaimer

------

This api provides a json version of the contributions activity table on a github user's profile page. This was created because github does not provide an api for retrieving a users' total contributions.


### Usage

`GET http://host:3300/api/:user`

Returns whether or not user was active on a given day within the last year

```js
{
  "data": {
     "2020-02-23": {
                "count": 1,
                "level": 1,
                "color": "#9be9a8"
            },
            "2020-02-24": {
                "count": 21,
                "level": 3,
                "color": "#30a14e"
            },
            "2020-02-25": {
                "count": 15,
                "level": 3,
                "color": "#30a14e"
            }, //...
    }
  }
}
```


### Installation

Clone this repo:

```sh
git clone https://github.com/aas-spec/github-contributions-api.git
```

Install node modules:

```sh
npm install
```

### Running

Development (will restart on code changes):

```sh
npm run start:dev
```

Production:

```sh
npm run start
```
