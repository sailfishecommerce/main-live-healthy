/* eslint-disable @next/next/no-img-element */
import dynamic from 'next/dynamic'
import { MdOutlineMailOutline } from 'react-icons/md'

import Pagetitle from '@/components/Header/page-title'
import aboutUsContent from '@/json/about-us.json'

const Aboutus = dynamic(
  () => import(/* webpackChunkName: 'common' */ '@/components/Aboutus')
)

export default function About() {
  return (
    <>
      <Pagetitle title="About us " />
      <main className="w-full px-0">
        {aboutUsContent.aboutUs.map((content) => (
          <Aboutus key={content.title} content={content} />
        ))}
        <hr />
        <section className="container m-auto p-4 laptop:py-5 mt-4 mb-3">
          <h2 className="text-2xl font-semibold my-2">
            {aboutUsContent.coreTeam.title}
          </h2>
          <p className="text-md">{aboutUsContent.coreTeam.description}</p>
          <div className="flex flex-wrap pt-3 w-full">
            {aboutUsContent.coreTeam.teams.map((team) => (
              <div key={team.name} className="laptop:w-1/3 p-2 sm:w-1/6">
                <div className="flex items-center">
                  <img
                    className="rounded-full m-2"
                    src={team.image}
                    width="96"
                    alt={team.name}
                  />
                  <div className="flex flex-col">
                    <h6 className="font-bold pt-1 mb-1">{team.name}</h6>
                    <p className="text-md">{team.role}</p>
                    <a
                      aria-label="email"
                      className="hover:text-red-500 flex items-center"
                      href={`mailto:${team.email}`}
                    >
                      <MdOutlineMailOutline className="mx-1 text-red-500" />
                      {team.email}
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>
      </main>
    </>
  )
}
