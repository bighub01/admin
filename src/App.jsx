
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import routes from "./routes/routes";
import DefaultLayout from "./layout/DefaultLayout";
import './style/index.css';
// Import ảnh nền
import bgImage from "./assets/img/colorful-wavy-shapes.jpg";

function App() {
  return (
    
    <Router>
      <div
        className="min-h-screen w-full bg-cover bg-center"
        //style={{ backgroundImage: `url(${bgImage})` }}
      >
        <Routes>
          {routes.publicRoute.map((route, index) => {
            const Layout = route.layout === null ? Fragment : DefaultLayout;
            const Page = route.component;
            return (
              <Route
                key={index}
                path={route.path}
                element={
                  <Layout>
                    <Page />
                  </Layout>
                }
              />
            );
          })}
        </Routes>
      </div>
    </Router>
  );
}

export default App;
