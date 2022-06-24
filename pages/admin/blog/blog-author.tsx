import BlogAuthorForm from '@/components/Blog/BlogAuthorForm'
import BlogAuthorsList from '@/components/Blog/BlogAuthorsList'
import DashboardMainView from '@/components/Dashboard/DashboardMainView'
import DashboardLayout from '@/layouts/dashboard-layout'

export default function BlogAuthor() {
  return (
    <DashboardLayout title="Blog Author">
      <DashboardMainView>
        <div className="blog-author-view flex items-start">
          <BlogAuthorsList />
          <BlogAuthorForm />
        </div>
      </DashboardMainView>
    </DashboardLayout>
  )
}
