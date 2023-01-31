import type { NextPage } from 'next'
import Head from 'next/head'
import Link from 'next/link'

const NotAuthorized: NextPage = () => {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center py-2">
      <Head>
        <title>Not authorized</title>
      </Head>

      <main className="flex w-full flex-1 flex-col items-center justify-center px-20 text-center">
        <div className="w-full p-6 bg-white rounded-md ring ring-2 ring-red-500 lg:max-w-xl">
          <h1 className="text-xl font-regular text-gray-800">
            Please{" "}
            <Link
              href="/signin"
              className="font-medium text-red-500 hover:underline"
            >sign in</Link>
            {" "}to continue
          </h1>
        </div>
      </main>
    </div >
  )
}

export default NotAuthorized
