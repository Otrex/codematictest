import axios from 'axios'
import { IFilmAxiosResponse } from '../dtos'

axios.defaults.headers.common['Accept'] = 'application/json'
axios.defaults.headers.post['Content-Type'] = 'application/json'

type GetFilmsResponse = {
  results: IFilmAxiosResponse[]
  previous: string | null
  next: string | null
  count: number
}

export default class Swapi {
  private baseUrl = 'https://swapi.dev/api'

  async getFilms(): Promise<GetFilmsResponse> {
    const response = await axios.get(`${this.baseUrl}/films`)
    return response.data
  }

  async getFilm(id: number): Promise<IFilmAxiosResponse> {
    const response = await axios.get(`${this.baseUrl}/films/${id}`)
    return response.data
  }
}
