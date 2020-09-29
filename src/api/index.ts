/* eslint-disable-next-line no-restricted-imports */
import ky from 'ky'
import PathMapping from './PathMapping'
import getMessage from './ExceptionIdMapping'

/**
 * A common part that calls the API.
 */
const api: API = createAPI(process.env.NODE_ENV)
export default api

type API = <TPath extends keyof PathMapping>(
  path: TPath,
  json: PathMapping[TPath][0],
) => Promise<PathMapping[TPath][1]>

/**
 * Generate an API call function according to the build condition (`NODE_ENV`).
 *
 * - **production**: Call URL with POST and return JSON.
 * - **development**: Same as production.
 * - **mock**: Get the JSON file with GET. Imitate the loading time with a delay on purpose.
 *
 * @param env The value of the environment variable `NODE_ENV`
 */
function createAPI(env?: string): API {
  const kyExtend = ky.extend({
    hooks: {
      afterResponse: [
        resp => {
          if (resp.ok) return
          // eslint-disable-next-line no-console
          console.error(resp)
        },
      ],
    },
    timeout: false,
  })

  switch (env) {
    case 'mock': {
      return url =>
        new Promise((resolve, reject) =>
          kyExtend
            .get(`${url}.json`)
            .json()
            .then(data => setTimeout(() => resolve(data as any), 1000), reject),
        )
    }

    case 'development':
    case 'production':
    default: {
      return (url, json) =>
        kyExtend
          .post(url, { json })
          .json()
          .then((data: Resolved<ReturnType<API>>) => {
            if (data.resultCode !== 'C200') {
              // eslint-disable-next-line no-console
              console.error(url, json, data)
              throw new Error(getMessage(url, data))
            }

            return data
          })
    }
  }
}
