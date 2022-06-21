import dynamic from 'next/dynamic'

const DynamicAdminAuthForm = dynamic(
  () =>
    import(
      /* webpackChunkName: 'AdminAuthForm' */ '@/components/Form/AdminAuthForm'
    ),
  { ssr: false }
)

const DynamicUploadToSwellFromAirtable = dynamic(
  () =>
    import(
      /* webpackChunkName: 'UploadToSwellFromAirtable' */ '@/components/Admin/UploadToSwellFromAirtable'
    ),
  { ssr: false }
)

const DynamicChangeSiteColorCode = dynamic(
  () =>
    import(
      /* webpackChunkName: 'DynamicChangeSiteColorCode' */ '@/components/Settings/ChangeSiteColorCode'
    ),
  { ssr: false }
)
const DynamicUploadSiteLogo = dynamic(
  () =>
    import(
      /* webpackChunkName: 'UploadSiteLogo' */ '@/components/Settings/UploadSiteLogo'
    ),
  { ssr: false }
)

export default function splittedViewSwitch(view: string) {
  switch (view) {
    case 'create-admin-profile': {
      return (
        <div>
          <h2 className="text-center -mb-4 mt-4 font-bold text-lg">
            Sign up to create new Admin profile
          </h2>
          <DynamicAdminAuthForm type="signup" />
        </div>
      )
    }
    case 'uploadToSwell': {
      return <DynamicUploadToSwellFromAirtable />
    }
    case 'change-site-color-code': {
      return <DynamicChangeSiteColorCode />
    }
    case 'change-site-logo': {
      return <DynamicUploadSiteLogo />
    }

    default:
      return null
  }
}
