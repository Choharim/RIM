import { revalidatePath } from 'next/cache'
import { type NextRequest } from 'next/server'

export async function GET(req: NextRequest) {
  const searchParams = req.nextUrl.searchParams
  const secret = searchParams.get('secret')

  if (secret !== process.env.NEXT_PUBLIC_REVALIDATE_TOKEN) {
    return new Response('Invalid token', {
      status: 401,
    })
  }

  try {
    revalidatePath('/', 'layout')

    const id = searchParams.get('id')
    if (id) {
      revalidatePath(`/blog/${id}`)
    }

    return new Response('revalidated', {
      status: 200,
    })
  } catch (err) {
    console.log(err)

    return new Response('Error revalidating', {
      status: 500,
    })
  }
}
