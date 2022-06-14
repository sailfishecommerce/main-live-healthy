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

    default:
      return null
  }
}
