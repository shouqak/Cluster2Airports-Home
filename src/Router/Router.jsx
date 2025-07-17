import { createBrowserRouter, Outlet, RouterProvider } from "react-router"
import Home from "../Pages/Home"
import { useEffect, useLayoutEffect, useState } from "react"
import Nav from "../components/Nav"
import Footer from "../components/Footer"
import NewsDetails from '../Pages/NewsDetails'
import ErorrPage from "../Pages/ErorrPage"

function HomeLayout() {
  const [isDark, setIsDark] = useState(false)

  useEffect(() => {
    const savedTheme = localStorage.getItem("theme")
    if (savedTheme === "dark") {
      setIsDark(true)
    }
  }, [])

  useLayoutEffect(() => {
    const html = document.documentElement
    if (isDark) {
      html.classList.add("dark")
      localStorage.setItem("theme", "dark")
    } else {
      html.classList.remove("dark")
      localStorage.setItem("theme", "light")
    }
  }, [isDark])

  return (
    <>
      <Nav
        isDark={isDark}
        setIsDark={setIsDark}
      />
      <Outlet />
      <Footer />
    </>
  )
}
const router = createBrowserRouter([
  {
    path: "/",
    element: <HomeLayout />,
    children: [
      { path: "/", element: <Home /> },
      { path: "detailNews/:id", element: <NewsDetails /> },
      { path: "*", element: <ErorrPage /> },
    ],
  },
])

function Router() {
  return <RouterProvider router={router} />
}

export default Router
