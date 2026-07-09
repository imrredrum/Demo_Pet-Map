import type { KeyStore } from '../key/store'
import type { PlaceSuggestion } from './schema'

type AutocompleteSuggestionExtended = {
  placePrediction?: {
    placeId?: string
    structuredFormat?: {
      mainText?: {
        text?: string
      }
      secondaryText?: {
        text?: string
      }
    }
  }
}

type AutocompleteResponse = {
  suggestions?: AutocompleteSuggestionExtended[]
}

export async function searchPlaces(
  input: string,
  key: KeyStore['key'],
  signal?: AbortSignal,
): Promise<PlaceSuggestion[]> {
  const res = await fetch(
    'https://places.googleapis.com/v1/places:autocomplete',
    {
      signal,
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-Goog-Api-Key': key ?? '',
      },
      body: JSON.stringify({
        input,
      }),
    },
  )

  const json: AutocompleteResponse = await res.json()

  return (
    json.suggestions?.flatMap(item => {
      const placeId = item.placePrediction?.placeId
      const primaryText = item.placePrediction?.structuredFormat?.mainText?.text

      if (!placeId || !primaryText) {
        return []
      }

      return {
        id: placeId,
        primaryText,
        secondaryText:
          item.placePrediction?.structuredFormat?.secondaryText?.text,
      }
    }) ?? []
  )
}

export async function getPlaceLocation(placeId: string, key: KeyStore['key']) {
  const res = await fetch(
    `https://places.googleapis.com/v1/places/${placeId}`,
    {
      headers: {
        'X-Goog-Api-Key': key ?? '',
        'X-Goog-FieldMask': 'location',
      },
    },
  )

  const json = await res.json()

  return {
    lat: json.location.latitude,
    lng: json.location.longitude,
  }
}
