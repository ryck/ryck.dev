import { ImageResponse } from 'next/og'

export function GET(request: Request) {
  try {
    // 1: get the searchParams from the request URL
    const { searchParams } = new URL(request.url)

    // 2: Check if title or description are in the params
    const hasTitle = searchParams.has('title')
    const hasDescription = searchParams.has('description')
    const hasPublishedTime = searchParams.has('publishedTime')
    const hasCategories = searchParams.has('categories')

    // 3: If so, take the passed value. If not, assign a default
    const title = hasTitle
      ? searchParams.get('title')?.slice(0, 100)
      : 'Ricardo Gonzalez'

    const description = hasDescription
      ? searchParams.get('description')?.slice(0, 100)
      : null

    const publishedTime = hasPublishedTime
      ? searchParams.get('publishedTime')?.slice(0, 100)
      : null

    const categories = hasCategories
      ? searchParams.get('categories')?.slice(0, 100)
      : ''

    return new ImageResponse(
      (
        <div
          tw="p-6 h-full w-full flex justify-center items-center"
          style={{
            background:
              'linear-gradient(133deg, rgb(30, 31, 31) 0%, rgb(26, 26, 27) 45%, rgb(25, 25, 26) 100%)',
          }}
        >
          <div tw="rounded p-10 bg-zinc-900 h-full w-full flex flex-col pattern-diagonal-lines pattern-yellow-500 pattern-bg-zinc-900 pattern-size-32 pattern-opacity-40 relative z-10">
            <div tw="mt-16 flex text-6xl leading-normal text-gray-200">
              {title}
            </div>
            {hasDescription && (
              <div tw="mt-5 flex text-3xl text-gray-300">{description}</div>
            )}
            {hasPublishedTime && (
              <div tw="mt-5 flex items-center text-xl text-yellow-600">
                {(() => {
                  const d = new Date(publishedTime!)
                  return isNaN(d.getTime())
                    ? publishedTime
                    : d.toLocaleDateString('en-GB', {
                        year: 'numeric',
                        month: 'short',
                        day: 'numeric',
                      })
                })()}
              </div>
            )}
            {hasCategories && (
              <div tw="mt-5 flex text-sm text-gray-300 space-x-2">
                {categories?.split(',').map((categorie: string) => (
                  <span tw="mr-2" key={categorie}>
                    {categorie}
                  </span>
                ))}
              </div>
            )}
          </div>

          <svg
            viewBox="0 0 480 480"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            id="svg-logo"
            style={{
              position: 'absolute',
              bottom: 50,
              right: 50,
              width: 150,
              height: 150,
              color: 'white',
            }}
          >
            <path
              d="M14 10H466V462H14V10Z"
              stroke="currentColor"
              strokeWidth="20"
              strokeLinecap="square"
              id="outline"
              style={{
                opacity: 0.5,
              }}
            />
            <path
              d="M105 386V86H255"
              stroke="currentColor"
              strokeWidth="60"
              strokeLinecap="square"
              id="top"
            />
            <path
              d="M375 86V386H225"
              stroke="currentColor"
              strokeWidth="60"
              strokeLinecap="square"
              id="bottom"
            />
          </svg>
        </div>
      ),
      {
        width: 1200,
        height: 630,
      },
    )
  } catch (error) {
    return new Response(
      `Failed to generate the image: ${(error as Error).message}`,
      {
        status: 500,
      },
    )
  }
}
