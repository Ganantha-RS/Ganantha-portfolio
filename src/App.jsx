import { useState } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import LandingPage from './page/LandingPage'
import SmoothScroll from './components/ui/SmoothScroll'
import './index.css'
import CustomCursor from './components/ui/CustomCursor'
import Preloader from './components/ui/Preloader'
  
function App() {
 const [loaded, setLoaded] = useState(false);

return (
  <>
    <Preloader onComplete={() => setLoaded(true)} />
    <div style={{ opacity: loaded ? 1 : 0, transition: "opacity 0.8s ease" }}>
      <SmoothScroll>
        <CustomCursor />
        <BrowserRouter>
          <Routes>
           <Route path="/" element={<LandingPage loaded={loaded} />} />
          </Routes>
        </BrowserRouter>
      </SmoothScroll>
    </div>
  </>
);
}
export default App
