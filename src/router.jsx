import { createBrowserRouter } from 'react-router-dom'
import { lazy, Suspense } from 'react'

import Default from './layout/Default'

const MainPage = lazy(() => import('./pages/MainPage'))
const AboutPage = lazy(() => import('./pages/AboutPage'))

const ShopPage = lazy(() => {
  // 메인 페이지가 로드된 후 1초 후에 Shop 페이지 미리 로드
  const preloadShop = () => import('./pages/ShopPage')
  // 중요한 페이지라면 Suspense가 표시되지 않도록 미리 로드
  if (typeof window !== 'undefined') {
    window.setTimeout(preloadShop, 1000)
  }
  return preloadShop()
})

const BlogPage = lazy(() => import('./pages/BlogPage'))
const CartPage = lazy(() => import('./pages/CartPage'))
const DetailPage = lazy(() => import('./pages/DetailPage'))

import NotFound from './pages/NotFound'
import Loading from './components/Loading'
import { getProductById } from './api/productApi'

const router = createBrowserRouter([
  {
    path: '/',
    element: <Default />,
    errorElement: <NotFound />,
    children: [
      { path: '', element: <MainPage /> },
      { path: '/shop', element: <ShopPage /> },
      { path: '/about', element: <AboutPage /> },
      { path: '/blog', element: <BlogPage /> },
      { path: '/cart', element: <CartPage /> },
      {
        path: '/detail/:productId',
        element: <DetailPage />,
        loader: async ({ params }) => {
          try {
            const product = await getProductById(params.productId)
            return product // 리턴 값을 컴포넌트(<DetailPage/>)에서 받을 수 있음
          } catch (err) {
            console.log('[error]', err)
          }
        },
      },
    ],
  },
])
export default router
