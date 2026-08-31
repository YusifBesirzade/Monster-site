import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import DataContext from './components/Context/DataContext.jsx'
import { BrowserRouter } from 'react-router-dom'
import { getCategories } from './services/Api.js'
import BasketContext from './components/Context/BasketContext.jsx'
import WishlistContext from './components/Context/WishlistContext.jsx'
import AuthContext from './components/Context/AuthContext.jsx'

async function startApp() {
  try {
    const data = await getCategories()

    createRoot(document.getElementById('root')).render(
      <BrowserRouter>
        <AuthContext>
          <DataContext initialCategories={[]}>
            <BasketContext>
              <WishlistContext>
                <App />
              </WishlistContext>
            </BasketContext>
          </DataContext>
        </AuthContext>
      </BrowserRouter >
    )
  }
  catch (error) {
    console.error("Categories yuklenmedi:", error)

    createRoot(document.getElementById('root')).render(
      <BrowserRouter>
        <AuthContext>
          <DataContext initialCategories={[]}>
            <BasketContext>
              <WishlistContext>
                <App />
              </WishlistContext>
            </BasketContext>
          </DataContext>
        </AuthContext>
      </BrowserRouter >
    )
  }
}

startApp()

