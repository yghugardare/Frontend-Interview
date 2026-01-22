import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {Button} from "@/components/ui/button"
import './App.css'

import {
  useQuery,
} from '@tanstack/react-query'



function App() {

   const { isPending, error, data } = useQuery({
    queryKey: ['repoData'],
    queryFn: () =>
      fetch('http://localhost:3001/blogs').then((res) =>
        res.json(),
      ),
  })

  if (isPending) return 'Loading...'

  if (error) return 'An error has occurred: ' + error.message
 const imgs = 'https://images.unsplash.com/photo-1590283603385-17ffb3a7f29f?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3Ds';
console.log('blog', data)
  return (

      <div className="main-container w-full ">

        {/* NAVBAR */}
        <div className="nav-bar w-full flex-1 flex justify-center h-24 px-4 py-2 items-center border-b-1 border-gray-400">
          {/* BRAND */}
          <div className="brand flex items-center gap-x-4">
            <div className="brand-logo w-10 h-10 rounded-lg bg-indigo-600 flex justify-center items-center text-white font-bold">
              CA
            </div>
            <p className="font-semibold text-2xl">CA MONK</p>
          </div>

          {/* NAV MENU LINK */}
          <div className="nav-menu-link text-gray-400 text-lg font-semibold">
            <ul className="nav-link-list flex gap-x-8">
              <li className="nav menu-link"><a href="/">Tools</a></li>
              <li className="nav menu-link"><a href="/">Practice</a></li>
              <li className="nav menu-link"><a href="/">Events</a></li>
              <li className="nav menu-link"><a href="/">Job Board</a></li>
              <li className="nav menu-link"><a href="/">Points</a></li>
            </ul>
          </div>

          {/* NAV PROFILE */}
          <div className="nav-profile w-24 h-10 rounded-lg text-xl bg-indigo-600 text-white px-2 py-1">Profile</div>

        </div>
      
      {/* BLOG COVER */}
        <div className="div blog-cover-section space-y-4 my-16">
          <p className="blog-cover-heading font-extrabold text-6xl">CA Monk Blog</p>
          <p className="blog-cover-sub-heading text-2xl text-gray-500">Stay updated with latest trends in finance, accounting, and career growth</p>
        </div>

        {/* BLOG CONTAINER */}
        <div className="main-blog-container w-full grid grid-cols-12 gap-x-12">
          {/* BLOG POST LIST */}
          <div className="blog-post-list col-span-4 space-y-8">
            {
              data?.map(()=>{
                return(
                    <Card className="border-l-6  border-l-indigo-700">
                      <CardHeader>
                        <CardTitle>
                          <div className="blog-post-card-title-section flex justify-between items-center w-full text-gray-500 text-lg">
                            <div className="blog-post-card-title text-indigo-600">FINANCE</div>
                            <div className="blog-post-card-time">2 days ago</div>
                          </div>
                        </CardTitle>
                      </CardHeader>
                      <CardContent className="text-left space-y-2">
                        <div className="card-heading font-semibold text-2xl">Future of Fintech</div>
                        <div className="card-desc text-xl text-gray-500">Exploring how AI and blockchain are reshaping financial servicesand what is means negotiation in your audits.</div>
                      </CardContent>
                      <CardFooter>
                        <div className="blog-category-tag bg-indigo-100 px-4 py-1 flex justify-center items-center rounded-full text-indigo-600 font-semibold">Featured</div>
                      </CardFooter>

                    </Card>)
              })
            }
          </div>
          {/* BLOG CONTENT */}
          <div className="blog-content col-span-8 rounded-lg">
            {/* BlOG COVER */}
            <div className="blog-cover bg-cover bg-center rounded-t-lg bg-no-repeat w-full h-96 " style={{backgroundImage:`url(${imgs})`}}></div>
              {/* BLOG CONTENT */}
              <div className="blog-content-area p-8 text-left">
                {/* BLOG CONTENT HEADER */}
                <div className="blog-header space-y-4">
                  <div className="category flex items-center gap-x-2 font-semibold text-gray-600 text-lg">
                    <p className="text-indigo-700">FINANCE</p> • 5 days ago
                  </div>
                  <p className="blog-header-heading text-5xl font-bold ">The Future of Fintech in 2024</p>
                  <Button className="!bg-indigo-700 text-white"> Share Article </Button>
                </div>
              {/* MULTI PANE */}
                <div className="multi-pane border border-violet-200 grid grid-cols-12 justify-between rounded-lg bg-violet-50 h-24">
                  <div className="category border-r-1  col-span-4 place-content-center place-items-center">
                    <div className="heading text-gray-500 font-semibold">CATEGORY</div>
                    <div className="info font-semibold">Fintech & AI</div>
                  </div>
                  <div className="category border-x-2  col-span-4  place-content-center place-items-center">
                    <div className="heading text-gray-500 font-semibold">READ TIME</div>
                    <div className="info font-semibold">5 Mins</div>
                  </div>
                  <div className="category border-r-1 col-span-4  place-content-center place-items-center">
                    <div className="heading text-gray-500 font-semibold">DATE</div>
                    <div className="info font-semibold">Oct 24, 2025</div>
                  </div>
                </div>

              <div className="blog-reading-content my-8">
                <p>The intersection of finance and technology has never been more vibrant. As we look towards 2024, the role of the Chartered Accountant is evolving from mere bookkeeping to strategic financial analysis powered by Al.</p>
                <h1>The Rise of Automated Accounting</h1>
              </div>

              </div>

          </div>
        </div>
            
      </div>



  )
}

export default App