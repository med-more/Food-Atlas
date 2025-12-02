import { Link } from 'react-router-dom'
import { FaGlobeAmericas, FaMapMarkerAlt, FaArrowRight } from 'react-icons/fa'
import './Home.css'

const Home = () => {
  const categories = [
    { name: 'Maroc', description: 'Tajines, couscous épicés' },
    { name: 'Italie', description: 'Pasta, pizza authentique' },
    { name: 'Turquie', description: 'Kebabs, baklava sucré' },
    { name: 'Mexique', description: 'Tacos, guacamole' },
    { name: 'Indie', description: 'Currys, épices parfumées' },
    { name: 'France', description: 'Viennoiseries, raffinement' },
    { name: 'Chine', description: 'Dim sum, wok savoureux' },
    { name: 'Espagne', description: 'Paella, tapas variées' },
    { name: 'Thaïlande', description: 'Pad Thai, saveurs sucrées-salées' },
    { name: 'Liban', description: 'Mezze, fraîcheur méditerranéenne' },
    { name: 'Japon', description: 'Sushi, saveurs umami' },
  ]

  return (
    <div className="home">
      <section className="hero-section">
        <div className="hero-container">
          <div className="hero-icon">
            <FaGlobeAmericas className="globe-icon" />
          </div>
          <h1 className="hero-title">Bienvenue sur Food Atlas</h1>
          <p className="hero-description">
            Découvrez un voyage culinaire à travers le monde ! Food Atlas vous invite à explorer 
            des recettes authentiques de différentes cultures. De la chaleur des épices marocaines 
            à la simplicité italienne, en passant par les saveurs vibrantes du Mexique et au-delà.
          </p>
          <Link to="/recettes" className="hero-cta-button">
            <FaMapMarkerAlt className="cta-icon" />
            <span>Explorer les Recettes</span>
          </Link>
        </div>
      </section>

      <section className="main-image-section">
        <div className="main-image-container">
          <img 
            src="https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=1200" 
            alt="Plat culinaire" 
            className="main-image"
          />
        </div>
      </section>

      <section className="categories-section">
        <div className="categories-container">
          <h2 className="categories-title">Explorez nos catégories de recettes</h2>
          <div className="categories-grid">
            {categories.map((category, index) => (
              <div key={index} className="category-card fade-in" style={{ animationDelay: `${index * 0.1}s` }}>
                <FaMapMarkerAlt className="category-icon" />
                <h3 className="category-name">{category.name}</h3>
                <p className="category-description">{category.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="cta-section">
        <div className="cta-container">
          <h2 className="cta-title">Prêt à cuisiner ?</h2>
          <p className="cta-description">
            Rejoignez-nous dans cette aventure culinaire et découvrez des recettes du monde entier 
            qui égayeront vos repas !
          </p>
          <Link to="/recettes" className="cta-button-secondary">
            <span>Découvrir toutes les recettes</span>
            <FaArrowRight className="cta-arrow-icon" />
          </Link>
        </div>
      </section>
    </div>
  )
}

export default Home

