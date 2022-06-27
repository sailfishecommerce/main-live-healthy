/* eslint-disable @next/next/no-img-element */
import { TextView } from '@/components/View/CustomercareView'
import useArticleData from '@/hooks/useArticleData'
import Applayout from '@/layouts/app-layout'

export default function About() {
  const { databaseData }: any = useArticleData('articles/team/about-us/content')
  const aboutusImg = databaseData?.entityMap['0']?.data
  const pageContent = databaseData?.blocks
  return (
    <Applayout title="About us">
      <main className="w-full px-0">
        <section className="flex flex-col md:flex-row items-start justify-center">
          <img src={aboutusImg?.src} alt="about us banner " />
          <div className={`w-full md:w-1/2 py-5 px-4 lg:px-10`}>
            {pageContent?.map((content: any) => (
              <TextView content={content} key={content.key} />
            ))}
          </div>
        </section>
      </main>
    </Applayout>
  )
}
