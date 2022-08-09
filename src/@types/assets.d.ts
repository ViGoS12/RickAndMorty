declare module '*.scss' {
  const content: { [key: string]: any }
  export = content
}

declare module '*.svg' {
  const content: any
  export default content
}

type Dispather<S> = Dispatch<SetStateAction<S>>

type Character = {
  id: number
  name: string
  status: string
  species: string
  type: string
  gender: string
  origin: {
    name: string
    url: string
  }
  location: {
    name: string
    url: string
  }
  image: string
  episode: Array<string>
  url: string
  created: string
}

type Filter = {
  page: number
  name: string
  status: string
  species: string
  type: string
  gender: string
}

type IOption = {
  value: string
  label: string
}

type Info = {
  count: number
  pages: number
  next: string
  prev: string
}

type ResultsEpisodes = {
  id: number
  name: string
  air_date: string
  episode: string
  characters: [string]
  url: string
  created: string
}
